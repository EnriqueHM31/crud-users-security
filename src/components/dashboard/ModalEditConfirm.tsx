import { AnimatePresence, motion } from "framer-motion";
import type { User } from "../../types/user.types";

interface ModalEditConfirmProps {
    open: boolean;
    user: Omit<User, "id_usuario" | "fecha_creacion" | "fecha_actualizacion" | "contrasena">;
    onCancel: () => void;
    onConfirm: () => void;
}

export function ModalEditConfirm({ open, user, onCancel, onConfirm }: ModalEditConfirmProps) {
    return (
        <AnimatePresence>
            {open && user && (
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
                        <h3 className="mb-3 text-lg font-semibold">Confirmación de modificación</h3>

                        <p className="text-slate-300">
                            ¿Está seguro de que desea modificar el usuario <strong>{user.nombre_usuario}</strong>?
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <motion.button
                                type="button"
                                onClick={onCancel}
                                className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 font-semibold text-slate-100 hover:border-blue-500"
                            >
                                Cancelar
                            </motion.button>

                            <motion.button
                                type="button"
                                onClick={onConfirm}
                                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-blue-900 bg-blue-900/30 px-3 py-2 text-sm font-semibold text-blue-100 hover:border-blue-500"
                            >
                                Confirmar modificación
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
