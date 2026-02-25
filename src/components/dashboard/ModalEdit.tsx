import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { FaEnvelope, FaIdBadge, FaUser, FaUserShield } from "react-icons/fa";
import { useOpen } from "../../hooks/useOpen";
import { usePasswordActions } from "../../hooks/usePasswordStore";
import type { CreateUserInput, User } from "../../types/user.types";
import { ModalEditConfirm } from "./ModalEditConfirm";
import { ModalResetPassword } from "./ModalResetContrasena";

interface EditUserModalProps {
    open: boolean;
    close: () => void;
    selectedUser: Omit<User, "fecha_creacion" | "fecha_actualizacion" | "contrasena">;
    onSubmit: (payload: Omit<User, "fecha_creacion" | "fecha_actualizacion" | "contrasena">) => void;
}

export function ModalEdit({ open, close, selectedUser, onSubmit }: EditUserModalProps) {
    const [values, setValues] = useState<Omit<User, "fecha_creacion" | "fecha_actualizacion" | "contrasena">>(selectedUser);
    const confirmModal = useOpen();
    const passwordModal = useOpen();
    const { editPasswordUser } = usePasswordActions();

    useEffect(() => {
        setValues(selectedUser);
    }, [selectedUser]);

    const handleFieldChange =
        (field: keyof Omit<User & CreateUserInput, "fecha_creacion" | "fecha_actualizacion">) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setValues((prev) => ({
                ...prev,
                [field]: event.target.value,
            }));
        };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        confirmModal.open();
    };

    const handleConfirm = () => {
        onSubmit(values);
        confirmModal.close();
        close();
    };

    const handleConfirmResetPassword = (password: string) => {
        console.log({ values });
        editPasswordUser(values.id_usuario, password);
        confirmModal.close();
        close();
    };

    return (
        <>
            <ModalEditConfirm open={confirmModal.isOpen} user={values} onCancel={confirmModal.close} onConfirm={handleConfirm} />

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={close}
                    >
                        <motion.div
                            className="flex h-screen w-full max-w-md flex-col rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl"
                            initial={{ scale: 0.95, opacity: 0, x: 40 }}
                            animate={{ scale: 1, opacity: 1, x: 0 }}
                            exit={{ scale: 0.95, opacity: 0, x: 40 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <header>
                                <div className="flex items-center gap-2">
                                    <img src="/logo.png" alt="logo" className="h-10 w-10 rounded-full" />
                                    <h2 className="text-2xl font-bold text-slate-100">Sistema de seguridad</h2>
                                </div>

                                <h3 className="mt-2 text-lg font-semibold text-blue-400">Editar usuario</h3>

                                <p className="mt-1 mb-5 text-sm text-slate-400">Modifica la información del usuario seleccionado.</p>
                            </header>

                            <form className="flex flex-1 flex-col gap-5" onSubmit={handleSubmit}>
                                <div className="relative">
                                    <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                    <input
                                        autoComplete="username"
                                        id="username"
                                        name="username"
                                        type="text"
                                        value={values.nombre_usuario}
                                        disabled
                                        className="w-full cursor-not-allowed rounded-lg border border-slate-800 bg-slate-800 py-2.5 pl-10 text-sm text-slate-400"
                                    />
                                </div>

                                <div className="relative">
                                    <FaIdBadge className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                    <input
                                        autoComplete="nombre_completo"
                                        id="nombre_completo"
                                        name="nombre_completo"
                                        type="text"
                                        placeholder="Nombre completo"
                                        value={values.nombre_completo}
                                        onChange={handleFieldChange("nombre_completo")}
                                        className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pl-10 text-sm text-slate-100 focus:border-blue-500"
                                    />
                                </div>

                                <div className="relative">
                                    <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                    <input
                                        autoComplete="email"
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={values.correo_electronico}
                                        onChange={handleFieldChange("correo_electronico")}
                                        className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pl-10 text-sm text-slate-100 focus:border-blue-500"
                                    />
                                </div>

                                <div className="relative">
                                    <FaUserShield className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                    <select
                                        autoComplete="rol"
                                        id="rol"
                                        name="rol"
                                        value={values.rol}
                                        onChange={handleFieldChange("rol")}
                                        className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pl-10 text-sm text-slate-100 focus:border-blue-500"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>

                                <div className="relative mt-4">
                                    <motion.button
                                        type="button"
                                        initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                        animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                        whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-blue-400 hover:text-slate-200"
                                        onClick={() => passwordModal.open()}
                                    >
                                        Resetear contraseña
                                    </motion.button>
                                </div>

                                <div className="flex flex-1 items-end gap-3 pt-2">
                                    <motion.button
                                        initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                        animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                        whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                                        type="submit"
                                        className="h-fit flex-1 cursor-pointer rounded-lg bg-blue-800 py-2 font-semibold text-white hover:bg-blue-900"
                                    >
                                        Guardar cambios
                                    </motion.button>

                                    <motion.button
                                        initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                        animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                        whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                                        type="button"
                                        onClick={close}
                                        className="h-fit flex-1 cursor-pointer rounded-lg border border-slate-700 py-2 font-semibold text-slate-300 hover:border-slate-500"
                                    >
                                        Cancelar
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ModalResetPassword
                open={passwordModal.isOpen}
                onCancel={passwordModal.close}
                onConfirm={handleConfirmResetPassword}
                userName={values.nombre_usuario}
            />
        </>
    );
}
