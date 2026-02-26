import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, type InputHTMLAttributes } from "react";
import { FaLock } from "react-icons/fa";
import { FiCheck, FiX } from "react-icons/fi";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useOpen } from "../../hooks/useOpen";

interface PasswordValidateProps extends InputHTMLAttributes<HTMLInputElement> {
    value: string;
}

export default function PasswordValidate({ value, onChange, className, ...rest }: PasswordValidateProps) {
    const [isFocused, setIsFocused] = useState(false);
    const openShowPassword = useOpen();

    // Reglas de seguridad
    const securityStatus = useMemo(
        () => [
            { label: "Mínimo 8 caracteres", isMet: value.length >= 8 },
            { label: "Una mayúscula [A-Z]", isMet: /[A-Z]/.test(value) },
            { label: "Un número [0-9]", isMet: /[0-9]/.test(value) },
            { label: "Carácter especial [@$!%*?&#]", isMet: /[@$!%*?&#]/.test(value) },
        ],
        [value]
    );
    return (
        <div className="relative grid w-full gap-2">
            <AnimatePresence>
                {isFocused && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full z-10 mb-2 w-full"
                    >
                        <div className="flex flex-col gap-x-4 gap-y-2 rounded-lg border border-slate-800 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-md">
                            {securityStatus.map((status, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    {status.isMet ? <FiCheck className="text-[10px] text-green-500" /> : <FiX className="text-base text-slate-600" />}
                                    <span className={`text-base font-medium ${status.isMet ? "text-green-400" : "text-slate-500"}`}>{status.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="absolute top-full left-6 h-2 w-2 -translate-y-1 rotate-45 border-r border-b border-slate-800 bg-slate-900"></div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative">
                <label className="">
                    <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />

                    <input
                        type={openShowPassword.isOpen ? "text" : "password"}
                        className={className}
                        id={rest.id}
                        name={rest.name}
                        value={value}
                        onChange={onChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        autoComplete="current-password"
                        {...rest}
                    />
                </label>

                <motion.button
                    type="button"
                    tabIndex={-1}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => openShowPassword.toggle()}
                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-blue-400"
                    whileTap={{ scale: 0.9 }}
                >
                    {openShowPassword.isOpen ? <IoEye size={18} /> : <IoEyeOff size={18} />}
                </motion.button>
            </div>
        </div>
    );
}
