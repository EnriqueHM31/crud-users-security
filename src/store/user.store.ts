import { toast } from "sonner";
import { create } from "zustand";
import { CrearUsuario, EditarUsuario, EliminarUsuario, ObtenerUsuarios } from "../services/user.service";
import type { User, UUID } from "../types/user.types";

interface UserState {
    users: User[];
    isLoading: boolean;
    error: string | null;
    successMessage: string | null;
    fetchUsers: () => Promise<void>;
    createUser: (user: Omit<User, "id_usuario" | "fecha_creacion" | "fecha_actualizacion">) => Promise<void>;
    updateUser: (id_usuario: UUID, user: Omit<User, "id_usuario" | "fecha_creacion" | "fecha_actualizacion">) => Promise<void>;
    deleteUser: (id_usuario: UUID) => Promise<void>;
    getUserById: (id: UUID) => User | undefined;
    clearMessages: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
    users: [],
    isLoading: false,
    error: null,
    successMessage: null,

    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const { data: users } = await ObtenerUsuarios();
            set({ users, error: null });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "No se pudieron obtener los usuarios.";
            set({ error: errorMessage });
            toast.error(errorMessage);
        } finally {
            set({ isLoading: false });
        }
    },

    createUser: async (user: Omit<User, "id_usuario" | "fecha_creacion" | "fecha_actualizacion">) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
            const { data: newUser, message } = await CrearUsuario({ user });
            const successMessage = message || "Usuario creado correctamente.";
            set((state) => ({
                users: [...state.users, newUser],
                error: null,
                successMessage,
            }));
            toast.success(successMessage);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "No se pudo crear el usuario.";
            set({ error: errorMessage, successMessage: null });
            toast.error(errorMessage);
        } finally {
            set({ isLoading: false });
        }
    },
    updateUser: async (id_usuario, user) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
            const { data: updatedUser, message } = await EditarUsuario({
                id_usuario,
                user: user as Omit<User, "id_usuario | fecha_creacion | fecha_actualizacion">,
            });
            const successMessage = message || "Usuario actualizado correctamente.";
            set((state) => ({
                users: state.users.map((user) => (user.id_usuario === id_usuario ? updatedUser : user)),
                error: null,
                successMessage,
            }));
            toast.success(successMessage);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "No se pudo actualizar el usuario.";
            set({ error: errorMessage, successMessage: null });
            toast.error(errorMessage);
        } finally {
            set({ isLoading: false });
        }
    },
    deleteUser: async (id_usuario) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
            const { message } = await EliminarUsuario({ id_usuario });
            const successMessage = message || "Usuario eliminado correctamente.";
            set((state) => ({
                users: state.users.filter((user) => user.id_usuario !== id_usuario),
                error: null,
                successMessage,
            }));
            toast.success(successMessage);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "No se pudo eliminar el usuario.";
            set({ error: errorMessage, successMessage: null });
            toast.error(errorMessage);
        } finally {
            set({ isLoading: false });
        }
    },
    getUserById: (id) => get().users.find((user) => user.id_usuario === id),
    clearMessages: () => set({ error: null, successMessage: null }),
}));
