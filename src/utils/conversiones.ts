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
