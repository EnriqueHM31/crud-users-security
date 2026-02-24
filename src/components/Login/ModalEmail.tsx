import { motion } from "framer-motion";

export interface ModalEmailProps {
    email: string;
    handleChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSendCode: (e: React.FormEvent) => void;
    isLoading: boolean;
}

export default function ModalEmail({ email, handleChangeEmail, handleSendCode, isLoading }: ModalEmailProps) {
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

                <motion.button
                    initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                    animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                    whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                    type="submit"
                    disabled={isLoading}
                    className="cursor-pointer rounded-lg bg-blue-800 py-2 font-semibold text-white hover:bg-blue-900"
                >
                    {isLoading ? "Enviando..." : "Enviar código"}
                </motion.button>
            </form>
        </>
    );
}
