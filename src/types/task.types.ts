export interface Task {
    id_tarea: string;
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

    fetchTasks: (userId: string) => Promise<void>;
    createTask: (userId: string, task: TaskCreate) => Promise<void>;
    updateTask: (id: string, completado: boolean) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;

    clearError: () => void;
}
