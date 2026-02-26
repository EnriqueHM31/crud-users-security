import { motion } from "framer-motion";
import { DeleteUserDialog } from "../components/dashboard/DeleteUserDialog";
import { UserTable } from "../components/dashboard/UserTable";
import { AppLayout } from "../components/layout/AppLayout";
import { useDashboardPage } from "../hooks/useDashboardPage";

export default function Dashboard() {
    const { users, editingUser, deletingUser, handleEditingUser, handleDeletingUser, handleDeleteCancel } = useDashboardPage();

    return (
        <AppLayout title="Dashboard" descripcion="En este panel podrás administrar tus usuarios.">
            <motion.div className="grid h-full gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <UserTable users={users} onEdit={handleEditingUser} onDelete={handleDeletingUser} editingUser={editingUser} />
            </motion.div>

            <DeleteUserDialog user={deletingUser} onCancel={handleDeleteCancel} />
        </AppLayout>
    );
}
