import { useNavigate } from "react-router-dom";
import { useAuthenticatedUser, useUserActions, useUsers } from "./useUsers";
import { useState } from "react";
import type { User, UserCreate, UserUpdate } from "../types/user.types";
import { useEffect } from "react";
import { ROLES, RUTAS } from "../config/routes";
import type { UUID } from "../types/user.types";

export function useDashboardPage() {
    const users = useUsers();
    const user = useAuthenticatedUser();
    const navigate = useNavigate();
    const { fetchUsers, createUser, updateUser, deleteUser } = useUserActions();
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [deletingUser, setDeletingUser] = useState<User | null>(null);

    if (user && user.rol !== ROLES.ADMIN) {
        navigate(RUTAS.LOGIN);
    }
    useEffect(() => {
        void fetchUsers();
    }, [fetchUsers]);

    const handleCreateUser = async (payload: UserCreate): Promise<void> => {
        await createUser(payload);
    };

    const handleEditSave = async (payload: UserUpdate): Promise<void> => {
        if (!editingUser) return;
        await updateUser(editingUser.id_usuario, payload);

        setEditingUser(null);
    };

    const handleDeleteConfirm = async (userId: UUID): Promise<void> => {
        await deleteUser(userId);
        setDeletingUser(null);
        setEditingUser(null);
    };

    const handleEditingUser = (user: User | null) => {
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
        createUser,
        updateUser,
        deleteUser,
        handleCreateUser,
        handleEditSave,
        handleDeleteConfirm,
        editingUser,
        deletingUser,
        handleEditingUser,
        handleDeletingUser,
        handleDeleteCancel,
    };
}
