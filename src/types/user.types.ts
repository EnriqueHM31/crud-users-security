export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export type UserRole = "admin" | "user";

export interface User {
    id_usuario: UUID;
    nombre_usuario: string;
    nombre_completo: string;
    correo_electronico: string;
    fecha_creacion: string;
    fecha_actualizacion: string;
    rol: UserRole;
    contrasena: string;
}

export interface CreateUserInput {
    username: string;
    name: string;
    password: string;
    email: string;
    rol?: UserRole;
}

export interface UpdateUserInput extends Partial<CreateUserInput> {
    id: UUID;
}

export interface UserState {
    users: User[];
    isLoading: boolean;
    error: string | null;
    successMessage: string | null;
    fetchUsers: () => Promise<void>;
    createUser: (user: Omit<User, "id_usuario" | "fecha_creacion" | "fecha_actualizacion">) => Promise<void>;
    updateUser: (id_usuario: UUID, user: Omit<User, "id_usuario" | "fecha_creacion" | "fecha_actualizacion" | "contrasena">) => Promise<void>;
    deleteUser: (id_usuario: UUID) => Promise<void>;
}

export type UserCreate = Omit<User, "id_usuario" | "fecha_creacion" | "fecha_actualizacion">;

export type UserUpdate = Omit<User, "id_usuario" | "fecha_creacion" | "fecha_actualizacion" | "contrasena">;

export type UserLogueado = Omit<User, "contrasena" | "fecha_actualizacion">;
