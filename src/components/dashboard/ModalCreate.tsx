import { AnimatePresence, motion } from "framer-motion";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { FaEnvelope, FaIdBadge, FaLock, FaUser, FaUserShield } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { LuShuffle } from "react-icons/lu";
import { toast } from "sonner";
import { useOpen } from "../../hooks/useOpen";
import type { UserCreate } from "../../types/user.types";
import { generarContraseñaSegura } from "../../utils/conversiones";
import InputTelefono from "./InputTelefono";
import { useUserActions } from "../../hooks/useUsersStore";

interface UserModalProps {
    open: boolean;
    close: () => void;
}

const emptyFormUser: UserCreate = {
    nombre_usuario: "",
    nombre_completo: "",
    correo_electronico: "",
    telefono: "",
    contrasena: "",
    rol: "user",
};

export function ModalCreate({ open, close }: UserModalProps) {
    const [FormUser, setFormUser] = useState<UserCreate>(emptyFormUser);

    const { createUser } = useUserActions();
    const openPassword = useOpen();

    const handleFieldChange = (field: keyof UserCreate) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormUser((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!FormUser.nombre_usuario.trim() || !FormUser.nombre_completo.trim() || !FormUser.correo_electronico.trim() || !FormUser.contrasena.trim()) {
            toast.error("Todos los campos son obligatorios.");
            return;
        }

        const ok = await createUser(FormUser);

        if (ok) {
            setFormUser(emptyFormUser);
            close();
        }
    };

    const handleCloseCreateUser = () => {
        setFormUser(emptyFormUser);
        close();
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-end bg-black/10 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => handleCloseCreateUser()}
                >
                    <motion.div
                        className="flex h-screen w-full max-w-md flex-col rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl"
                        initial={{ scale: 0.95, opacity: 0, x: 40 }}
                        animate={{ scale: 1, opacity: 1, x: 0 }}
                        exit={{ scale: 0.95, opacity: 0, x: 40 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <header>
                            <div className="flex items-center gap-2">
                                <img src="/logo.png" alt="logo" className="h-10 w-10 rounded-full" />
                                <h2 className="text-2xl font-bold text-slate-100">Sistema de seguridad</h2>
                            </div>
                            <h3 className="mt-2 text-lg font-semibold text-blue-400">Crear usuario</h3>

                            <p className="mt-1 mb-5 text-sm text-slate-400">Registra un nuevo usuario dentro del sistema.</p>
                        </header>

                        <form className="flex flex-1 flex-col gap-5" onSubmit={handleSubmit}>
                            <div className="relative">
                                <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    id="username"
                                    autoComplete="username"
                                    placeholder="Username"
                                    value={FormUser.nombre_usuario}
                                    onChange={handleFieldChange("nombre_usuario")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-3 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="relative">
                                <FaIdBadge className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Nombre completo"
                                    id="name"
                                    autoComplete="name"
                                    value={FormUser.nombre_completo}
                                    onChange={handleFieldChange("nombre_completo")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-3 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="relative">
                                <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="email"
                                    placeholder="Correo electrónico"
                                    id="email"
                                    autoComplete="email"
                                    value={FormUser.correo_electronico}
                                    onChange={handleFieldChange("correo_electronico")}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-3 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />
                            </div>

                            <InputTelefono
                                placeholder="Telefono"
                                id="telefono"
                                autoComplete="tel"
                                value={FormUser.telefono}
                                onChange={handleFieldChange("telefono")}
                                className="w-full rounded-lg border border-slate-800 bg-slate-900 text-sm text-slate-100 outline-none focus:border-blue-500"
                            />

                            <div className="relative">
                                <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />

                                <input
                                    type={openPassword.isOpen ? "text" : "password"}
                                    placeholder="Contraseña"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleFieldChange("contrasena")}
                                    value={FormUser.contrasena}
                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-20 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                />

                                {/* Botón generar contraseña */}
                                <motion.button
                                    type="button"
                                    initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                    animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                    whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                    whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                                    onClick={() =>
                                        handleFieldChange("contrasena")({
                                            target: { value: generarContraseñaSegura(18) },
                                        } as ChangeEvent<HTMLInputElement>)
                                    }
                                    className="absolute top-1/2 right-10 -translate-y-1/2 cursor-pointer text-blue-400 hover:text-blue-300"
                                    title="Generar contraseña segura"
                                >
                                    <LuShuffle />
                                </motion.button>

                                {/* Botón mostrar/ocultar */}
                                <motion.button
                                    type="button"
                                    title={openPassword.isOpen ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                    animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                    whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                    whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                                    onClick={() => openPassword.toggle()}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-200"
                                >
                                    {openPassword.isOpen ? <IoEye /> : <IoEyeOff />}
                                </motion.button>
                            </div>
                            <div className="w-full rounded-lg border border-slate-800 bg-slate-900">
                                <div className="relative pl-10">
                                    <FaUserShield className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                    <select
                                        value={FormUser.rol}
                                        id="role"
                                        autoComplete="role"
                                        onChange={handleFieldChange("rol")}
                                        className="w-full cursor-pointer rounded-lg bg-slate-900 py-2.5 pr-3 pl-0 text-sm text-slate-100 outline-none focus:border-blue-500"
                                    >
                                        <option value="admin" className="">
                                            Admin
                                        </option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-1 items-end justify-end gap-3 pt-2">
                                <motion.button
                                    initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                    animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                    whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                    whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                                    type="submit"
                                    className="h-fit flex-1 cursor-pointer rounded-lg bg-blue-800 py-2 font-semibold text-white hover:bg-blue-900"
                                >
                                    Crear usuario
                                </motion.button>

                                <motion.button
                                    initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                    animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                    whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                    whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                                    type="button"
                                    onClick={() => handleCloseCreateUser()}
                                    className="h-fit flex-1 cursor-pointer rounded-lg border border-slate-700 py-2 font-semibold text-slate-300 hover:border-slate-500"
                                >
                                    Cancelar
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
