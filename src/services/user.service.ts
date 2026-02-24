import { API_URL_USER } from "../config";
import type { User } from "../types/user.types";
import { getUserErrorMessage, handleApiError } from "../utils/errores";

export async function ObtenerUsuarios(): Promise<{ data: User[]; message: string }> {
    try {
        const response = await fetch(`${API_URL_USER}`);

        await handleApiError(response);

        const { data, message } = await response.json();
        return { data, message };
    } catch (e) {
        const errorMessage = getUserErrorMessage(e);
        throw new Error(errorMessage);
    }
}

export async function EditarUsuario({
    id_usuario,
    user,
}: {
    id_usuario: string;
    user: Omit<User, "id_usuario | fecha_creacion | fecha_actualizacion">;
}): Promise<{ data: User; message: string }> {
    try {
        const response = await fetch(`${API_URL_USER}/${id_usuario}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        await handleApiError(response);

        const { data, message } = await response.json();
        return { data, message };
    } catch (e) {
        const errorMessage = getUserErrorMessage(e);
        throw new Error(errorMessage);
    }
}

export async function CrearUsuario({
    user,
}: {
    user: Omit<User, "id_usuario" | "fecha_creacion" | "fecha_actualizacion">;
}): Promise<{ data: User; message: string }> {
    try {
        const response = await fetch(`${API_URL_USER}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        await handleApiError(response);

        const { data, message } = await response.json();
        return { data, message };
    } catch (e) {
        const errorMessage = getUserErrorMessage(e);
        throw new Error(errorMessage);
    }
}

export async function EliminarUsuario({ id_usuario }: { id_usuario: string }): Promise<{ message: string }> {
    try {
        const response = await fetch(`${API_URL_USER}/${id_usuario}`, {
            method: "DELETE",
            credentials: "include",
        });

        await handleApiError(response);

        const { message } = await response.json();
        return { message };
    } catch (e) {
        const errorMessage = getUserErrorMessage(e);
        throw new Error(errorMessage);
    }
}

export async function CambiarContrasena({ id_usuario, contrasena }: { id_usuario: string; contrasena: string }): Promise<{ message: string }> {
    try {
        const response = await fetch(`${API_URL_USER}/contraseña/${id_usuario}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ contrasena }),
        });

        await handleApiError(response);

        const { message } = await response.json();
        return { message };
    } catch (e) {
        const errorMessage = getUserErrorMessage(e);
        throw new Error(errorMessage);
    }
}
