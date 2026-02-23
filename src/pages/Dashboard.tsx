import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DeleteUserDialog } from "../components/dashboard/DeleteUserDialog";
import { UserTable } from "../components/dashboard/UserTable";
import { AppLayout } from "../components/layout/AppLayout";
import { useAuthenticatedUser, useUserActions, useUsers } from "../hooks/useUsers";
import type { User } from "../types/user.types";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const users = useUsers();
    const user = useAuthenticatedUser();
    const navigate = useNavigate();
    const { fetchUsers, createUser, updateUser, deleteUser } = useUserActions();
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [deletingUser, setDeletingUser] = useState<User | null>(null);

    if (user && user.role !== "admin") {
        navigate("/login");
    }
    useEffect(() => {
        void fetchUsers();
    }, [fetchUsers]);

    const handleCreateUser = async (payload: Omit<User, "id_usuario" | "fecha_creacion" | "fecha_actualizacion">): Promise<void> => {
        await createUser(payload);
    };

    const handleEditSave = async (payload: Omit<User, "id_usuario" | "fecha_creacion" | "fecha_actualizacion">): Promise<void> => {
        if (!editingUser) return;
        const updatedUser = await updateUser({ id: editingUser.id_usuario, ...payload });
        if (!updatedUser) {
            return;
        }
        setEditingUser(null);
    };

    const handleDeleteConfirm = async (userId: User["id_usuario"]): Promise<void> => {
        const deleted = await deleteUser(userId);
        if (!deleted) {
            return;
        }
        setDeletingUser(null);
        if (editingUser?.id_usuario === userId) {
            setEditingUser(null);
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
                    handleCreateUser={handleCreateUser}
                    handleEditSave={handleEditSave}
                />
            </motion.div>

            <DeleteUserDialog user={deletingUser} onCancel={() => setDeletingUser(null)} onConfirm={handleDeleteConfirm} />
        </AppLayout>
    );
}
