import { AnimatePresence, motion } from "framer-motion";
import type { User } from "../../types/user.types";

interface DeleteUserDialogProps {
  user: User | null;
  onCancel: () => void;
  onConfirm: (userId: User["id"]) => void;
}

export function DeleteUserDialog({ user, onCancel, onConfirm }: DeleteUserDialogProps) {
  return (
    <AnimatePresence>
      {user ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-950 p-4 text-slate-50 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <h3 className="mb-3 text-lg font-semibold">Confirm deletion</h3>
            <p className="text-slate-300">
              Are you sure you want to delete user <strong>{user.username}</strong>?
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-blue-500"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg border border-red-900 bg-red-900/30 px-4 py-2 font-semibold text-red-100 transition hover:-translate-y-0.5 hover:border-red-500"
                onClick={() => onConfirm(user.id)}
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
