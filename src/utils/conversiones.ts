import { toast } from "sonner";

export function formatearFechaMexico(isoDate: string): string {
    return new Intl.DateTimeFormat("es-MX", {
        timeZone: "America/Mexico_City",
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(isoDate));
}
export function generarContraseñaSegura(length = 10): string {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}<>?";

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    return Array.from(array, (num) => charset[num % charset.length]).join("");
}

export const formatoTiempo = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export function validarCamposVacios(data: unknown, fieldNames?: Record<string, string>): boolean {
    if (typeof data !== "object" || data === null) {
        toast.error("Datos inválidos.");
        return false;
    }

    // Ahora TypeScript sabe que es objeto
    for (const [key, value] of Object.entries(data)) {
        // Solo valida propiedades tipo string
        if (typeof value === "string" && value.trim().length === 0) {
            const campo = fieldNames?.[key] ?? key;

            toast.error(`El campo "${campo}" no puede estar vacío.`);
            return false;
        }
    }

    return true;
}

export function esEmailValido(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function formatearTelefonoE164(phone: string): string {
    if (!phone) return "";

    // Asegurarse que empieza con +
    if (!phone.startsWith("+")) return phone;

    // Extraer solo números después del +
    const numeric = phone.slice(1).replace(/\D/g, "");

    // Ladas conocidas (ajusta según necesites)
    const countryCodes = ["52", "1", "57", "7", "84", "44", "31", "49"];

    const foundCode = countryCodes.find((code) => numeric.startsWith(code));

    if (!foundCode) return phone;

    const nationalNumber = numeric.slice(foundCode.length);

    // Ejemplo formato genérico 3-3-4
    const formattedNational = nationalNumber.replace(/(\d{3})(\d{3})(\d{0,4})/, (_, a, b, c) => [a, b, c].filter(Boolean).join(" "));

    return `+${foundCode} ${formattedNational}`;
}
