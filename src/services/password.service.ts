import { API_URL_PASSWORD } from "../config";
import { getUserErrorMessage, handleApiError } from "../utils/errores";

export async function resetearContrasena({ id_usuario, contrasena }: { id_usuario: string; contrasena: string }): Promise<{ message: string }> {
    try {
        const response = await fetch(`${API_URL_PASSWORD}/reset/${id_usuario}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ newPassword: contrasena }),
        });

        await handleApiError(response);

        const { message } = await response.json();
        return { message };
    } catch (e) {
        const errorMessage = getUserErrorMessage(e);
        throw new Error(errorMessage);
    }
}

export async function CambiarContrasena({
    id_usuario,
    contrasena,
    contrasena_actual,
}: {
    id_usuario: string;
    contrasena: string;
    contrasena_actual: string;
}): Promise<{ message: string; ok: boolean }> {
    try {
        const response = await fetch(`${API_URL_PASSWORD}/change/${id_usuario}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newPassword: contrasena,
                contrasenaActual: contrasena_actual,
            }),
        });

        await handleApiError(response);

        const { message, ok } = await response.json();
        return { message, ok };
    } catch (e) {
        const errorMessage = getUserErrorMessage(e);
        throw new Error(errorMessage);
    }
}

export async function RequestResetEmail({ email }: { email: string }): Promise<{ message: string }> {
    try {
        const response = await fetch(API_URL_PASSWORD + "/request-reset", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        await handleApiError(response);

        const { message } = await response.json();
        return { message };
    } catch (e) {
        const errorMessage = getUserErrorMessage(e);
        throw new Error(errorMessage);
    }
}

export async function VerificarOtp({ email, otp }: { email: string; otp: string }): Promise<{ message: string }> {
    try {
        const response = await fetch(`${API_URL_PASSWORD}/verify-reset`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                otp,
            }),
        });

        await handleApiError(response);

        const { message } = await response.json();
        return { message };
    } catch (e) {
        const errorMessage = getUserErrorMessage(e);
        throw new Error(errorMessage);
    }
}

export async function resetearContrasenaLogin({ email, contrasena }: { email: string; contrasena: string }): Promise<{ message: string }> {
    try {
        const response = await fetch(`${API_URL_PASSWORD}/reset-password-login`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                newPassword: contrasena,
            }),
        });

        await handleApiError(response);

        const { message } = await response.json();
        return { message };
    } catch (e) {
        const errorMessage = getUserErrorMessage(e);
        throw new Error(errorMessage);
    }
}
