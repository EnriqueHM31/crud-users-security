import type { UUID } from "./user.types";

export interface Task {
    id_tarea: UUID;
    titulo: string;
    descripcion: string;
    id_usuario: string;
    completada: number;
    fecha_creacion: string;
}

export interface CreateTaskInput {
    title: string;
    description: string;
}

export type TaskCreate = Omit<Task, "id_tarea" | "fecha_creacion" | "completada" | "id_usuario">;

export interface TaskState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;

    fetchTasks: (userId: UUID) => Promise<void>;
    createTask: (userId: UUID, task: TaskCreate) => Promise<void>;
    updateTask: (id: UUID, completado: boolean) => Promise<void>;
    deleteTask: (id: UUID) => Promise<void>;

    clearError: () => void;
}

/* -----------------------------------------------------*/
