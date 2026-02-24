import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "../store/auth.store";
import { usePasswordStore } from "../store/password.store";

export const usePasswordActions = () =>
    usePasswordStore(
        useShallow((state) => ({
            editPasswordUser: state.editPasswordUser,
            changePassword: state.changePassword,
        }))
    );

export const usePasswordLoading = (): boolean => usePasswordStore((state) => state.isLoading);

export const useCurrentUserId = () => useAuthStore((state) => state.userAuthenticated?.id_usuario);
