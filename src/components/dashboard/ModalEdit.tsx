import { AnimatePresence, motion } from "framer-motion";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { FaEnvelope, FaIdBadge, FaLock, FaUser, FaUserShield } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import type { CreateUserInput, User } from "../../types/user.types";

interface EditUserModalProps {
    open: boolean;
    close: () => void;
    selectedUser: User;
    onSubmit: (payload: CreateUserInput) => void;
}

export function ModalEdit({ open, close, selectedUser, onSubmit }: EditUserModalProps) {
    const [values, setValues] = useState<CreateUserInput>(selectedUser);

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

        if (!values.name.trim() || !values.email.trim()) {
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

                        <h3 className="mt-2 text-lg font-semibold text-blue-400">Editar usuario</h3>

                        <p className="mt-1 mb-5 text-sm text-slate-400">Modifica la información del usuario seleccionado.</p>

                        <form className="grid gap-4" onSubmit={handleSubmit}>
                            <div className="relative">
                                <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    value={values.username}
                                    disabled
                                    className="w-full cursor-not-allowed rounded-lg border border-slate-800 bg-slate-800 py-2.5 pr-3 pl-10 text-sm text-slate-400 outline-none"
                                />
                            </div>

                            <div className="relative">
                                <FaIdBadge className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    value={values.name}
                                    onChange={handleFieldChange("name")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-3 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="relative">
                                <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="email"
                                    value={values.email}
                                    onChange={handleFieldChange("email")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-3 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="relative">
                                <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Nueva contraseña (opcional)"
                                    value={values.password}
                                    onChange={handleFieldChange("password")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-10 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />
                                <motion.button
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
                                    onChange={handleFieldChange("role")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-3 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>

                            {error && <p className="text-sm text-rose-400">{error}</p>}

                            <div className="flex gap-3 pt-2">
                                <motion.button type="submit" className="flex-1 cursor-pointer rounded-lg bg-blue-800 py-2 font-semibold text-white hover:bg-blue-900">
                                    Guardar cambios
                                </motion.button>

                                <motion.button
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
