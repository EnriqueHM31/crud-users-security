import { toast } from "sonner";

export function formatearFechaMexico(isoDate: string): string {
    return new Intl.DateTimeFormat("es-MX", {
        timeZone: "America/Mexico_City",
        dateStyle: "long",
        timeStyle: "medium",
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
    // Verifica que sea un objeto válido
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
