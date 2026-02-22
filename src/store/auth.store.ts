import { create } from "zustand";
import { toast } from "sonner";
import { CerrarSesion, CheckSession, Login } from "../services/auth.service";
import type { AuthStore } from "../types/auth.types";

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  currentUserId: null,
  isLoading: false,
  error: null,
  successMessage: null,

  login: async ({ username, password }) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const { data, message } = await Login({ username, password });
      const successMessage = message || "Inicio de sesion exitoso.";

      set({
        isAuthenticated: true,
        currentUserId: data.id ?? null,
        error: null,
        successMessage,
      });
      toast.success(successMessage);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "No se pudo iniciar sesion.";
      set({
        isAuthenticated: false,
        currentUserId: null,
        error: errorMessage,
        successMessage: null,
      });
      toast.error(errorMessage);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const { message } = await CerrarSesion();
      const successMessage = message || "Sesion cerrada correctamente.";
      set({
        isAuthenticated: false,
        currentUserId: null,
        error: null,
        successMessage,
      });
      toast.success(successMessage);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "No se pudo cerrar sesion.";
      set({ error: errorMessage, successMessage: null });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },
  checkSession: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await CheckSession();
      set({
        isAuthenticated: data,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "No se pudo validar la sesion.";
      set({
        isAuthenticated: false,
        currentUserId: null,
        error: errorMessage,
      });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },
  clearMessages: () => {
    set({ error: null, successMessage: null });
  },
}));
