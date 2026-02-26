import { motion } from "framer-motion";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { useOpen } from "../../hooks/useOpen";
import type { User } from "../../types/user.types";
import { formatearFechaMexico, formatearTelefonoE164 } from "../../utils/conversiones";
import { ModalCreate } from "./ModalCreate";
import { ModalEdit } from "./ModalEdit";

interface UserTableProps {
    users: User[];
    onEdit: (user: User | null) => void;
    onDelete: (user: User) => void;
    editingUser?: User | null;
}

export function UserTable({ users, onEdit, onDelete, editingUser }: UserTableProps) {
    const openModalCreate = useOpen();
    const openModalEdit = useOpen();

    const handleEditOpen = (user: User) => {
        openModalEdit.open();
        onEdit(user);
    };

    const handleCloseEdit = () => {
        openModalEdit.close();
        onEdit(null);
    };

    return (
        <>
            <ModalCreate open={openModalCreate.isOpen} close={openModalCreate.close} />

            {editingUser && (
                <ModalEdit
                    open={openModalEdit.isOpen}
                    close={handleCloseEdit}
                    selectedUser={{
                        id_usuario: editingUser.id_usuario,
                        nombre_usuario: editingUser.nombre_usuario,
                        telefono: editingUser.telefono,
                        nombre_completo: editingUser.nombre_completo,
                        correo_electronico: editingUser.correo_electronico,
                        rol: editingUser.rol,
                    }}
                />
            )}

            <motion.section
                className="h-full rounded-xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
            >
                <header className="flex items-center justify-between">
                    <h2 className="mb-3 text-3xl font-semibold">Tabla de usuarios</h2>
                    <motion.button
                        initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                        animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                        whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                        type="button"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-blue-800 bg-blue-800 px-4 py-1.5 font-semibold text-slate-50 hover:border-blue-900 hover:bg-blue-900"
                        onClick={() => openModalCreate.open()}
                    >
                        <FiPlus className="text-2xl font-bold" />
                        <span>Crear usuario</span>
                    </motion.button>
                </header>
                <div className="scrollbar-hide w-full overflow-x-auto">
                    <table className="scrollbar-hide w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b border-slate-800 px-3 py-3 text-left text-sm font-medium text-slate-400">Usuario</th>
                                <th className="border-b border-slate-800 px-3 py-3 text-left text-sm font-medium text-slate-400">Nombre </th>
                                <th className="border-b border-slate-800 px-3 py-3 text-left text-sm font-medium text-slate-400">Correo electrónico</th>
                                <th className="border-b border-slate-800 px-3 py-3 text-left text-sm font-medium text-slate-400">Telefono</th>
                                <th className="border-b border-slate-800 px-3 py-3 text-left text-sm font-medium text-slate-400">Rol</th>
                                <th className="border-b border-slate-800 px-3 py-3 text-left text-sm font-medium text-slate-400">Fecha de creación</th>
                                <th className="border-b border-slate-800 px-3 py-3 text-left text-sm font-medium text-slate-400">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id_usuario}>
                                    <td className="border-b border-slate-800 px-3 py-3 text-sm">{user.nombre_usuario}</td>
                                    <td className="border-b border-slate-800 px-3 py-3 text-sm">{user.nombre_completo}</td>
                                    <td className="border-b border-slate-800 px-3 py-3 text-sm">{user.correo_electronico}</td>
                                    <td className="border-b border-slate-800 px-3 py-3 text-sm">{formatearTelefonoE164(user.telefono)}</td>
                                    <td className="border-b border-slate-800 px-3 py-3 text-sm capitalize">{user.rol}</td>
                                    <td className="border-b border-slate-800 px-3 py-3 text-sm">{formatearFechaMexico(user.fecha_creacion)}</td>
                                    <td className="border-b border-slate-800 px-3 py-3">
                                        <div className="flex gap-2">
                                            <motion.button
                                                type="button"
                                                initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                                animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                                whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-100 hover:border-blue-500"
                                                onClick={() => handleEditOpen(user)}
                                            >
                                                <FiEdit2 />
                                                <span>Editar</span>
                                            </motion.button>
                                            <motion.button
                                                type="button"
                                                initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                                animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                                whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-900 bg-red-900/30 px-3 py-2 text-sm font-semibold text-red-100 hover:border-red-500"
                                                onClick={() => onDelete(user)}
                                            >
                                                <FiTrash2 />
                                                <span>Eliminar</span>
                                            </motion.button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.section>
        </>
    );
}
