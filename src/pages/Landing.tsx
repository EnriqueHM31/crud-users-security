import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { CreateTaskModal } from "../components/UserPage/ModalTask";
import { useOpen } from "../hooks/useOpen";
import { useAuthenticatedUser } from "../hooks/useUsers";
import { useTaskStore } from "../store/task.store";
import { ModalDeleteTask } from "../components/UserPage/ModalDeleteTask";
import type { Task } from "../types/task.types";

export default function Landing() {
    const user = useAuthenticatedUser();
    const { fetchTasks, tasks, createTask, updateTask, deleteTask } = useTaskStore();
    const [taskEliminated, setTaskEliminated] = useState<Task | null>(null);

    const openModalCreateTask = useOpen();
    const openModalDeleteTask = useOpen();

    useEffect(() => {
        if (!user) return;
        void fetchTasks(user.id_usuario);
    }, [fetchTasks, user]);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const handleSubmitCompleteTask = async ({ id_tarea }: { id_tarea: string }) => {
        await updateTask(id_tarea, true);
    };

    const handleSubmitDeleteTask = async () => {
        if (!taskEliminated) return;

        await deleteTask(taskEliminated.id_tarea);
        handleTaskDeleted();
    };

    const handleTaskDeletedModal = (task: Task | null) => {
        openModalDeleteTask.open();
        setTaskEliminated(task);
    };

    const handleTaskDeleted = () => {
        openModalDeleteTask.close();
        setTaskEliminated(null);
    };
    return (
        <AppLayout title={`Bienvenido, ${user.nombre_completo}`} descripcion="Aquí podrás gestionar tus tareas.">
            <motion.section
                className="rounded-xl border border-slate-800 bg-slate-950/80 p-6 shadow-xl"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Ruta protegida - Gestión de tareas</h2>

                    <motion.button
                        initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                        animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                        whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                        onClick={() => openModalCreateTask.open()}
                        className="cursor-pointer rounded-lg bg-blue-800 px-4 py-2 text-sm font-medium hover:bg-indigo-900"
                    >
                        Agregar tarea
                    </motion.button>
                </div>

                {/* Lista de tareas */}
                <div className="flex flex-col gap-5">
                    {tasks.length === 0 && <p className="text-sm text-slate-400">No hay tareas registradas.</p>}

                    {tasks.map((task) => {
                        const fecha = new Date(task.fecha_creacion).toLocaleDateString();
                        return (
                            <div
                                key={task.id_tarea}
                                className="group relative flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-5 shadow-sm transition-all duration-300 hover:border-slate-700 hover:bg-slate-900"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h3
                                            className={`text-lg font-semibold transition-all ${task.completada ? "text-slate-500 line-through" : "text-white"}`}
                                        >
                                            {task.titulo}
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-400">{task.descripcion}</p>
                                    </div>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                                            task.completada ? "bg-emerald-900/40 text-emerald-400" : "bg-yellow-900/40 text-yellow-400"
                                        }`}
                                    >
                                        {task.completada ? "Completada" : "Pendiente"}
                                    </span>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                                    <span className="text-xs text-slate-500">Creada el {fecha}</span>

                                    <div className="flex items-center gap-3">
                                        <motion.button
                                            initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                            animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                            whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                            whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                                            onClick={() =>
                                                handleSubmitCompleteTask({
                                                    id_tarea: task.id_tarea,
                                                })
                                            }
                                            disabled={Boolean(task.completada)}
                                            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium ${
                                                task.completada
                                                    ? "cursor-not-allowed bg-slate-800 text-slate-500"
                                                    : "bg-blue-800 text-white hover:bg-blue-900 active:scale-95"
                                            }`}
                                        >
                                            {task.completada ? "Tarea completada" : "Completar tarea"}
                                        </motion.button>

                                        <motion.button
                                            initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                            animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                            whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                            whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                                            onClick={() => handleTaskDeletedModal(task)}
                                            className="cursor-pointer rounded-lg bg-red-800 px-4 py-2 text-sm font-medium text-white hover:bg-red-900"
                                        >
                                            Eliminar
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </motion.section>
            <ModalDeleteTask open={openModalDeleteTask.isOpen} close={handleTaskDeleted} onDelete={handleSubmitDeleteTask} task={taskEliminated} />

            <CreateTaskModal open={openModalCreateTask.isOpen} close={openModalCreateTask.close} onSubmit={createTask} />
        </AppLayout>
    );
}
