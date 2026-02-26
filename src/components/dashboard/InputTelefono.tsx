import { motion } from "framer-motion";
import { FaPhone } from "react-icons/fa";

type CountryCodeOption = {
    code: string;
    label: string;
};

type PhoneInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
    countryCodes?: CountryCodeOption[];
    value: string; // +5227312662823
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const countryCodes = [
    { code: "+52", label: "MX" },
    { code: "+1", label: "US" },
    { code: "+57", label: "BR" },
    { code: "+7", label: "RU" },
    { code: "+84", label: "UA" },
];

export default function InputTelefono({ value, onChange, ...inputProps }: PhoneInputProps) {
    // 🔎 Separar lada y número desde el valor completo
    const found = countryCodes.find((c) => value?.startsWith(c.code));

    const selectedCode = found?.code ?? countryCodes[0].code;
    const phoneNumber = found ? value.replace(found.code, "") : (value ?? "");

    // 🔁 Cuando cambia lada
    const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newFullValue = e.target.value + phoneNumber;

        const syntheticEvent = {
            target: {
                name: inputProps.name,
                value: newFullValue,
            },
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);
    };

    // 🔁 Cuando cambia número
    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Eliminar todo lo que no sea número
        const numericValue = e.target.value.replace(/\D/g, "");

        const newFullValue = selectedCode + numericValue;

        const syntheticEvent = {
            target: {
                name: inputProps.name,
                value: newFullValue,
            },
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);
    };

    return (
        <div className={`relative flex w-full items-center gap-2 rounded-md ${inputProps.className || ""}`}>
            <motion.div className="relative flex w-full items-center gap-2 rounded-md" initial={{ opacity: 0.8 }} animate={{ opacity: 1 }}>
                <FaPhone className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />

                <div className="flex w-full items-center pl-10">
                    <select
                        id="country-code"
                        name="country-code"
                        autoComplete="country"
                        value={selectedCode}
                        onChange={handleCodeChange}
                        className="relative w-fit cursor-pointer appearance-none py-2.5 pr-6 outline-none"
                    >
                        {countryCodes.map((c) => (
                            <option key={c.code} value={c.code}>
                                {c.label} {c.code}
                            </option>
                        ))}
                    </select>

                    <input
                        type="tel"
                        id={inputProps.id}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        name={inputProps.name}
                        autoComplete={inputProps.autoComplete}
                        value={phoneNumber}
                        onChange={handleNumberChange}
                        className="ml-3 flex-1 bg-transparent focus:outline-none"
                    />
                </div>
            </motion.div>
        </div>
    );
}
