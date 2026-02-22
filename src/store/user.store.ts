import { create } from "zustand";
import { toast } from "sonner";
import { CrearUsuario, EditarUsuario, EliminarUsuario, ObtenerUsuarios } from "../services/user.service";
import type { CreateUserInput, UpdateUserInput, User, UUID } from "../types/user.types";

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  fetchUsers: () => Promise<void>;
  createUser: (payload: CreateUserInput) => Promise<User | null>;
  updateUser: (payload: UpdateUserInput) => Promise<User | null>;
  deleteUser: (id: UUID) => Promise<boolean>;
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
      const users = await ObtenerUsuarios();
      set({ users, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "No se pudieron obtener los usuarios.";
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },
  createUser: async (payload) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const newUser = await CrearUsuario({ user: payload });
      const successMessage = "Usuario creado correctamente.";
      set((state) => ({
        users: [...state.users, newUser],
        error: null,
        successMessage,
      }));
      toast.success(successMessage);
      return newUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "No se pudo crear el usuario.";
      set({ error: errorMessage, successMessage: null });
      toast.error(errorMessage);
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
  updateUser: async (payload) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const { id, ...userPayload } = payload;
      const updatedUser = await EditarUsuario({
        id,
        user: userPayload,
      });
      const successMessage = "Usuario actualizado correctamente.";
      set((state) => ({
        users: state.users.map((user) => (user.id === id ? updatedUser : user)),
        error: null,
        successMessage,
      }));
      toast.success(successMessage);
      return updatedUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "No se pudo actualizar el usuario.";
      set({ error: errorMessage, successMessage: null });
      toast.error(errorMessage);
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteUser: async (id) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const { message } = await EliminarUsuario({ id });
      const successMessage = message || "Usuario eliminado correctamente.";
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        error: null,
        successMessage,
      }));
      toast.success(successMessage);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "No se pudo eliminar el usuario.";
      set({ error: errorMessage, successMessage: null });
      toast.error(errorMessage);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
  getUserById: (id) => get().users.find((user) => user.id === id),
  clearMessages: () => set({ error: null, successMessage: null }),
}));
