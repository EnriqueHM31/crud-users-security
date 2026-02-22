import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { FaLock } from "react-icons/fa";
import { useAuthenticatedUser } from "../../hooks/useUsers";

type Step = "request" | "verify" | "reset";

interface ForgotPasswordModalProps {
    open: boolean;
    close: () => void;
}

export function ModalResetContraseña({ open, close }: ForgotPasswordModalProps) {
    const user = useAuthenticatedUser();
    const [step, setStep] = useState<Step>("request");
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    if (!user) return null;

    const handleSendCode = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user.email.trim()) {
            setError("Debes ingresar tu correo.");
            return;
        }

        setError("");
        setStep("verify");
    };

    const handleCloseRequest = () => {
        setStep("request");
        setOtp(Array(6).fill(""));
        setPassword("");
        setConfirmPassword("");
        setError("");
        close();
    };

    const handleOtpChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleValidateCode = () => {
        const code = otp.join("");

        if (code.length !== 6) {
            setError("Ingresa el código completo.");
            return;
        }

        setError("");
        setStep("reset");
    };

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setError("");
        close();
    };

    const resetState = () => {
        setStep("request");
        setOtp(Array(6).fill(""));
        setPassword("");
        setConfirmPassword("");
        setError("");
        close();
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={resetState}
                >
                    <motion.div
                        className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl"
                        initial={{ scale: 0.95, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 40 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {step === "request" && (
                            <>
                                <h2 className="text-2xl font-bold text-slate-100">Recuperar contraseña</h2>

                                <p className="mt-2 mb-5 text-base text-slate-400">
                                    Se enviará un código de verificación al correo vinculado a tu cuenta
                                    <b> {user.email.slice(0, 4)}*************.</b>
                                </p>

                                <form className="grid gap-4" onSubmit={handleSendCode}>
                                    {error && <p className="text-sm text-rose-400">{error}</p>}

                                    <div className="flex gap-3 pt-2">
                                        <motion.button
                                            initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                            animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                            whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                            whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                                            type="submit"
                                            className="flex-1 cursor-pointer rounded-lg bg-blue-800 py-2 font-semibold text-white hover:bg-blue-900"
                                        >
                                            Enviar código
                                        </motion.button>

                                        <motion.button
                                            initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                            animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                            whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                            whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                                            type="button"
                                            onClick={close}
                                            className="flex-1 cursor-pointer rounded-lg bg-slate-700 py-2 font-semibold text-slate-300 hover:bg-slate-600"
                                        >
                                            Cancelar
                                        </motion.button>
                                    </div>
                                </form>
                            </>
                        )}

                        {step === "verify" && (
                            <>
                                <h2 className="text-2xl font-bold text-slate-100">Verificación</h2>

                                <p className="mt-2 mb-5 text-sm text-slate-400">Ingresa el código de 6 dígitos enviado a tu correo.</p>

                                <div className="mb-4 flex justify-between gap-2">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => {
                                                inputsRef.current[index] = el;
                                            }}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(e.target.value, index)}
                                            className="h-12 w-12 rounded-lg border border-slate-800 bg-slate-900 text-center text-lg text-white outline-none focus:border-blue-500"
                                        />
                                    ))}
                                </div>

                                {error && <p className="text-sm text-rose-400">{error}</p>}

                                <div className="flex gap-3 pt-2">
                                    <motion.button
                                        initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                        animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                        whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                                        type="submit"
                                        onClick={handleValidateCode}
                                        className="flex-1 rounded-lg bg-blue-800 py-2 font-semibold text-white hover:bg-blue-900"
                                    >
                                        Validar código
                                    </motion.button>
                                    <motion.button
                                        initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                        animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                        whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                                        type="button"
                                        onClick={handleCloseRequest}
                                        className="flex-1 cursor-pointer rounded-lg bg-slate-700 py-2 font-semibold text-slate-300 hover:bg-slate-600"
                                    >
                                        Cancelar
                                    </motion.button>
                                </div>
                            </>
                        )}

                        {step === "reset" && (
                            <>
                                <h2 className="text-2xl font-bold text-slate-100">Nueva contraseña</h2>

                                <p className="mt-2 mb-5 text-sm text-slate-400">Ingresa y confirma tu nueva contraseña.</p>

                                <form className="grid gap-4" onSubmit={handleResetPassword}>
                                    <div className="relative">
                                        <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                        <input
                                            type="password"
                                            placeholder="Nueva contraseña"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-3 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="relative">
                                        <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                        <input
                                            type="password"
                                            placeholder="Confirmar nueva contraseña"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2.5 pr-3 pl-10 text-sm text-slate-100 outline-none focus:border-blue-500"
                                        />
                                    </div>

                                    {error && <p className="text-sm text-rose-400">{error}</p>}

                                    <div className="flex gap-3 pt-2">
                                        <motion.button
                                            initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                            animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                            whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                            whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                                            type="submit"
                                            className="flex-1 rounded-lg bg-blue-800 py-2 font-semibold text-white hover:bg-blue-900"
                                        >
                                            Actualizar contraseña
                                        </motion.button>

                                        <motion.button
                                            initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                                            animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                            whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                                            whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                                            type="button"
                                            onClick={handleCloseRequest}
                                            className="flex-1 cursor-pointer rounded-lg bg-slate-700 py-2 font-semibold text-slate-300 hover:bg-slate-600"
                                        >
                                            Cancelar
                                        </motion.button>
                                    </div>
                                </form>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
