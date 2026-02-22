import { AnimatePresence, motion } from "framer-motion";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { FaLock } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useOpen } from "../../hooks/useOpen";
import { ModalResetContraseña } from "./ModalResetContraseña";

interface ChangePasswordModalProps {
    open: boolean;
    close: () => void;
    onSubmit: (payload: { currentPassword: string; newPassword: string; confirmPassword: string }) => void;
}

export function ModalContraseña({ open, close, onSubmit }: ChangePasswordModalProps) {
    const openResetContraseña = useOpen();
    const [values, setValues] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleFieldChange = (field: keyof typeof values) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!values.currentPassword.trim() || !values.newPassword.trim() || !values.confirmPassword.trim()) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        if (values.newPassword !== values.confirmPassword) {
            setError("Las nuevas contraseñas no coinciden.");
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
                    onClick={close}
                >
                    <motion.div
                        className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl"
                        initial={{ scale: 0.95, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 40 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold text-slate-100">Seguridad de la cuenta</h2>

                        <h3 className="mt-2 text-lg font-semibold text-blue-400">Cambiar contraseña</h3>

                        <p className="mt-1 mb-5 text-sm text-slate-400">Actualiza tu contraseña para mantener tu cuenta segura.</p>

                        <form className="grid gap-4" onSubmit={handleSubmit}>
                            {/* Contraseña actual */}
                            <div className="relative">
                                <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Contraseña actual"
                                    value={values.currentPassword}
                                    onChange={handleFieldChange("currentPassword")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-10 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />
                                <motion.button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                                >
                                    {showPassword ? <IoEyeOff /> : <IoEye />}
                                </motion.button>
                            </div>

                            {/* Nueva contraseña */}
                            <div className="relative">
                                <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="password"
                                    placeholder="Nueva contraseña"
                                    value={values.newPassword}
                                    onChange={handleFieldChange("newPassword")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-3 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Confirmar contraseña */}
                            <div className="relative">
                                <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="password"
                                    placeholder="Confirmar nueva contraseña"
                                    value={values.confirmPassword}
                                    onChange={handleFieldChange("confirmPassword")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-3 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Link intermedio */}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="cursor-pointer text-sm text-blue-400 transition hover:text-blue-300 hover:underline"
                                    onClick={() => openResetContraseña.open()}
                                >
                                    ¿Olvidaste la contraseña?
                                </button>
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
                                    Actualizar contraseña
                                </motion.button>

                                <motion.button
                                    initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                    animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                    whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                    whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                                    type="button"
                                    onClick={close}
                                    className="flex-1 cursor-pointer rounded-lg border border-slate-700 py-2 font-semibold text-slate-300 hover:border-slate-500"
                                >
                                    Cancelar
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}

            <ModalResetContraseña open={openResetContraseña.isOpen} close={openResetContraseña.close} />
        </AnimatePresence>
    );
}
