import { toast } from "sonner";
import { create } from "zustand";
import { CrearUsuario, EditarUsuario, EliminarUsuario, ObtenerUsuarios } from "../services/user.service";
import type { UserCreate, UserState, UserUpdate } from "../types/user.types";

export const useUserStore = create<UserState>((set) => ({
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

    createUser: async (user: UserCreate) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
            const { data: newUser, message, ok } = await CrearUsuario({ user });

            if (!ok || !newUser) {
                throw new Error(message ?? "Error al crear usuario");
            }
            const successMessage = message || "Usuario creado correctamente.";
            set((state) => ({
                users: [...state.users, newUser],
                error: null,
                successMessage,
            }));
            toast.success(successMessage);
            return true;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "No se pudo crear el usuario.";
            set({ error: errorMessage, successMessage: null });
            toast.error(errorMessage);
            return false;
        } finally {
            set({ isLoading: false });
        }
    },
    updateUser: async (id_usuario, user) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
            const {
                data: updatedUser,
                message,
                ok,
            } = await EditarUsuario({
                id_usuario,
                user: user as UserUpdate,
            });

            if (!ok || !updatedUser) {
                throw new Error(message ?? "Error al actualizar usuario");
            }
            const successMessage = message || "Usuario actualizado correctamente.";
            set((state) => ({
                users: state.users.map((user) => (user.id_usuario === id_usuario ? updatedUser : user)),
                error: null,
                successMessage,
            }));
            toast.success(successMessage);
            return true;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "No se pudo actualizar el usuario.";
            set({ error: errorMessage, successMessage: null });
            toast.error(errorMessage);
            return false;
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
}));
