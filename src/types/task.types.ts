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
