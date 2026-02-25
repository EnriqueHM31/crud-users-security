/* ===============================
   ERROR PERSONALIZADO HTTP
================================ */

/**
 * Error que representa respuestas HTTP del backend.
 * Permite guardar status y datos adicionales.
 */
export class ApiError extends Error {
    // Código HTTP (400, 401, 500, etc.)
    public status: number;

    // Información adicional enviada por el backend
    public data?: unknown;

    constructor(message: string, status: number, data?: unknown) {
        super(message); // Inicializa Error base
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}

/* ===============================
   MENSAJES POR DEFECTO HTTP
================================ */

/**
 * Mensajes estándar si el backend no envía uno propio.
 */
const DEFAULT_HTTP_MESSAGES: Record<number, string> = {
    400: "Solicitud inválida",
    401: "No autorizado",
    403: "Acceso prohibido",
    404: "Recurso no encontrado",
    500: "Error interno del servidor",
};

/* ===============================
   OBTENER MENSAJE PARA EL USUARIO
================================ */

/**
 * Convierte cualquier error en un mensaje seguro para UI.
 */
export function getUserErrorMessage(error: unknown): string {
    // Si es error HTTP controlado
    if (error instanceof ApiError) {
        return error.message;
    }

    // Si es error de red o runtime
    if (error instanceof Error) {
        const message = error.message.toLowerCase();

        // Servidor no responde
        if (message.includes("failed to fetch")) {
            return "No se pudo conectar con el servidor.";
        }

        // Problema de red
        if (message.includes("networkerror")) {
            return "Problema de red detectado.";
        }

        // Timeout
        if (message.includes("timeout")) {
            return "La solicitud tardó demasiado en responder.";
        }

        return error.message;
    }

    return "Ocurrió un error inesperado.";
}

/* ===============================
   MANEJO DE RESPUESTAS HTTP
================================ */

/**
 * Verifica si la respuesta fue exitosa.
 * Si no, lanza un ApiError con mensaje adecuado.
 */
export async function handleApiError(response: Response): Promise<Response> {
    // Si todo salió bien, retorna la respuesta
    if (response.ok) return response;

    let errorData: { message?: string } = {};

    try {
        // Intenta leer el body como JSON
        errorData = await response.json();
    } catch {
        // Si no es JSON válido, se ignora
    }

    // Mensaje enviado por backend (si existe)
    const backendMessage = typeof errorData?.message === "string" ? errorData.message : undefined;

    // Mensaje por defecto según status
    const fallbackMessage = DEFAULT_HTTP_MESSAGES[response.status] ?? response.statusText ?? "Error inesperado en la solicitud";

    // Lanza error controlado
    throw new ApiError(backendMessage ?? fallbackMessage, response.status, errorData);
}
