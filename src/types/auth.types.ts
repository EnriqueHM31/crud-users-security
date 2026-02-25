import type { User } from "./user.types";

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    userAuthenticated: User | null;
    isLoading: boolean;
    error: string | null;
    successMessage: string | null;
}

export interface AuthActions {
    login: (credentials: LoginCredentials) => Promise<boolean>;
    logout: () => Promise<void>;
    checkSession: () => Promise<boolean>;
}

export type AuthStore = AuthState & AuthActions;

/* -----------------------------------------------------*/

export interface FormularioLogin {
    username: string;
    password: string;
}
