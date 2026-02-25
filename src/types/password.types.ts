export interface PasswordState {
    isLoading: boolean;
    error: string | null;
    successMessage: string | null;

    editPasswordUser: (id_usuario: string, password: string) => Promise<void>;
    changePassword: (currentPassword: string, newPassword: string, id_usuario: string) => Promise<boolean>;
    requestResetEmail: (email: string) => Promise<boolean>;
    verifyOtp: (email: string, otp: string) => Promise<boolean>;
    resetPasswordLogin: (email: string, contrasena: string) => Promise<boolean>;
}
