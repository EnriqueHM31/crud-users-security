import { useAuthStore } from "../store/auth.store";
import { useUserStore } from "../store/user.store";
import { useShallow } from "zustand/react/shallow";
import type { UserRole } from "../types/user.types";

export const useIsAuthenticated = (): boolean =>
  useAuthStore((state) => state.isAuthenticated);

export const useAuthActions = () =>
  useAuthStore(
    useShallow((state) => ({
      login: state.login,
      logout: state.logout,
      clearAuthError: state.clearAuthError,
    }))
  );

export const useAuthError = (): string | null =>
  useAuthStore((state) => state.authError);

export const useCurrentUserId = () =>
  useAuthStore((state) => state.currentUserId);

export const useCurrentUser = () => {
  const currentUserId = useCurrentUserId();
  return useUserStore((state) =>
    currentUserId ? state.users.find((user) => user.id === currentUserId) : undefined,
  );
};

export const useCurrentUserRole = (): UserRole | null => {
  const user = useCurrentUser();
  return user?.role ?? null;
};