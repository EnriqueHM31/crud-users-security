export interface ModalVerificarProps {
    otp: string[];
    handleOtpChange: (value: string, index: number) => void;
    handleValidateCode: () => void;
    secondsLeft: number;
    inputsRef: React.RefObject<(HTMLInputElement | null)[]>;
}

export default function ModalVerificar({ otp, handleOtpChange, handleValidateCode, secondsLeft, inputsRef }: ModalVerificarProps) {
    return (
        <>
            <h2 className="text-2xl font-bold text-slate-100">Verificación</h2>

            <p className="mt-2 mb-2 text-sm text-slate-400">Ingresa el código de 6 dígitos.</p>

            <p className="mb-4 text-xs text-red-400">Expira en {secondsLeft}s</p>

            <div className="mb-4 flex justify-between gap-2">
                {otp.map((digit, index) => (
                    <input
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

            <button onClick={handleValidateCode} className="w-full rounded-lg bg-blue-800 py-2 font-semibold text-white hover:bg-blue-900">
                Validar código
            </button>
        </>
    );
}
