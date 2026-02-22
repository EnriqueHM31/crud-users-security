import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DeleteUserDialog } from "../components/dashboard/DeleteUserDialog";
import { UserTable } from "../components/dashboard/UserTable";
import { AppLayout } from "../components/layout/AppLayout";
import { useUserActions, useUsers } from "../hooks/useUsers";
import type { CreateUserInput, User } from "../types/user.types";

export default function Dashboard() {
    const users = useUsers();
    const { fetchUsers, createUser, updateUser, deleteUser } = useUserActions();
    const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
    const [deletingUser, setDeletingUser] = useState<User | null>(null);

    useEffect(() => {
        void fetchUsers();
    }, [fetchUsers]);

    const handleCreateUser = async (payload: CreateUserInput): Promise<boolean> => {
        const createdUser = await createUser(payload);
        return Boolean(createdUser);
    };

    const handleEditSave = async (payload: CreateUserInput): Promise<boolean> => {
        if (!editingUser) return false;
        const updatedUser = await updateUser({ id: editingUser.id, ...payload });
        if (!updatedUser) {
            return false;
        }
        setEditingUser(undefined);
        return true;
    };

    const handleDeleteConfirm = async (userId: User["id"]): Promise<void> => {
        const deleted = await deleteUser(userId);
        if (!deleted) {
            return;
        }
        setDeletingUser(null);
        if (editingUser?.id === userId) {
            setEditingUser(undefined);
        }
    };

    return (
        <AppLayout title="Dashboard">
            <motion.div className="grid gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <UserTable
                    users={users}
                    onEdit={setEditingUser}
                    onDelete={setDeletingUser}
                    editingUser={editingUser}
                    onCloseEdit={() => setEditingUser(undefined)}
                    handleCreateUser={handleCreateUser}
                    handleEditSave={handleEditSave}
                />
            </motion.div>

            <DeleteUserDialog user={deletingUser} onCancel={() => setDeletingUser(null)} onConfirm={handleDeleteConfirm} />
        </AppLayout>
    );
}
