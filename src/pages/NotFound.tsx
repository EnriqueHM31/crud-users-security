import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_right,#12203a,#06080f_45%)] text-slate-50">
            <motion.div
                className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-950 p-10 text-center shadow-2xl"
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <motion.h1 className="text-7xl font-extrabold text-blue-500" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    404
                </motion.h1>

                <h2 className="mt-4 text-2xl font-semibold text-slate-100">Página no encontrada</h2>

                <p className="mt-3 text-sm text-slate-400">La ruta que intentas acceder no existe o fue movida. Verifica la URL o regresa al inicio.</p>

                <motion.button
                    initial={{ scale: 0.95, y: 8 }}
                    animate={{ scale: 1, y: 0 }}
                    whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                    type="button"
                    onClick={() => navigate("/login")}
                    className="mt-6 cursor-pointer rounded-lg bg-blue-800 px-6 py-2 font-semibold text-white hover:bg-blue-900"
                    whileHover={{ scale: 0.9 }}
                >
                    Volver al inicio
                </motion.button>
            </motion.div>
        </div>
    );
}
