import { motion } from "framer-motion";
import { AppLayout } from "../components/layout/AppLayout";
import { useAuthenticatedUser } from "../hooks/useUsers";
import { Navigate } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { ModalContraseña } from "../components/UserPage/ModalContraseña";
import { useOpen } from "../hooks/useOpen";

export default function Profile() {
    const user = useAuthenticatedUser();
    const openContraseña = useOpen();

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
                <h2 className="mb-3 text-xl font-semibold">{user.role === "admin" ? "Perfil de administrador" : "Perfil de usuario"}</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    <div>
                        <span className="text-sm text-slate-400">Username</span>
                        <p className="mt-1">{user.username}</p>
                    </div>
                    <div>
                        <span className="text-sm text-slate-400">Nombre</span>
                        <p className="mt-1">{user.name}</p>
                    </div>
                    <div className="f">
                        <span className="text-sm text-slate-400">Correo electrónico</span>
                        <p className="mt-1">{user.email.slice(0, 4)}*************</p>
                    </div>

                    <div>
                        <span className="text-sm text-slate-400">Contraseña</span>
                        <p className="mt-1">********</p>
                    </div>

                    <div>
                        <motion.button
                            initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                            animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                            whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                            type="button"
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-100 hover:border-blue-500"
                            onClick={() => openContraseña.open()}
                        >
                            <FiLock />
                            Cambiar contraseña
                        </motion.button>
                    </div>
                </div>
            </motion.section>

            <ModalContraseña open={openContraseña.isOpen} close={openContraseña.close} onSubmit={openContraseña.open} />
        </AppLayout>
    );
}
