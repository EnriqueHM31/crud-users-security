import { FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import PasswordValidate from "../layout/PasswordValidate";
import { useOpen } from "../../hooks/useOpen";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from "sonner";
import { changePasswordLoginSchema } from "../../utils/schemas.util";

export interface ModalResetProps {
    changePassword: {
        newPassword: string;
        confirmPassword: string;
    };
    handleChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
    close: () => void;
}

export default function ModalReset({ changePassword, handleChangePassword, handleSubmit, isLoading, close }: ModalResetProps) {
    const openShowPassword = useOpen();

    const handleSubmitContrasenaLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validation = changePasswordLoginSchema.safeParse(changePassword as Record<string, unknown>);

        if (!validation.success) {
            toast.error(validation?.error?.issues[0]?.message ?? "La nueva contraseña no cumple las reglas de seguridad.");
            return;
        }

        if (!changePassword.newPassword || !changePassword.confirmPassword) {
            toast.error("Todos los campos son obligatorios.");
            return;
        }

        if (changePassword.newPassword !== changePassword.confirmPassword) {
            toast.error("Las contraseñas no coinciden.");
            return;
        }

        handleSubmit(e);
    };
    return (
        <>
            <h2 className="text-2xl font-bold text-slate-100">Nueva contraseña</h2>

            <form onSubmit={(e) => handleSubmitContrasenaLogin(e)} className="mt-4 grid gap-4">
                <PasswordValidate
                    value={changePassword.newPassword}
                    onChange={handleChangePassword}
                    placeholder="Nueva contraseña"
                    name="newPassword"
                    id="newPassword"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-10 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                />

                <div className="relative">
                    <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                    <input
                        type={openShowPassword.isOpen ? "text" : "password"}
                        placeholder="Confirmar contraseña"
                        name="confirmPassword"
                        autoComplete="new-password"
                        id="confirmPassword"
                        disabled={isLoading}
                        value={changePassword.confirmPassword}
                        onChange={handleChangePassword}
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pl-10 text-sm text-white outline-none focus:border-blue-500"
                    />

                    <motion.button
                        type="button"
                        tabIndex={-1}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => openShowPassword.toggle()}
                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-blue-400"
                        whileTap={{ scale: 0.9 }}
                    >
                        {openShowPassword.isOpen ? <IoEye size={18} /> : <IoEyeOff size={18} />}
                    </motion.button>
                </div>

                <div className="flex gap-3">
                    <motion.button
                        initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                        animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                        whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                        disabled={isLoading}
                        type="submit"
                        className="flex-1 cursor-pointer rounded-lg bg-blue-800 py-2 font-semibold text-white hover:bg-blue-900"
                    >
                        {isLoading ? "Actualizando..." : "Actualizar contraseña"}
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
        </>
    );
}
