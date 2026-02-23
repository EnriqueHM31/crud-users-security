import { create } from "zustand";
import { toast } from "sonner";
import type { Task } from "../types/task.types";
import { ObtenerTareasUser, CrearTarea, EditarTarea, EliminarTarea } from "../services/tarea.service";

interface TaskState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;

    fetchTasks: (userId: string) => Promise<void>;
    createTask: (userId: string, task: Omit<Task, "id_tarea" | "fecha_creacion" | "completada" | "id_usuario">) => Promise<void>;
    updateTask: (id: string, completado: boolean) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;

    clearError: () => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
    tasks: [],
    isLoading: false,
    error: null,

    clearError: () => set({ error: null }),

    fetchTasks: async (userId) => {
        set({ isLoading: true, error: null });

        try {
            const { data } = await ObtenerTareasUser({ id: userId });
            set({ tasks: data, isLoading: false });
        } catch (err) {
            const message = (err as Error).message;
            set({ error: message, isLoading: false });
            toast.error(message);
        }
    },

    createTask: async (userId, task) => {
        set({ isLoading: true, error: null });

        try {
            const { data } = await CrearTarea({ id: userId, task });

            set({
                tasks: [data, ...get().tasks],
                isLoading: false,
            });

            toast.success("Tarea creada correctamente");
        } catch (err) {
            const message = (err as Error).message;
            set({ error: message, isLoading: false });
            toast.error(message);
        }
    },

    updateTask: async (id_tarea, completado) => {
        set({ isLoading: true, error: null });

        try {
            const { data } = await EditarTarea({ id_tarea, completado });

            set({
                tasks: get().tasks.map((t) => (t.id_tarea === data.id_tarea ? data : t)),
                isLoading: false,
            });

            toast.success("Tarea actualizada");
        } catch (err) {
            const message = (err as Error).message;
            set({ error: message, isLoading: false });
            toast.error(message);
        }
    },

    deleteTask: async (id) => {
        set({ isLoading: true, error: null });

        try {
            await EliminarTarea({ id });

            set({
                tasks: get().tasks.filter((t) => t.id_tarea !== id),
                isLoading: false,
            });

            toast.success("Tarea eliminada");
        } catch (err) {
            const message = (err as Error).message;
            set({ error: message, isLoading: false });
            toast.error(message);
        }
    },
}));
