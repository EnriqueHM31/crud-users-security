import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "../store/auth.store";
import { useUserStore } from "../store/user.store";
import type { User } from "../types/user.types";

export const useUsers = (): User[] => useUserStore((state) => state.users);

export const useUserActions = () =>
    useUserStore(
        useShallow((state) => ({
            fetchUsers: state.fetchUsers,
            createUser: state.createUser,
            updateUser: state.updateUser,
            deleteUser: state.deleteUser,
            editPasswordUser: state.editPassowrdUser,
        }))
    );

export const useUsersLoading = (): boolean => useUserStore((state) => state.isLoading);

export const useAuthenticatedUser = (): User | null => useAuthStore((state) => state.userAuthenticated ?? null);
