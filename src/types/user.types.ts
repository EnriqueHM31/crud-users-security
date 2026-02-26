export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export type UserRole = "admin" | "user";

export interface User {
    id_usuario: UUID;
    nombre_usuario: string;
    nombre_completo: string;
    correo_electronico: string;
    telefono: string;
    fecha_creacion: string;
    fecha_actualizacion: string;
    rol: UserRole;
    contrasena: string;
}

export interface UpdateUserInput extends Partial<User> {
    id: UUID;
}

export type UserCreate = Omit<User, "id_usuario" | "fecha_creacion" | "fecha_actualizacion">;

export type UserUpdate = Omit<User, "id_usuario" | "fecha_creacion" | "fecha_actualizacion" | "contrasena">;

export type UserLogueado = Omit<User, "contrasena" | "fecha_actualizacion">;

export interface UserState {
    users: User[];
    isLoading: boolean;
    error: string | null;
    successMessage: string | null;
    fetchUsers: () => Promise<void>;
    createUser: (user: UserCreate) => Promise<boolean>;
    updateUser: (id_usuario: UUID, user: UserUpdate) => Promise<boolean>;
    deleteUser: (id_usuario: UUID) => Promise<void>;
}
