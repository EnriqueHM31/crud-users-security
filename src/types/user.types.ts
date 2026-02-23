export type UUID = string;

export type UserRole = "admin" | "user";

export interface User {
    id_usuario: UUID;
    nombre_usuario: string;
    nombre_completo: string;
    correo_electronico: string;
    fecha_creacion: string;
    fecha_actualizacion: string;
    role: UserRole;
    contrasena: string;
}

export interface CreateUserInput {
    username: string;
    name: string;
    password: string;
    email: string;
    role?: UserRole;
}

export interface UpdateUserInput extends Partial<CreateUserInput> {
    id: UUID;
}
