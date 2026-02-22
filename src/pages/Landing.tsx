import { motion } from "framer-motion";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { CreateTaskModal } from "../components/UserPage/ModalTask";
import { useAuthenticatedUser } from "../hooks/useUsers";

interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

export default function Landing() {
    const user = useAuthenticatedUser();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const handleCreateTask = () => {
        if (!title.trim()) return;

        const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            description,
            completed: false,
        };

        setTasks((prev) => [...prev, newTask]);
        setTitle("");
        setDescription("");
        setIsOpen(false);
    };

    const toggleTask = (id: string) => {
        setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
    };

    return (
        <AppLayout title={`Bienvenido, ${user.name}`}>
            <motion.section className="rounded-xl border border-slate-800 bg-slate-950/80 p-6 shadow-xl" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Ruta protegida - Gestión de tareas</h2>

                    <motion.button
                        initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                        animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                        whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                        onClick={() => setIsOpen(true)}
                        className="cursor-pointer rounded-lg bg-blue-800 px-4 py-2 text-sm font-medium hover:bg-indigo-900"
                    >
                        Agregar tarea
                    </motion.button>
                </div>

                {/* Lista de tareas */}
                <div className="space-y-4">
                    {tasks.length === 0 && <p className="text-sm text-slate-400">No hay tareas registradas.</p>}

                    {tasks.map((task) => (
                        <div key={task.id} className="flex items-start justify-between rounded-lg border border-slate-800 bg-slate-900 p-4">
                            <div>
                                <h3 className={`font-semibold ${task.completed ? "text-slate-500 line-through" : ""}`}>{task.title}</h3>
                                <p className="text-sm text-slate-400">{task.description}</p>
                            </div>

                            <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} className="mt-1 h-5 w-5" />
                        </div>
                    ))}
                </div>
            </motion.section>

            <CreateTaskModal open={isOpen} close={() => setIsOpen(false)} onSubmit={handleCreateTask} />
        </AppLayout>
    );
}
