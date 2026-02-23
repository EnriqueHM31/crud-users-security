import { AnimatePresence, motion } from "framer-motion";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { FaEnvelope, FaIdBadge, FaLock, FaUser, FaUserShield } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import type { CreateUserInput, User } from "../../types/user.types";

interface UserModalProps {
    open: boolean;
    close: () => void;
    onSubmit: (payload: Omit<User, "id_usuario"  | "fecha_creacion" | "fecha_actualizacion">) => void;
}

const emptyValues: Omit<User, "id_usuario"  | "fecha_creacion" | "fecha_actualizacion"> = {
    nombre_usuario: "",
    nombre_completo: "",
    correo_electronico: "",
    contrasena: "",
    role: "user",
};

export function ModalCreate({ open, onSubmit, close }: UserModalProps) {
    const [values, setValues] = useState<Omit<User, "id_usuario" | "fecha_creacion" | "fecha_actualizacion">>(emptyValues);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleFieldChange = (field: keyof CreateUserInput) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setValues((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!values.nombre_usuario.trim() || !values.nombre_completo.trim() || !values.correo_electronico.trim() || !values.contrasena.trim()) {
            setError("All required fields must be completed.");
            return;
        }

        onSubmit(values);
        close();
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => close()}
                >
                    <motion.div
                        className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl"
                        initial={{ scale: 0.95, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 40 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold text-slate-100">Sistema de usuarios</h2>

                        <h3 className="mt-2 text-lg font-semibold text-blue-400">Crear usuario</h3>

                        <p className="mt-1 mb-5 text-sm text-slate-400">Registra un nuevo usuario dentro del sistema.</p>

                        <form className="grid gap-4" onSubmit={handleSubmit}>
                            <div className="relative">
                                <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    id="username"
                                    autoComplete="username"

                                    placeholder="Username"
                                    value={values.nombre_usuario}
                                    onChange={handleFieldChange("username")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-3 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="relative">
                                <FaIdBadge className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Nombre completo"
                                    id="name"
                                    autoComplete="name"
                                    value={values.nombre_completo}
                                    onChange={handleFieldChange("name")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-3 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="relative">
                                <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="email"
                                    placeholder="Correo electrónico"
                                    id="email"
                                    autoComplete="email"
                                    value={values.correo_electronico}
                                    onChange={handleFieldChange("email")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-3 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="relative">
                                <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Contraseña"
                                    id="password"
                                    autoComplete="new-password"
                                    value={values.contrasena}
                                    onChange={handleFieldChange("password")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-10 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />
                                <motion.button
                                    initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                    animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                    whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                    whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-200"
                                >
                                    {showPassword ? <IoEyeOff /> : <IoEye />}
                                </motion.button>
                            </div>

                            <div className="relative">
                                <FaUserShield className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <select
                                    value={values.role}
                                    id="role"
                                    autoComplete="role"
                                    onChange={handleFieldChange("role")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-3 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>

                            {error && <p className="text-sm text-rose-400">{error}</p>}

                            <div className="flex gap-3 pt-2">
                                <motion.button
                                    initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                    animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                    whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                    whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                                    type="submit"
                                    className="flex-1 cursor-pointer rounded-lg bg-blue-800 py-2 font-semibold text-white hover:bg-blue-900"
                                >
                                    Crear usuario
                                </motion.button>

                                <motion.button
                                    initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                    animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                    whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                    whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                                    type="button"
                                    onClick={() => close()}
                                    className="flex-1 cursor-pointer rounded-lg border border-slate-700 py-2 font-semibold text-slate-300 hover:border-slate-500"
                                >
                                    Cancelar
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
