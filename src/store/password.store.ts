import { create } from "zustand";
import { toast } from "sonner";
import { resetearContrasena, CambiarContrasena, RequestResetEmail } from "../services/password.service";

interface PasswordState {
    isLoading: boolean;
    error: string | null;
    successMessage: string | null;

    editPasswordUser: (id_usuario: string, password: string) => Promise<void>;
    changePassword: (currentPassword: string, newPassword: string, id_usuario: string) => Promise<void>;
    requestResetEmail: (email: string) => Promise<void>;
}

export const usePasswordStore = create<PasswordState>((set) => ({
    isLoading: false,
    error: null,
    successMessage: null,

    // 🔹 Admin cambia contraseña de cualquier usuario
    editPasswordUser: async (id_usuario, password) => {
        set({ isLoading: true, error: null, successMessage: null });

        try {
            const { message } = await resetearContrasena({
                id_usuario,
                contrasena: password,
            });

            const successMessage = message || "Contraseña actualizada correctamente.";

            set({
                error: null,
                successMessage,
            });

            toast.success(successMessage);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "No se pudo actualizar la contraseña.";

            set({ error: errorMessage, successMessage: null });
            toast.error(errorMessage);
        } finally {
            set({ isLoading: false });
        }
    },

    // 🔹 Usuario cambia su propia contraseña
    changePassword: async (currentPassword, newPassword, id_usuario) => {
        set({ isLoading: true, error: null, successMessage: null });

        try {
            const { message } = await CambiarContrasena({
                contrasena_actual: currentPassword,
                contrasena: newPassword,
                id_usuario,
            });

            const successMessage = message || "Contraseña cambiada correctamente.";

            set({
                error: null,
                successMessage,
            });

            toast.success(successMessage);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "No se pudo cambiar la contraseña.";

            set({ error: errorMessage, successMessage: null });
            toast.error(errorMessage);
        } finally {
            set({ isLoading: false });
        }
    },

    requestResetEmail: async (email) => {
        set({ isLoading: true, error: null, successMessage: null });

        try {
            const { message } = await RequestResetEmail({ email });

            const successMessage = message || "Se ha enviado el código de reseteo.";

            set({
                error: null,
                successMessage,
            });

            toast.success(successMessage);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "No se pudo enviar el código de reseteo.";

            set({ error: errorMessage, successMessage: null });
            toast.error(errorMessage);
        } finally {
            set({ isLoading: false });
        }
    },
}));
