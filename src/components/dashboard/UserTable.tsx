import { motion } from "framer-motion";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import type { CreateUserInput, User } from "../../types/user.types";
import { UserModal } from "./UserForm";
import { useState } from "react";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  handleCreateUser: (payload: CreateUserInput) => void;
}

export function UserTable({ users, onEdit, onDelete, handleCreateUser }: UserTableProps) {
  const [open, setOpen] = useState(false);
  return (

    <>


      <UserModal
        open={open}
        setOpen={setOpen}
        mode="create"
        onSubmit={handleCreateUser}
      />
      <motion.section
        className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 shadow-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <header className="flex justify-between items-center">

          <h2 className="mb-3 text-3xl font-semibold">Tabla de usuarios</h2>
          <motion.button
            initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
            animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
            whileHover={{ scale: .90, transition: { duration: 0.2 } }}
            type="button"
            className="flex items-center justify-center rounded-lg border border-blue-800 bg-blue-800 px-4 py-1.5 font-semibold text-slate-50  hover:border-blue-900 hover:bg-blue-900 cursor-pointer gap-2"
            onClick={() => setOpen(true)}
          >
            <FiPlus className="text-2xl font-bold" />
            <span>Crear usuario</span>
          </motion.button>
        </header>
        <div className="w-full overflow-x-auto scrollbar-hide">
          <table className="w-full border-collapse scrollbar-hide">
            <thead>
              <tr>
                <th className="border-b border-slate-800 px-3 py-3 text-left text-sm font-medium text-slate-400">Usuario</th>
                <th className="border-b border-slate-800 px-3 py-3 text-left text-sm font-medium text-slate-400">Nombre </th>
                <th className="border-b border-slate-800 px-3 py-3 text-left text-sm font-medium text-slate-400">Correo electrónico</th>
                <th className="border-b border-slate-800 px-3 py-3 text-left text-sm font-medium text-slate-400">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border-b border-slate-800 px-3 py-3 text-sm">{user.username}</td>
                  <td className="border-b border-slate-800 px-3 py-3 text-sm">{user.name}</td>
                  <td className="border-b border-slate-800 px-3 py-3 text-sm">{user.email}</td>
                  <td className="border-b border-slate-800 px-3 py-3">
                    <div className="flex gap-2">
                      <motion.button
                        type="button"
                        initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                        animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                        whileHover={{ scale: .90, transition: { duration: 0.2 } }}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-100  hover:border-blue-500 cursor-pointer"
                        onClick={() => onEdit(user)}
                      >
                        <FiEdit2 />
                        <span>Editar</span>
                      </motion.button>
                      <motion.button
                        type="button"
                        initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                        animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                        whileHover={{ scale: .90, transition: { duration: 0.2 } }}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-900 bg-red-900/30 px-3 py-2 text-sm font-semibold text-red-100  hover:border-red-500 cursor-pointer"
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
