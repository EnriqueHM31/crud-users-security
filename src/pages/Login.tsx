import { useState, type ChangeEvent, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FiLock, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import { useAuthActions, useAuthError, useIsAuthenticated } from "../hooks/useAuth";
import { toast } from "sonner";

interface LoginFormState {
  username: string;
  password: string;
}

const initialState: LoginFormState = {
  username: "",
  password: "",
};

export function Login() {
  const [form, setForm] = useState<LoginFormState>(initialState);
  const [formError, setFormError] = useState<string>("");
  const isAuthenticated = useIsAuthenticated();
  const authError = useAuthError();
  const { login, clearAuthError } = useAuthActions();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleFieldChange =
    (field: keyof LoginFormState) =>
      (event: ChangeEvent<HTMLInputElement>): void => {
        setForm((previous) => ({
          ...previous,
          [field]: event.target.value,
        }));
        setFormError("");
        clearAuthError();
      };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { username, password } = form;
    if (username.trim().length === 0) {
      toast.error("El campo nombre de usuario no puede estar vacío.");
      return;
    }

    if (password.trim().length === 0) {
      toast.error("El campo contraseña no puede estar vacío.");
      return;
    }

    const isValidLogin = login({ username, password });
    if (isValidLogin) {
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top_right,#12203a,#06080f_45%)] px-4 text-slate-50">
      <motion.div
        className="w-full max-w-[440px] rounded-xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="text-3xl font-bold ">Inicia sesion</h1>
        <p className="mt-1 text-base text-slate-400">Ingresa con tus credenciales para continuar.</p>
        <form className="mt-4 grid gap-3" onSubmit={handleSubmit}>
          <label className="flex w-full items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3">
            <FiUser className="min-w-[18px] text-slate-400" />
            <input
              className="w-full bg-transparent py-3 text-sm text-slate-50 outline-none placeholder:text-slate-500"
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={handleFieldChange("username")}
            />
          </label>
          <label className="flex w-full items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3">
            <FiLock className="min-w-[18px] text-slate-400" />
            <input
              className="w-full bg-transparent py-3 text-sm text-slate-50 outline-none placeholder:text-slate-500"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleFieldChange("password")}
            />
          </label>
          {formError ? <p className="text-sm text-rose-300">{formError}</p> : null}
          {authError ? <p className="text-sm text-rose-300">{authError}</p> : null}
          <motion.button
            initial={{ scale: 0.95, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
            className="inline-flex w-full items-center justify-center rounded-lg border border-blue-500 bg-blue-500 px-4 py-2.5 font-semibold text-slate-50  hover:-translate-y-0.5 hover:border-blue-600 hover:bg-blue-600 cursor-pointer"
            type="submit"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
