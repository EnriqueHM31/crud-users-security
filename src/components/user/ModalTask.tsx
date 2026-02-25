import { AnimatePresence, motion } from "framer-motion";
import { useState, type ChangeEvent } from "react";
import { FaTasks } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { toast } from "sonner";
import { useAuthenticatedUser } from "../../hooks/useUsersStore";
import type { TaskCreate } from "../../types/task.types";
import type { UUID } from "../../types/user.types";

interface CreateTaskInput {
    titulo: string;
    descripcion: string;
}

interface CreateTaskModalProps {
    open: boolean;
    close: () => void;
    onSubmit: (userId: UUID, task: TaskCreate) => void;
}

export function CreateTaskModal({ open, close, onSubmit }: CreateTaskModalProps) {
    const userId = useAuthenticatedUser()?.id_usuario;
    const [formTask, setFormTask] = useState<TaskCreate>({
        titulo: "",
        descripcion: "",
    });

    const handleFieldChange = (field: keyof CreateTaskInput) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormTask((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formTask.titulo.trim()) {
            toast.error("El título es obligatorio.");
            return;
        }

        onSubmit(userId as UUID, formTask);
        setFormTask({ titulo: "", descripcion: "" });
        close();
    };

    const handleCloseTask = () => {
        setFormTask({ titulo: "", descripcion: "" });
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
                    onClick={() => handleCloseTask()}
                >
                    <motion.div
                        className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl"
                        initial={{ scale: 0.95, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 40 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold text-slate-100">Gestión de tareas</h2>

                        <h3 className="mt-2 text-lg font-semibold text-blue-400">Nueva tarea</h3>

                        <p className="mt-1 mb-5 text-sm text-slate-400">Completa la información para registrar una nueva tarea.</p>

                        <form className="grid gap-4" onSubmit={handleSubmit}>
                            <div className="relative">
                                <FaTasks className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    id="title"
                                    autoComplete="title"
                                    placeholder="Título de la tarea"
                                    value={formTask.titulo}
                                    onChange={handleFieldChange("titulo")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-3 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="relative">
                                <IoDocumentTextOutline className="absolute top-3 left-3 text-slate-500" />
                                <textarea
                                    placeholder="Descripción"
                                    id="description"
                                    autoComplete="description"
                                    value={formTask.descripcion}
                                    onChange={handleFieldChange("descripcion")}
                                    rows={4}
                                    className="w-full resize-none rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-3 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />
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
                                    Guardar tarea
                                </motion.button>

                                <motion.button
                                    initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                    animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                    whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                    whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                                    type="button"
                                    onClick={() => handleCloseTask()}
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
