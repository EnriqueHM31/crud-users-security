import { motion } from "framer-motion";
import { useState } from "react";
import { DeleteUserDialog } from "../components/dashboard/DeleteUserDialog";
import { UserTable } from "../components/dashboard/UserTable";
import { AppLayout } from "../components/layout/AppLayout";
import { useUserActions, useUsers } from "../hooks/useUsers";
import type { CreateUserInput, User } from "../types/user.types";

export default function Dashboard() {
    const users = useUsers();
    const { createUser, updateUser, deleteUser } = useUserActions();
    const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
    const [deletingUser, setDeletingUser] = useState<User | null>(null);

    const handleCreateUser = (payload: CreateUserInput): void => {
        createUser(payload);
    };

    const handleEditSave = (payload: CreateUserInput): void => {
        if (!editingUser) return;
        updateUser({ id: editingUser.id, ...payload });
        setEditingUser(undefined);
    };

    const handleDeleteConfirm = (userId: User["id"]): void => {
        deleteUser(userId);
        setDeletingUser(null);
        if (editingUser?.id === userId) {
            setEditingUser(undefined);
        }
    };

    return (
        <AppLayout title="Dashboard">
            <motion.div className="grid gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <UserTable users={users} onEdit={setEditingUser} onDelete={setDeletingUser} handleCreateUser={handleCreateUser} handleEditSave={handleEditSave} />
            </motion.div>

            <DeleteUserDialog user={deletingUser} onCancel={() => setDeletingUser(null)} onConfirm={handleDeleteConfirm} />
        </AppLayout>
    );
}
