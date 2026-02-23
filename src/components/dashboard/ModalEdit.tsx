import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { FaEnvelope, FaIdBadge, FaUser, FaUserShield } from "react-icons/fa";
import { useOpen } from "../../hooks/useOpen";
import type { CreateUserInput, User } from "../../types/user.types";
import { ModalEditConfirm } from "./ModalEditConfirm";

interface EditUserModalProps {
    open: boolean;
    close: () => void;
    selectedUser: Omit<User, "id_usuario" | "fecha_creacion" | "fecha_actualizacion" | "contrasena">;
    onSubmit: (payload: Omit<User, "id_usuario" | "fecha_creacion" | "fecha_actualizacion" | "contrasena">) => void;
}

export function ModalEdit({ open, close, selectedUser, onSubmit }: EditUserModalProps) {
    const [values, setValues] = useState<Omit<User, "id_usuario" | "fecha_creacion" | "fecha_actualizacion" | "contrasena">>(selectedUser);
    const confirmModal = useOpen();

    useEffect(() => {
        setValues(selectedUser);
    }, [selectedUser]);

    const handleFieldChange =
        (field: keyof Omit<User & CreateUserInput, "id_usuario" | "fecha_creacion" | "fecha_actualizacion">) =>
        (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    return (
        <>
            <ModalEditConfirm open={confirmModal.isOpen} user={values} onCancel={confirmModal.close} onConfirm={handleConfirm} />

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
                            <h2 className="text-2xl font-bold text-slate-100">Sistema de usuarios</h2>

                            <h3 className="mt-2 text-lg font-semibold text-blue-400">Editar usuario</h3>

                            <p className="mt-1 mb-5 text-sm text-slate-400">Modifica la información del usuario seleccionado.</p>

                            <form className="grid gap-4" onSubmit={handleSubmit}>
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

                                <div className="flex gap-3 pt-2">
                                    <motion.button type="submit" className="flex-1 rounded-lg bg-blue-800 py-2 font-semibold text-white hover:bg-blue-900">
                                        Guardar cambios
                                    </motion.button>

                                    <motion.button
                                        type="button"
                                        onClick={close}
                                        className="flex-1 rounded-lg border border-slate-700 py-2 font-semibold text-slate-300 hover:border-slate-500"
                                    >
                                        Cancelar
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
