export function formatearFechaMexico(isoDate: string): string {
    return new Intl.DateTimeFormat("es-MX", {
        timeZone: "America/Mexico_City",
        dateStyle: "long",
        timeStyle: "medium",
    }).format(new Date(isoDate));
}
