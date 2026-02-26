import { API_URL_USER } from "../config";
import type { User, UserCreate, UserUpdate, UUID } from "../types/user.types";
import { MensajeAmigableParaUsuario, handleApiError } from "../utils/errores";

export async function ObtenerUsuarios(): Promise<{ data: User[]; message: string }> {
    try {
        const response = await fetch(`${API_URL_USER}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        await handleApiError(response);

        const { data, message } = await response.json();
        return { data, message };
    } catch (e) {
        const errorMessage = MensajeAmigableParaUsuario(e);
        throw new Error(errorMessage);
    }
}

export async function EditarUsuario({ id_usuario, user }: { id_usuario: UUID; user: UserUpdate }): Promise<{ data: User; message: string; ok: boolean }> {
    try {
        const response = await fetch(`${API_URL_USER}/${id_usuario}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        await handleApiError(response);

        const { data, message, ok } = await response.json();
        return { data, message, ok };
    } catch (e) {
        const errorMessage = MensajeAmigableParaUsuario(e);
        throw new Error(errorMessage);
    }
}

export async function CrearUsuario({ user }: { user: UserCreate }): Promise<{ data: User; message: string; ok: boolean }> {
    try {
        const response = await fetch(`${API_URL_USER}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        await handleApiError(response);

        const { data, message, ok } = await response.json();
        return { data, message, ok };
    } catch (e) {
        const errorMessage = MensajeAmigableParaUsuario(e);
        throw new Error(errorMessage);
    }
}

export async function EliminarUsuario({ id_usuario }: { id_usuario: UUID }): Promise<{ message: string }> {
    try {
        const response = await fetch(`${API_URL_USER}/${id_usuario}`, {
            method: "DELETE",
            credentials: "include",
        });

        await handleApiError(response);

        const { message } = await response.json();
        return { message };
    } catch (e) {
        const errorMessage = MensajeAmigableParaUsuario(e);
        throw new Error(errorMessage);
    }
}
