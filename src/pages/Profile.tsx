import { motion } from "framer-motion";
import { AppLayout } from "../components/layout/AppLayout";
import { useAuthenticatedUser } from "../hooks/useUsers";
import { Navigate } from "react-router-dom";

export function Profile() {
  const user = useAuthenticatedUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <AppLayout title="Profile">
      <motion.section
        className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="mb-3 text-xl font-semibold">Administrador</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="text-sm text-slate-400">Username</span>
            <p className="mt-1">{user.username}</p>
          </div>
          <div>
            <span className="text-sm text-slate-400">Nombre</span>
            <p className="mt-1">{user.name}</p>
          </div>
          <div>
            <span className="text-sm text-slate-400">Correo electrónico</span>
            <p className="mt-1">{user.email}</p>
          </div>
        </div>
      </motion.section>
    </AppLayout>
  );
}
