import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROLES, RUTAS } from "../config/routes";
import type { User, userUpdateId } from "../types/user.types";
import { useAuthenticatedUser, useUserActions, useUsers } from "./useUsersStore";

export function useDashboardPage() {
    const users = useUsers();
    const user = useAuthenticatedUser();
    const navigate = useNavigate();
    const { fetchUsers } = useUserActions();
    const [editingUser, setEditingUser] = useState<userUpdateId | null>(null);
    const [deletingUser, setDeletingUser] = useState<User | null>(null);

    if (user && user.rol !== ROLES.ADMIN) {
        navigate(RUTAS.LOGIN);
    }
    useEffect(() => {
        void fetchUsers();
    }, [fetchUsers]);

    const handleEditingUser = (user: userUpdateId | null) => {
        setEditingUser(user);
    };

    const handleDeletingUser = (user: User | null) => {
        setDeletingUser(user);
    };

    const handleDeleteCancel = () => {
        setDeletingUser(null);
    };

    return {
        users,
        editingUser,
        deletingUser,
        handleEditingUser,
        handleDeletingUser,
        handleDeleteCancel,
    };
}
