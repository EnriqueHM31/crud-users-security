import { motion } from "framer-motion";

export interface ModalEmailProps {
    email: string;
    handleChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSendCode: (e: React.FormEvent) => void;
    isLoading: boolean;
    close: () => void;
}

export default function ModalEmail({ email, handleChangeEmail, handleSendCode, isLoading, close }: ModalEmailProps) {
    return (
        <>
            <h2 className="text-2xl font-bold text-slate-100">Recuperar contraseña</h2>
            <p className="mt-2 mb-5 text-sm text-slate-400">Ingresa tu correo electrónico para recibir un código de verificación.</p>

            <form onSubmit={handleSendCode} className="grid gap-4">
                <input
                    id="email"
                    name="email"
                    autoComplete="email"
                    disabled={isLoading}
                    type="email"
                    value={email}
                    onChange={handleChangeEmail}
                    placeholder="Correo electrónico"
                    className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                />

                <div className="flex gap-3">
                    <motion.button
                        initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                        animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                        whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 cursor-pointer rounded-lg bg-blue-800 py-2 font-semibold text-white hover:bg-blue-900"
                    >
                        {isLoading ? "Enviando..." : "Enviar código"}
                    </motion.button>

                    <motion.button
                        initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                        animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                        whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                        type="button"
                        onClick={close}
                        className="flex-1 cursor-pointer rounded-lg border border-slate-700 py-2 font-semibold text-slate-300 hover:border-slate-500"
                    >
                        Cancelar
                    </motion.button>
                </div>
            </form>
        </>
    );
}
