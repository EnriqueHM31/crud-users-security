import { FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";

interface NavbarProps {
    title: string;
    onLogout: () => void;
}

export function Navbar({ title, onLogout }: NavbarProps) {
    return (
        <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950/70 px-5 py-4 backdrop-blur-sm">
            <motion.h1 className="text-2xl font-semibold" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
                {title}
            </motion.h1>
            <motion.button
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                whileHover={{ scale: 0.9 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 font-semibold text-slate-100 hover:border-blue-500"
                onClick={onLogout}
            >
                <FiLogOut />
                <span>Salir</span>
            </motion.button>
        </header>
    );
}
