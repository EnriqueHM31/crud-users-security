import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ModalEmail from "../login/ModalEmail";
import ModalReset from "../login/ModalReset";
import ModalVerificar from "../login/ModalVerificar";
import { usePasswordActions } from "../../hooks/usePasswordStore";
import { usePasswordStore } from "../../store/password.store";
import { esEmailValido } from "../../utils/conversiones";
import { RESET_STORAGE_KEY, STEPS_RESET_PASSWORD_LOGIN } from "../../constants";
import { getInitialResetState } from "../../features/password.feature";

type Step = "email" | "verify" | "reset";

interface ForgotPasswordModalProps {
    open: boolean;
    close: () => void;
}

interface ResetState {
    step: Step;
    email: string;
    secondsLeft: number;
    otp: string[];
    changePassword: {
        newPassword: string;
        confirmPassword: string;
    };
}

export function ModalResetContraseña({ open, close }: ForgotPasswordModalProps) {
    const [state, setState] = useState<ResetState>(() => {
        const initial = getInitialResetState();

        return {
            step: initial.step,
            email: initial.email,
            secondsLeft: initial.secondsLeft,
            otp: Array(6).fill(""),
            changePassword: {
                newPassword: "",
                confirmPassword: "",
            },
        };
    });

    const { requestResetEmail, verifyOtp, resetPasswordLogin } = usePasswordActions();
    const { isLoading } = usePasswordStore();

    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    /* ===============================
       PERSISTENCIA
    ================================ */
    useEffect(() => {
        if (!open) return;

        const data = {
            isActive: true,
            step: state.step,
            email: state.email,
            secondsLeft: state.secondsLeft,
        };

        localStorage.setItem(RESET_STORAGE_KEY, JSON.stringify(data));
    }, [open, state.step, state.email, state.secondsLeft]);

    /* ===============================
       TIMER
    ================================ */
    useEffect(() => {
        if (state.step !== STEPS_RESET_PASSWORD_LOGIN.VERIFY) return;

        timerRef.current = setInterval(() => {
            setState((prev) => {
                if (prev.secondsLeft <= 1) {
                    clearInterval(timerRef.current!);
                    toast.error("El código ha expirado.");

                    return {
                        ...prev,
                        step: STEPS_RESET_PASSWORD_LOGIN.EMAIL as typeof prev.step,
                        secondsLeft: 300,
                    };
                }

                return {
                    ...prev,
                    secondsLeft: prev.secondsLeft - 1,
                };
            });
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [state.step]);

    /* ===============================
       RESET COMPLETO
    ================================ */
    const resetFlow = () => {
        if (timerRef.current) clearInterval(timerRef.current);

        setState({
            step: STEPS_RESET_PASSWORD_LOGIN.EMAIL as typeof state.step,
            email: "",
            secondsLeft: 300,
            otp: Array(6).fill(""),
            changePassword: {
                newPassword: "",
                confirmPassword: "",
            },
        });

        localStorage.removeItem(RESET_STORAGE_KEY);
    };

    const handleClose = () => {
        resetFlow();
        close();
    };

    /* ===============================
       STEP 1 - EMAIL
    ================================ */
    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!state.email.trim()) {
            toast.error("Ingresa tu correo electrónico.");
            return;
        }

        if (!esEmailValido(state.email)) {
            toast.error("El correo electrónico no es válido.");
            return;
        }

        const isSent = await requestResetEmail(state.email);

        if (isSent) {
            setState((prev) => ({
                ...prev,
                step: STEPS_RESET_PASSWORD_LOGIN.VERIFY as typeof prev.step,
            }));
        }
    };

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState((prev) => ({
            ...prev,
            email: e.target.value,
        }));
    };

    /* ===============================
       STEP 2 - OTP
    ================================ */
    const handleOtpChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        setState((prev) => {
            const newOtp = [...prev.otp];
            newOtp[index] = value;

            return {
                ...prev,
                otp: newOtp,
            };
        });

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleValidateCode = async () => {
        const code = state.otp.join("");

        if (code.length !== 6) {
            toast.error("Ingresa el código completo.");
            return;
        }

        if (state.secondsLeft <= 0) {
            toast.error("El código expiró.");
            return;
        }

        const isValid = await verifyOtp(state.email, code);

        if (isValid) {
            setState((prev) => ({
                ...prev,
                step: STEPS_RESET_PASSWORD_LOGIN.RESET as typeof prev.step,
            }));
        }
    };

    /* ===============================
       STEP 3 - RESET PASSWORD
    ================================ */
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setState((prev) => ({
            ...prev,
            changePassword: {
                ...prev.changePassword,
                [name]: value,
            },
        }));
    };

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { newPassword, confirmPassword } = state.changePassword;

        if (!newPassword || !confirmPassword) {
            toast.error("Todos los campos son obligatorios.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Las contraseñas no coinciden.");
            return;
        }

        const isReset = await resetPasswordLogin(state.email, newPassword);

        if (isReset) {
            toast.success("Contraseña actualizada correctamente.");
            resetFlow();
            close();
        }
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
                        {state.step === STEPS_RESET_PASSWORD_LOGIN.EMAIL && (
                            <ModalEmail
                                email={state.email}
                                handleChangeEmail={handleChangeEmail}
                                handleSendCode={handleSendCode}
                                isLoading={isLoading}
                                close={handleClose}
                            />
                        )}

                        {state.step === STEPS_RESET_PASSWORD_LOGIN.VERIFY && (
                            <ModalVerificar
                                otp={state.otp}
                                isLoading={isLoading}
                                handleOtpChange={handleOtpChange}
                                handleValidateCode={handleValidateCode}
                                secondsLeft={state.secondsLeft}
                                inputsRef={inputsRef}
                                close={handleClose}
                            />
                        )}

                        {state.step === STEPS_RESET_PASSWORD_LOGIN.RESET && (
                            <ModalReset
                                changePassword={state.changePassword}
                                handleChangePassword={handleChangePassword}
                                handleSubmit={handleResetPassword}
                                isLoading={isLoading}
                                close={handleClose}
                            />
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
