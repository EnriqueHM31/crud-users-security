import { useAuthStore } from "../store/auth.store";
import { useShallow } from "zustand/react/shallow";
import type { UserRole } from "../types/user.types";

export const useIsAuthenticated = (): boolean => useAuthStore((state) => state.isAuthenticated);

function getRolFromUser(user: { rol?: UserRole; role?: UserRole } | null): UserRole | null {
    if (!user) return null;
    return user.rol ?? (user as { role?: UserRole }).role ?? null;
}

export const useUserRole = (): UserRole | null => useAuthStore((state) => getRolFromUser(state.userAuthenticated));

export const useHasRole = (rol: UserRole): boolean => useAuthStore((state) => getRolFromUser(state.userAuthenticated) === rol);

export const useHasAnyRole = (roles: UserRole[]): boolean =>
    useAuthStore((state) => {
        const rol = getRolFromUser(state.userAuthenticated);
        return rol ? roles.includes(rol) : false;
    });

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
