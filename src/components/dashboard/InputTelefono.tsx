import { motion } from "framer-motion";
import { FaPhone } from "react-icons/fa";

type CountryCodeOption = {
    code: string;
    label: string;
};

type PhoneInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
    countryCodes?: CountryCodeOption[];
    value: string;
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
    // 1. Limpiamos el valor de cualquier caracter no numérico
    const numeric = value.replace(/\D/g, "");

    // 2. Buscamos qué código de país coincide con el inicio del string
    // Ordenamos por longitud descendente para que +52 coincida antes que +5
    const matchedCountry = [...countryCodes].sort((a, b) => b.code.length - a.code.length).find((c) => numeric.startsWith(c.code.replace("+", "")));

    const selectedCode = matchedCountry ? matchedCountry.code : "";
    const countryPrefix = selectedCode.replace("+", "");

    // 3. El número nacional es lo que queda después del prefijo
    const nationalNumber = matchedCountry ? numeric.slice(countryPrefix.length) : numeric;

    // Handler para cambiar el prefijo (Select)
    const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPrefix = e.target.value.replace("+", "");
        // Si no hay número nacional, solo mandamos el prefijo o vacío
        const newValue = newPrefix + nationalNumber;

        onChange({
            target: {
                name: inputProps.name,
                value: newValue,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    // Handler para cambiar los dígitos (Input)
    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 1. Extraemos solo los números
        let newDigits = e.target.value.replace(/\D/g, "");

        // 2. Validamos que no exceda los 10 dígitos (ajusta este número si necesitas más)
        if (newDigits.length > 10) {
            newDigits = newDigits.slice(0, 10);
        }

        // 3. Si el usuario borra todo, limpiamos el estado
        if (!newDigits && !selectedCode) {
            onChange({
                target: { name: inputProps.name, value: "" },
            } as React.ChangeEvent<HTMLInputElement>);
            return;
        }

        // 4. Usamos el código seleccionado actual o el primero por defecto
        const activePrefix = (selectedCode || countryCodes[0].code).replace("+", "");

        onChange({
            target: {
                name: inputProps.name,
                value: activePrefix + newDigits,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <div className={`relative flex w-full items-center gap-2 rounded-md ${inputProps.className || ""}`}>
            <motion.div
                className="relative flex w-full items-center gap-2 rounded-md focus-within:ring-2 focus-within:ring-blue-500"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
            >
                <FaPhone className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />

                <div className="flex w-full items-center pl-10">
                    {/* Selector de País */}
                    <select
                        id="country-code"
                        name="country-code"
                        aria-label="País"
                        autoComplete="country"
                        value={selectedCode}
                        onChange={handleCodeChange}
                        className="w-fit cursor-pointer appearance-none bg-transparent py-2.5 pr-2 font-medium outline-none"
                    >
                        {countryCodes.map((c) => (
                            <option key={c.code} value={c.code}>
                                {c.label} {c.code}
                            </option>
                        ))}
                    </select>

                    {/* Separador visual opcional */}
                    <span className="text-slate-300">|</span>

                    {/* Campo de número nacional */}
                    <input
                        id={inputProps.id}
                        name={inputProps.name}
                        autoComplete={inputProps.autoComplete}
                        type="tel"
                        inputMode="numeric"
                        value={nationalNumber}
                        onChange={handleNumberChange}
                        placeholder="Número local"
                        className="ml-2 flex-1 bg-transparent py-2.5 outline-none"
                    />
                </div>
            </motion.div>
        </div>
    );
}
