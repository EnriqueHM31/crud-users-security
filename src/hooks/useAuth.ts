import { useAuthStore } from "../store/auth.store";
import { useShallow } from "zustand/react/shallow";

export const useIsAuthenticated = (): boolean => useAuthStore((state) => state.isAuthenticated);

export const useAuthActions = () =>
    useAuthStore(
        useShallow((state) => ({
            login: state.login,
            logout: state.logout,
            checkSession: state.checkSession,
            clearMessages: state.clearMessages,
        }))
    );

export const useAuthLoading = (): boolean => useAuthStore((state) => state.isLoading);

export const useCurrentUserId = () => useAuthStore((state) => state.userAuthenticated?.id_usuario);
