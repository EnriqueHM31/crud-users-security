export class ApiError extends Error {
    public status: number;
    public data?: unknown;

    constructor(message: string, status: number, data?: unknown) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}

export async function handleApiError(response: Response): Promise<Response> {
    if (response.ok) {
        return response;
    }

    console.log(response);

    let errorMessage = "Error inesperado en la solicitud";
    let errorData = null;

    try {
        const data = await response.json();
        errorData = data;
        errorMessage = data.message || errorMessage;
    } catch {
        errorMessage = response.statusText || errorMessage;
    }

    switch (response.status) {
        case 400:
            errorMessage = errorMessage || "Solicitud inválida";
            break;
        case 401:
            errorMessage = errorMessage || "No autorizado";
            break;
        case 403:
            errorMessage = errorMessage || "Acceso prohibido";
            break;
        case 404:
            errorMessage = errorMessage || "Recurso no encontrado";
            break;
        case 500:
            errorMessage = "Error interno del servidor";
            break;
    }

    throw new ApiError(errorMessage, response.status, errorData);
}

export function getUserErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        const message = error.message.toLowerCase();

        // Error típico cuando el backend no responde
        if (message.includes("failed to fetch")) {
            return "No se pudo conectar con el servidor. Verifica tu conexión o intenta más tarde.";
        }

        // Error por CORS o red bloqueada
        if (message.includes("networkerror")) {
            return "Problema de red detectado. Revisa tu conexión a internet.";
        }

        // Timeout personalizado si lo usas
        if (message.includes("timeout")) {
            return "La solicitud tardó demasiado en responder. Intenta nuevamente.";
        }

        // Error interno del servidor
        if (message.includes("internal server error")) {
            return "Ocurrió un error en el servidor. Intenta más tarde.";
        }

        // Si viene mensaje del backend (ej. credenciales inválidas)
        return error.message;
    }

    return "Ocurrió un error inesperado. Intenta nuevamente.";
}