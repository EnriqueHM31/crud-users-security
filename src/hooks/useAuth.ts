import { useAuthStore } from "../store/auth.store";
import { useShallow } from "zustand/react/shallow";

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