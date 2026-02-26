import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ModalEmail from "../login/ModalEmail";
import ModalReset from "../login/ModalReset";
import ModalVerificar from "../login/ModalVerificar";
import { usePasswordActions } from "../../hooks/usePasswordStore";
import { usePasswordStore } from "../../store/password.store";
import { esEmailValido } from "../../utils/conversiones";
import { RESET_STORAGE_KEY } from "../../constants";
import { getInitialResetState } from "../../features/password.feature";

type Step = "email" | "verify" | "reset";

interface ForgotPasswordModalProps {
    open: boolean;
    close: () => void;
}

export function ModalResetContraseña({ open, close }: ForgotPasswordModalProps) {
    const initial = getInitialResetState();

    const [step, setStep] = useState<Step>(initial.step);
    const [email, setEmail] = useState(initial.email);
    const [secondsLeft, setSecondsLeft] = useState(initial.secondsLeft);
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [changePassword, setChangePassword] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const { requestResetEmail, verifyOtp, resetPasswordLogin } = usePasswordActions();
    const { isLoading } = usePasswordStore();

    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    /* ===============================
       PERSISTIR ESTADO
    ================================ */
    useEffect(() => {
        if (!open) return;

        const data = {
            isActive: true,
            step,
            email,
            secondsLeft,
        };

        localStorage.setItem(RESET_STORAGE_KEY, JSON.stringify(data));
    }, [open, step, email, secondsLeft]);

    /* ===============================
    TIMER
    ================================ */

    useEffect(() => {
        if (step !== "verify") return;

        timerRef.current = setInterval(() => {
            setSecondsLeft((prev: number) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    toast.error("El código ha expirado.");
                    setStep("email");
                    return 300;
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

    /* ===============================
       RESET COMPLETO
    ================================ */

    const resetFlow = () => {
        if (timerRef.current) clearInterval(timerRef.current);

        setStep("email");
        setEmail("");
        setOtp(Array(6).fill(""));
        setChangePassword({ newPassword: "", confirmPassword: "" });
        setSecondsLeft(300);

        localStorage.removeItem(RESET_STORAGE_KEY);
    };

    const handleClose = () => {
        resetFlow();
        close();
    };

    /* ===============================
       STEP 1 - ENVIAR EMAIL
    ================================ */

    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Ingresa tu correo electrónico.");
            return;
        }

        if (!esEmailValido(email)) {
            toast.error("El correo electrónico no es válido.");
            return;
        }

        const isSent = await requestResetEmail(email);
        if (isSent) setStep("verify");
    };

    /* ===============================
       STEP 2 - VALIDAR OTP
    ================================ */

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

        const isValid = await verifyOtp(email, code);
        if (isValid) setStep("reset");
    };

    /* ===============================
       STEP 3 - RESET PASSWORD
    ================================ */

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

        const isReset = await resetPasswordLogin(email, changePassword.newPassword);

        if (isReset) {
            toast.success("Contraseña actualizada correctamente.");
            resetFlow();
            close();
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
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
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
                            <ModalEmail
                                email={email}
                                handleChangeEmail={handleChangeEmail}
                                handleSendCode={handleSendCode}
                                isLoading={isLoading}
                                close={handleClose}
                            />
                        )}

                        {step === "verify" && (
                            <ModalVerificar
                                otp={otp}
                                isLoading={isLoading}
                                handleOtpChange={handleOtpChange}
                                handleValidateCode={handleValidateCode}
                                secondsLeft={secondsLeft}
                                inputsRef={inputsRef}
                                close={handleClose}
                            />
                        )}

                        {step === "reset" && (
                            <ModalReset
                                changePassword={changePassword}
                                handleChangePassword={handleChangePassword}
                                handleSubmit={handleResetPassword}
                                isLoading={isLoading}
                                close={close}
                            />
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
