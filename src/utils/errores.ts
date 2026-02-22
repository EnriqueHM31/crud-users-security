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