import { AnimatePresence, motion } from "framer-motion";
import { useUserActions } from "../../hooks/useUsersStore";
import type { User } from "../../types/user.types";

interface DeleteUserDialogProps {
    user: User | null;
    onCancel: () => void;
}

export function DeleteUserDialog({ user, onCancel }: DeleteUserDialogProps) {
    const { deleteUser } = useUserActions();
    return (
        <AnimatePresence>
            {user ? (
                <motion.div
                    className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
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
                        <h3 className="mb-3 text-lg font-semibold">Confirmacion de eliminación</h3>
                        <p className="text-slate-300">
                            ¿Está seguro de que desea eliminar el usuario <strong>{user.nombre_usuario}</strong>?
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <motion.button
                                initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                type="button"
                                className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 font-semibold text-slate-100 hover:border-blue-500"
                                onClick={onCancel}
                            >
                                Cancelar
                            </motion.button>
                            <motion.button
                                type="button"
                                initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-900 bg-red-900/30 px-3 py-2 text-sm font-semibold text-red-100 hover:border-red-500"
                                onClick={() => deleteUser(user.id_usuario)}
                            >
                                Eliminar
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
