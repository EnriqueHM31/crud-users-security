import { toast } from "sonner";
import { create } from "zustand";
import { CrearTarea, EditarTarea, EliminarTarea, ObtenerTareasUser } from "../services/tarea.service";
import type { TaskState } from "../types/task.types";

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
