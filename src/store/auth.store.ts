import { create } from "zustand";
import { toast } from "sonner";
import { CerrarSesion, Login } from "../services/auth.service";
import { API_URL_AUTH } from "../config";
import type { AuthStore } from "../types/auth.types";
import type { UserRole } from "../types/user.types";

function normalizeUser(data: Record<string, unknown> | null): AuthStore["userAuthenticated"] {
    if (!data) return null;
    const rol = (data.rol ?? data.role) as UserRole | undefined;
    return { ...data, rol } as AuthStore["userAuthenticated"];
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    userAuthenticated: null,
    isLoading: false,
    error: null,
    successMessage: null,

    login: async ({ username, password }) => {
        set({ isLoading: true });

        try {
            const { data, message } = await Login({ username, password });

            set({
                isAuthenticated: true,
                userAuthenticated: normalizeUser(data as Record<string, unknown>) || data || null,
                error: null,
                successMessage: message,
            });

            toast.success(message || "Inicio de sesión exitoso");

            return true;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error al iniciar sesión";

            set({
                isAuthenticated: false,
                userAuthenticated: null,
                error: errorMessage,
            });

            toast.error(errorMessage);

            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    logout: async () => {
        set({ isLoading: true });

        try {
            const { message } = await CerrarSesion();

            set({
                isAuthenticated: false,
                userAuthenticated: null,
            });

            toast.success(message);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error al cerrar sesión";

            toast.error(errorMessage);
        } finally {
            set({ isLoading: false });
        }
    },

    checkSession: async () => {
        set({ isLoading: true });

        try {
            const response = await fetch(API_URL_AUTH + "/verify", {
                method: "POST",
                credentials: "include",
            });

            const { data } = await response.json();
            const user = data ? normalizeUser(data) : null;

            set({
                isAuthenticated: !!user,
                userAuthenticated: user,
            });

            return !!data;
        } catch {
            set({
                isAuthenticated: false,
                userAuthenticated: null,
            });

            return false;
        } finally {
            set({ isLoading: false });
        }
    },
}));
