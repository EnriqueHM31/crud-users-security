import { AnimatePresence, motion } from "framer-motion";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { FaLock } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from "sonner";
import { useCurrentUserId } from "../../hooks/useAuthStore";
import { useOpen } from "../../hooks/useOpen";
import { usePasswordActions } from "../../hooks/usePasswordStore";
import { changePasswordSchema } from "../../utils/schemas.util";
import PasswordValidate from "../layout/PasswordValidate";

interface ChangePasswordModalProps {
    open: boolean;
    close: () => void;
}

export function ModalContraseña({ open, close }: ChangePasswordModalProps) {
    const userId = useCurrentUserId();
    const { changePassword } = usePasswordActions();

    const [formChangePassword, setFormChangePassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const openShowPassword1 = useOpen();
    const openShowPassword3 = useOpen();

    const handleFieldChange = (field: keyof typeof formChangePassword) => (event: ChangeEvent<HTMLInputElement>) => {
        setFormChangePassword((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const resetForm = () => {
        setFormChangePassword({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!userId) {
            toast.error("No se puede cambiar la contraseña sin identificarse.");
            return;
        }

        const validation = changePasswordSchema.safeParse(formChangePassword as Record<string, unknown>);
        console.log({ validation });

        if (!validation.success) {
            toast.error(validation?.error?.issues[0]?.message ?? "La nueva contraseña no cumple las reglas de seguridad.");
            return;
        }

        console.log(validation.data);

        const isValid = await changePassword(validation.data.currentPassword, validation.data.newPassword, userId);

        if (isValid) {
            resetForm();
            close();
        }
    };

    const handleCloseModal = () => {
        resetForm();
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
                        <header className="mb-5">
                            <h2 className="text-2xl font-bold text-slate-100">Cambiar contraseña</h2>
                            <p className="text-sm text-slate-400">Actualiza tu contraseña para mantener tu cuenta segura.</p>
                        </header>

                        <form className="grid gap-4" onSubmit={handleSubmit}>
                            {/* Contraseña actual */}
                            <div className="relative">
                                <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type={openShowPassword1.isOpen ? "text" : "password"}
                                    placeholder="Contraseña actual"
                                    name="currentPassword"
                                    id="currentPassword"
                                    autoComplete="current-password"
                                    value={formChangePassword.currentPassword}
                                    onChange={handleFieldChange("currentPassword")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-10 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => openShowPassword1.toggle()}
                                    tabIndex={-1}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400"
                                >
                                    {openShowPassword1.isOpen ? <IoEye /> : <IoEyeOff />}
                                </button>
                            </div>

                            {/* Nueva contraseña */}
                            <PasswordValidate
                                value={formChangePassword.newPassword}
                                onChange={handleFieldChange("newPassword")}
                                placeholder="Nueva contraseña"
                                name="newPassword"
                                id="newPassword"
                                className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-10 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                            />

                            {/* Confirmar contraseña */}
                            <div className="relative">
                                <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type={openShowPassword3.isOpen ? "text" : "password"}
                                    placeholder="Confirmar nueva contraseña"
                                    autoComplete="new-password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    value={formChangePassword.confirmPassword}
                                    onChange={handleFieldChange("confirmPassword")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-10 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => openShowPassword3.toggle()}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400"
                                    tabIndex={-1}
                                >
                                    {openShowPassword3.isOpen ? <IoEye /> : <IoEyeOff />}
                                </button>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <motion.button
                                    initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                    animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                    whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                    whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                                    type="submit"
                                    className="flex-1 cursor-pointer rounded-lg bg-blue-800 py-2 font-semibold text-white hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
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
