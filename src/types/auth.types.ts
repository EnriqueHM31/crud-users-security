import type { UUID } from "./user.types";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUserId: UUID | null;
  authError: string | null;
}

export interface AuthActions {
  login: (credentials: LoginCredentials) => boolean;
  logout: () => void;
  clearAuthError: () => void;
}

export type AuthStore = AuthState & AuthActions;
