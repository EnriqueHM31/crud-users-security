import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { useAuthenticatedUser } from "../hooks/useUsers";

export function Landing() {
  const user = useAuthenticatedUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AppLayout title="Landing">
      <motion.section
        className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="mb-2 text-xl font-semibold">Ruta protegida para usuarios</h2>
        <p className="mb-4 text-slate-400">
          Esta ruta solo permite acceso a cuentas con rol de usuario.
        </p>
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
          <div>
            <span className="text-sm text-slate-400">Rol</span>
            <p className="mt-1 capitalize">{user.role}</p>
          </div>
        </div>
      </motion.section>
    </AppLayout>
  );
}
