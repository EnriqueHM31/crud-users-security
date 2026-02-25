import type { UUID } from "./user.types";

export interface PasswordState {
    isLoading: boolean;
    error: string | null;
    successMessage: string | null;

    editPasswordUser: (id_usuario: UUID, password: string) => Promise<void>;
    changePassword: (currentPassword: string, newPassword: string, id_usuario: UUID) => Promise<boolean>;
    requestResetEmail: (email: string) => Promise<boolean>;
    verifyOtp: (email: string, otp: string) => Promise<boolean>;
    resetPasswordLogin: (email: string, contrasena: string) => Promise<boolean>;
}
