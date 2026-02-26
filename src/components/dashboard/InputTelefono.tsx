import { motion } from "framer-motion";
import { FaPhone } from "react-icons/fa";

type CountryCodeOption = {
    code: string;
    label: string;
};

type PhoneInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
    countryCodes?: CountryCodeOption[];
    value: string; // ejemplo: +522731266282
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const defaultCountryCodes: CountryCodeOption[] = [
    { code: "+52", label: "MX" },
    { code: "+1", label: "US" },
    { code: "+57", label: "CO" },
    { code: "+7", label: "RU" },
    { code: "+84", label: "VN" },
];

export default function InputTelefono({ value = "", onChange, countryCodes = defaultCountryCodes, ...inputProps }: PhoneInputProps) {
    const numeric = value.replace(/\D/g, "");

    // Últimos 10 dígitos = número nacional
    const nationalNumber = numeric.length > 10 ? numeric.slice(-10) : numeric;

    // Lo demás = código país
    const countryNumeric = numeric.length > 10 ? numeric.slice(0, -10) : "";

    const selectedCode = countryCodes.find((c) => c.code.replace("+", "") === countryNumeric)?.code ?? countryCodes[0].code;

    const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newFullValue = e.target.value + nationalNumber;

        const syntheticEvent = {
            target: {
                name: inputProps.name,
                value: newFullValue,
            },
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                    <select value={selectedCode} onChange={handleCodeChange} className="w-fit cursor-pointer appearance-none py-2.5 pr-6 outline-none">
                        {countryCodes.map((c) => (
                            <option key={c.code} value={c.code}>
                                {c.label} {c.code}
                            </option>
                        ))}
                    </select>

                    <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        name={inputProps.name}
                        value={nationalNumber}
                        onChange={handleNumberChange}
                        className="ml-3 flex-1 bg-transparent focus:outline-none"
                    />
                </div>
            </motion.div>
        </div>
    );
}
