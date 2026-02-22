import type { UUID } from "./user.types";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUserId: UUID | null;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

export interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
  clearMessages: () => void;
}

export type AuthStore = AuthState & AuthActions;
