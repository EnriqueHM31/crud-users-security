import { AnimatePresence, motion } from "framer-motion";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { FaLock } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from "sonner";
import { useCurrentUserId } from "../../hooks/useAuth";
import { useOpen } from "../../hooks/useOpen";

interface ChangePasswordModalProps {
    open: boolean;
    close: () => void;
    onSubmit: ({ currentPassword, newPassword, id_usuario }: { currentPassword: string; newPassword: string; id_usuario: string }) => void;
}

export function ModalContraseña({ open, close, onSubmit }: ChangePasswordModalProps) {
    const userId = useCurrentUserId();
    const [changePassword, setChangePassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const openShowPassword1 = useOpen();
    const openShowPassword2 = useOpen();
    const openShowPassword3 = useOpen();

    const handleFieldChange = (field: keyof typeof changePassword) => (event: ChangeEvent<HTMLInputElement>) => {
        setChangePassword((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!changePassword.currentPassword.trim() || !changePassword.newPassword.trim() || !changePassword.confirmPassword.trim()) {
            toast.error("Todos los campos son obligatorios.");
            return;
        }

        if (changePassword.newPassword !== changePassword.confirmPassword) {
            toast.error("Las nuevas contraseñas no coinciden.");
            return;
        }

        if (!userId) {
            toast.error("No se puede cambiar la contraseña sin identificarse.");
            return;
        }
        onSubmit({ currentPassword: changePassword.currentPassword, newPassword: changePassword.newPassword, id_usuario: userId });
        setChangePassword({ currentPassword: "", newPassword: "", confirmPassword: "" });
        close();
    };

    const handleCloseModal = () => {
        setChangePassword({ currentPassword: "", newPassword: "", confirmPassword: "" });
        close();
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="modal-contrasena"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleCloseModal}
                >
                    <motion.div
                        className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl"
                        initial={{ scale: 0.95, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 40 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <header>
                            <div>
                                <img src="/logo.png" alt="logo" className="h-10 w-10 rounded-full" />
                                <h2 className="text-2xl font-bold text-slate-100">Sistema de Seguridad</h2>
                            </div>
                            <h3 className="mt-2 text-lg font-semibold text-blue-400">Cambiar contraseña</h3>

                            <p className="mt-1 mb-5 text-sm text-slate-400">Actualiza tu contraseña para mantener tu cuenta segura.</p>
                        </header>

                        <form className="grid gap-4" onSubmit={handleSubmit}>
                            {/* Contraseña actual */}
                            <div className="relative">
                                <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type={openShowPassword1.isOpen ? "text" : "password"}
                                    placeholder="Contraseña actual"
                                    id="currentPassword"
                                    name="currentPassword"
                                    autoComplete="current-password"
                                    value={changePassword.currentPassword}
                                    onChange={handleFieldChange("currentPassword")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-10 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />
                                <motion.button
                                    type="button"
                                    onClick={() => openShowPassword1.toggle()}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                                >
                                    {openShowPassword1.isOpen ? <IoEyeOff /> : <IoEye />}
                                </motion.button>
                            </div>

                            {/* Nueva contraseña */}
                            <div className="relative">
                                <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type={openShowPassword2.isOpen ? "text" : "password"}
                                    placeholder="Nueva contraseña"
                                    id="newPassword"
                                    name="newPassword"
                                    autoComplete="new-password"
                                    value={changePassword.newPassword}
                                    onChange={handleFieldChange("newPassword")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-3 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />
                                <motion.button
                                    type="button"
                                    onClick={() => openShowPassword2.toggle()}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                                >
                                    {openShowPassword2.isOpen ? <IoEyeOff /> : <IoEye />}
                                </motion.button>
                            </div>

                            {/* Confirmar contraseña */}
                            <div className="relative">
                                <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type={openShowPassword3.isOpen ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    autoComplete="new-password"
                                    placeholder="Confirmar nueva contraseña"
                                    value={changePassword.confirmPassword}
                                    onChange={handleFieldChange("confirmPassword")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-3 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />

                                <motion.button
                                    type="button"
                                    onClick={() => openShowPassword3.toggle()}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                                >
                                    {openShowPassword3.isOpen ? <IoEyeOff /> : <IoEye />}
                                </motion.button>
                            </div>

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
                                    onClick={handleCloseModal}
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
