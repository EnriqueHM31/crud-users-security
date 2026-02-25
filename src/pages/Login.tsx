import { motion } from "framer-motion";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { FiLock, FiUser } from "react-icons/fi";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router-dom";
import { ModalResetContraseña } from "../components/user/ModalResetContraseña";
import { obtenerRutaPorRolDefecto } from "../config/routes";
import { initialState } from "../constants/initValues";
import { useAuthActions, useAuthLoading, useIsAuthenticated, useUserRole } from "../hooks/useAuth";
import { useOpen } from "../hooks/useOpen";
import { useAuthStore } from "../store/auth.store";
import type { FormularioLogin } from "../types/auth.types";
import { validarCamposVacios } from "../utils/conversiones";

export default function Login() {
    const [formularioLogin, setFormularioLogin] = useState<FormularioLogin>(initialState);
    const navigate = useNavigate();

    const isAuthenticated = useIsAuthenticated();
    const rol = useUserRole();
    const { login } = useAuthActions();
    const isLoading = useAuthLoading();
    const openResetContraseña = useOpen();
    const openShowPassword = useOpen();

    if (isAuthenticated && rol) {
        return <Navigate to={obtenerRutaPorRolDefecto(rol)} replace />;
    }

    const handleFieldChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setFormularioLogin((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmitLogin = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        const esValido = validarCamposVacios(formularioLogin, {
            username: "Nombre de usuario",
            password: "Contraseña",
        });
        if (!esValido) return;
        const { username, password } = formularioLogin;

        const isValidLogin = await login({ username, password });

        if (isValidLogin) {
            const user = useAuthStore.getState().userAuthenticated;
            const rolPostLogin = user?.rol ?? (user as { role?: "admin" | "user" })?.role ?? null;
            navigate(obtenerRutaPorRolDefecto(rolPostLogin), { replace: true });
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
                    <h1 className="text-3xl font-bold">Portal Seguro ITSH</h1>
                </div>
                <p className="mb-8 text-center text-sm text-slate-400">Acceso restringido para personal autorizado.</p>

                <form className="grid gap-4" onSubmit={handleSubmitLogin} noValidate>
                    <label className="flex w-full items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3 transition-colors focus-within:border-blue-500">
                        <FiUser className="min-w-[18px] text-slate-400" />
                        <input
                            className="w-full bg-transparent py-3 text-sm text-slate-50 outline-none placeholder:text-slate-500"
                            type="text"
                            name="username"
                            autoComplete="username"
                            placeholder="Nombre de usuario"
                            value={formularioLogin.username}
                            onChange={handleFieldChange}
                        />
                    </label>

                    {/* Input Contraseña + Menú de Reglas */}
                    <div className="relative grid gap-2">
                        <label className="flex w-full items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3 transition-colors focus-within:border-blue-500">
                            <FiLock className="min-w-[18px] text-slate-400" />
                            <input
                                className="w-full bg-transparent py-3 text-sm text-slate-50 outline-none placeholder:text-slate-500"
                                type={openShowPassword.isOpen ? "text" : "password"}
                                name="password"
                                autoComplete="current-password"
                                placeholder="Contraseña"
                                value={formularioLogin.password}
                                onChange={handleFieldChange}
                            />
                        </label>
                        <motion.button
                            initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                            animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                            whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                            type="button"
                            title={openShowPassword.isOpen ? "Ocultar contraseña" : "Mostrar contraseña"}
                            className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-blue-400"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => openShowPassword.toggle()}
                        >
                            {openShowPassword.isOpen ? <IoEye /> : <IoEyeOff />}
                        </motion.button>
                    </div>

                    <div className="flex justify-end">
                        <motion.button
                            initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                            animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                            whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                            type="button"
                            className="cursor-pointer text-xs text-blue-400 hover:text-blue-300 hover:underline"
                            onClick={() => openResetContraseña.open()}
                        >
                            ¿Olvidaste tu contraseña?
                        </motion.button>
                    </div>

                    <motion.button
                        initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                        animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                        whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                        disabled={isLoading}
                        className={`inline-flex w-full cursor-pointer items-center justify-center rounded-lg border px-4 py-2.5 font-semibold text-slate-50 ${"border-blue-950 bg-blue-800 hover:bg-blue-900"}`}
                        type="submit"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Verificando...
                            </span>
                        ) : (
                            "Iniciar Sesión"
                        )}
                    </motion.button>
                </form>
            </motion.div>

            <ModalResetContraseña key="modal-reset" open={openResetContraseña.isOpen} close={openResetContraseña.close} />
        </div>
    );
}
