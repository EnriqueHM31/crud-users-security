import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaIdBadge } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from "sonner";
import type { CreateUserInput, User } from "../../types/user.types";

interface UserModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    mode: "create" | "edit";
    selectedUser?: User;
    onSubmit: (payload: Omit<User, "id">) => Promise<boolean>;
}

const emptyValues: Omit<User, "id_usuario" | "contrasena"> = {
    nombre_usuario: "",
    nombre_completo: "",
    correo_electronico: "",
    fecha_creacion: "",
    fecha_actualizacion: "",
    role: "user",
};

export function UserModal({ open, setOpen, mode, selectedUser, onSubmit }: UserModalProps) {
    const [values, setValues] = useState<Omit<User, "id_usuario" | "contrasena">>(emptyValues);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        if (mode === "edit" && selectedUser) {
            setValues({
                nombre_usuario: selectedUser.nombre_usuario,
                nombre_completo: selectedUser.nombre_completo,
                correo_electronico: selectedUser.correo_electronico,
                fecha_creacion: selectedUser.fecha_creacion,
                fecha_actualizacion: selectedUser.fecha_actualizacion,
                role: selectedUser.role,
            });
            return;
        }

        setValues(emptyValues);
    }, [mode, selectedUser, open]);

    const handleFieldChange = (field: keyof CreateUserInput) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const hasEmptyFields = Object.values(values).some((value) => value.trim().length === 0);

        if (hasEmptyFields) {
            toast.error("Todos los campos son obligatorios.");
            return;
        }

        const isSuccess = await onSubmit(values);
        if (!isSuccess) {
            return;
        }
        setOpen(false);
        setValues(emptyValues);
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl"
                        initial={{ scale: 0.9, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 40 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-2xl font-bold text-slate-100">Sistema de usuarios</h2>
                        <p className="mt-1 mb-5 text-sm text-slate-400">
                            Esta modal permite {mode === "create" ? "crear nuevos usuarios" : "editar usuarios existentes"} dentro del sistema.
                        </p>

                        <form className="grid gap-4" onSubmit={handleSubmit}>
                            {/* Username */}
                            <div className="relative">
                                <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={values.username}
                                    onChange={handleFieldChange("username")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-3 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Name */}
                            <div className="relative">
                                <FaIdBadge className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Full name"
                                    value={values.name}
                                    onChange={handleFieldChange("name")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-3 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleFieldChange("email")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-3 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleFieldChange("password")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-10 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                                >
                                    {showPassword ? <IoEyeOff /> : <IoEye />}
                                </button>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button type="submit" className="flex-1 rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700">
                                    {mode === "create" ? "Crear usuario" : "Guardar cambios"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="flex-1 rounded-lg border border-slate-700 py-2 font-semibold text-slate-300 hover:border-slate-500"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
