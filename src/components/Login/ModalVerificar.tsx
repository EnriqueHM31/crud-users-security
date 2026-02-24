import { formatoTiempo } from "../../utils/conversiones";
import { motion } from "framer-motion";

export interface ModalVerificarProps {
    otp: string[];
    handleOtpChange: (value: string, index: number) => void;
    handleValidateCode: () => void;
    secondsLeft: number;
    inputsRef: React.RefObject<(HTMLInputElement | null)[]>;
    isLoading: boolean;
}

export default function ModalVerificar({ otp, handleOtpChange, handleValidateCode, secondsLeft, inputsRef, isLoading }: ModalVerificarProps) {
    return (
        <div className="relative flex flex-col gap-4">
            <header>
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="logo" className="h-10 w-10 rounded-full" />
                    <h2 className="text-2xl font-bold text-slate-100">Verificación</h2>
                </div>

                <p className="mt-2 mb-2 text-base text-slate-400">Ingresa el código de 6 dígitos.</p>
            </header>

            <p className="absolute top-0 right-0 mb-4 text-base font-bold text-red-400">Expira en {formatoTiempo(secondsLeft)}</p>

            <div className="mb-4 flex justify-between gap-2">
                {otp.map((digit, index) => (
                    <input
                        id={`otp-${index}`}
                        name={`otp-${index}`}
                        autoComplete={`otp-${index}`}
                        key={`otp-${index}`}
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

            <motion.button
                initial={{ scale: 0.9, opacity: 0, y: 40, transition: { duration: 0.3 } }}
                animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }}
                whileHover={{ scale: 0.9, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                onClick={handleValidateCode}
                disabled={isLoading}
                className="w-full cursor-pointer rounded-lg bg-blue-800 py-2 font-semibold text-white hover:bg-blue-900"
            >
                {isLoading ? "Validando..." : "Validar código"}
            </motion.button>
        </div>
    );
}
