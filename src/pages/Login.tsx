import { motion } from "framer-motion";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { FiLock, FiUser } from "react-icons/fi";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthActions, useIsAuthenticated } from "../hooks/useAuth";
import { useAuthenticatedUser } from "../hooks/useUsers";
import { getDefaultRouteForRole } from "../utils/auth";

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
  const isAuthenticated = useIsAuthenticated();
  const authenticatedUser = useAuthenticatedUser();
  const { login, clearAuthError } = useAuthActions();
  const navigate = useNavigate();

  if (isAuthenticated) {
    if (!authenticatedUser) {
      return <Navigate to="/login" replace />;
    }
    return <Navigate to={getDefaultRouteForRole(authenticatedUser.role)} replace />;
  }

  const handleFieldChange =
    (field: keyof LoginFormState) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      setForm((previous) => ({
        ...previous,
        [field]: event.target.value,
      }));
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

    const loggedUser = login({ username, password });
    if (loggedUser) {
      navigate(getDefaultRouteForRole(loggedUser.role), { replace: true });
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top_right,#12203a,#06080f_45%)] px-4 text-slate-50">
      <motion.div
        className="w-full max-w-[460px] rounded-xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="mb-1 flex items-center justify-center gap-2">
          <img src={"/logo.png"} alt="Logo" className="h-16 w-16 rounded-full" />
          <h1 className="text-3xl font-bold">Inicia sesion</h1>
        </div>
        <p className="mb-10 text-center text-base text-slate-400">Un sistema de prueba de usuarios evalúa la autenticación y los permisos de acceso en un entorno seguro. </p>
        <form className="mt-4 grid gap-3" onSubmit={handleSubmit}>
          <label className="flex w-full items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3">
            <FiUser className="min-w-[18px] text-slate-400" />
            <input
              className="w-full bg-transparent py-3 text-sm text-slate-50 outline-none placeholder:text-slate-500"
              type="text"
              placeholder="Usuario"
              autoComplete="username"
              id="username"
              value={form.username}
              onChange={handleFieldChange("username")}
            />
          </label>
          <label className="flex w-full items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3">
            <FiLock className="min-w-[18px] text-slate-400" />
            <input
              className="w-full bg-transparent py-3 text-sm text-slate-50 outline-none placeholder:text-slate-500"
              type="password"
              placeholder="Contraseña"
              autoComplete="current-password"
              id="password"
              value={form.password}
              onChange={handleFieldChange("password")}
            />
          </label>
          <motion.button
            initial={{ scale: 0.95, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-lg border border-blue-800 bg-blue-800 px-4 py-2.5 font-semibold text-slate-50 hover:-translate-y-0.5 hover:border-blue-900 hover:bg-blue-900"
            type="submit"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
