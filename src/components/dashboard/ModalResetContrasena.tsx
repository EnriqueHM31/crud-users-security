import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { LuShuffle } from "react-icons/lu";
import { useOpen } from "../../hooks/useOpen";
import { generarContraseñaSegura } from "../../utils/conversiones";

interface ModalResetPasswordProps {
    open: boolean;
    userName: string;
    onCancel: () => void;
    onConfirm: (password: string) => void;
}

export function ModalResetPassword({ open, userName, onCancel, onConfirm }: ModalResetPasswordProps) {
    const openShowPassword = useOpen();

    const [password, setPassword] = useState("");

    const handlePasswordChange = (password: string) => {
        setPassword(password);
    };

    const handleConfirm = () => {
        onConfirm(password.trim());
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-60 grid place-items-center bg-black/60 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-950 p-4 text-slate-50 shadow-2xl"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <h3 className="mb-2 text-lg font-semibold">Restablecer contraseña</h3>

                        <p className="mb-4 text-sm text-slate-300">
                            Está a punto de generar y asignar una nueva contraseña segura para el usuario <strong className="text-blue-400">{userName}</strong>.
                            Esta acción reemplazará la contraseña actual.
                        </p>

                        <div className="relative">
                            <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />

                            <input
                                id="password"
                                name="password"
                                type={openShowPassword.isOpen ? "text" : "password"}
                                placeholder="Nueva contraseña"
                                autoComplete="new-password"
                                value={password}
                                readOnly
                                className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-20 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                            />

                            {/* Generar contraseña */}
                            <motion.button
                                type="button"
                                initial={{ scale: 0.9, opacity: 0, y: 40 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                whileHover={{ scale: 0.95 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handlePasswordChange(generarContraseñaSegura(18))}
                                className="absolute top-1/2 right-10 -translate-y-1/2 cursor-pointer text-blue-400 hover:text-blue-300"
                                title="Generar contraseña segura"
                            >
                                <LuShuffle />
                            </motion.button>

                            {/* Mostrar / Ocultar */}
                            <motion.button
                                type="button"
                                title={openShowPassword.isOpen ? "Ocultar contraseña" : "Mostrar contraseña"}
                                initial={{ scale: 0.9, opacity: 0, y: 40 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                whileHover={{ scale: 0.95 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => openShowPassword.toggle()}
                                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-200"
                            >
                                {openShowPassword.isOpen ? <IoEye /> : <IoEyeOff />}
                            </motion.button>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                            <motion.button
                                type="button"
                                onClick={onCancel}
                                className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 font-semibold text-slate-100 hover:border-blue-500"
                            >
                                Cancelar
                            </motion.button>

                            <motion.button
                                type="button"
                                onClick={handleConfirm}
                                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-blue-900 bg-blue-900/30 px-3 py-2 text-sm font-semibold text-blue-100 hover:border-blue-500"
                            >
                                Resetear contraseña
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
