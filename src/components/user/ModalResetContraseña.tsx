import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ModalEmail from "../login/ModalEmail";
import ModalReset from "../login/ModalReset";
import ModalVerificar from "../login/ModalVerificar";
import { usePasswordActions } from "../../hooks/usePassword";
import { usePasswordStore } from "../../store/password.store";

type Step = "email" | "verify" | "reset";

interface ForgotPasswordModalProps {
    open: boolean;
    close: () => void;
}

export function ModalResetContraseña({ open, close }: ForgotPasswordModalProps) {
    const [step, setStep] = useState<Step>("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [secondsLeft, setSecondsLeft] = useState(300);
    const [changePassword, setChangePassword] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const { requestResetEmail, verifyOtp, resetPasswordLogin } = usePasswordActions();
    const { isLoading } = usePasswordStore();

    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const resetFlow = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setStep("email");
        setOtp(Array(6).fill(""));
        setEmail("");
        setChangePassword({ newPassword: "", confirmPassword: "" });
        setSecondsLeft(300);
    };

    // ---------- TIMER CONTROL ----------
    useEffect(() => {
        if (step !== "verify") return;

        timerRef.current = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    toast.error("El código ha expirado.");

                    // Solo cambia el paso aquí
                    setStep("email");
                    setOtp(Array(6).fill(""));
                    return 300; // 60 segundos
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [step]);

    const handleClose = () => {
        resetFlow();
        close();
    };

    // ---------- STEP 1 ----------
    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Ingresa tu correo electrónico.");
            return;
        }

        try {
            const isSent = await requestResetEmail(email);

            if (isSent) {
                setStep("verify");
            }
        } catch (error) {
            console.log(error);
            toast.error("No se pudo enviar el código.");
        }
    };

    // ---------- STEP 2 ----------
    const handleOtpChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleValidateCode = async () => {
        const code = otp.join("");

        if (code.length !== 6) {
            toast.error("Ingresa el código completo.");
            return;
        }

        if (secondsLeft <= 0) {
            toast.error("El código expiró.");
            return;
        }

        try {
            const isValid = await verifyOtp(email, code);

            if (isValid) {
                setStep("reset");
            }
        } catch {
            toast.error("Código inválido.");
        }
    };

    // ---------- STEP 3 ----------
    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!changePassword.newPassword || !changePassword.confirmPassword) {
            toast.error("Todos los campos son obligatorios.");
            return;
        }

        if (changePassword.newPassword !== changePassword.confirmPassword) {
            toast.error("Las contraseñas no coinciden.");
            return;
        }

        try {
            const isReset = await resetPasswordLogin(email, changePassword.newPassword);

            if (isReset) {
                toast.success("Contraseña actualizada correctamente.");
                handleClose();
            }
        } catch {
            toast.error("No se pudo actualizar la contraseña.");
        }
    };

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setChangePassword({ ...changePassword, [name]: value });
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="forgot-password-modal"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                >
                    <motion.div
                        className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl"
                        initial={{ scale: 0.95, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 40 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {step === "email" && (
                            <ModalEmail email={email} handleChangeEmail={handleChangeEmail} handleSendCode={handleSendCode} isLoading={isLoading} />
                        )}

                        {step === "verify" && (
                            <ModalVerificar
                                otp={otp}
                                isLoading={isLoading}
                                handleOtpChange={handleOtpChange}
                                handleValidateCode={handleValidateCode}
                                secondsLeft={secondsLeft}
                                inputsRef={inputsRef}
                            />
                        )}

                        {step === "reset" && (
                            <ModalReset
                                changePassword={changePassword}
                                handleChangePassword={handleChangePassword}
                                handleSubmit={handleResetPassword}
                                isLoading={isLoading}
                            />
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
