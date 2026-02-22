import { API_URL } from "../config";
import type { User } from "../types/user.types";
import { getUserErrorMessage, handleApiError } from "../utils/errores";

export async function ObtenerUsuarios(): Promise<{ data: User[] }> {

    try {
        const response = await fetch(`${API_URL}/user`);

        await handleApiError(response);


        const { data } = await response.json();
        return { data };

    } catch (e) {
        const errorMessage = getUserErrorMessage(e);
        throw new Error(errorMessage);
    }
}


export async function EditarUsuario({ id, user }: { id: string; user: Omit<User, "id"> }): Promise<{ data: User }> {

    try {
        const response = await fetch(`${API_URL}/user?id_usuario=${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        await handleApiError(response);


        const { data } = await response.json();
        return { data };

    } catch (e) {
        const errorMessage = getUserErrorMessage(e);
        throw new Error(errorMessage);
    }
}

export async function CrearUsuario({ user }: { user: Omit<User, "id"> }): Promise<{ data: User }> {

    try {
        const response = await fetch(`${API_URL}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        await handleApiError(response);

        const { data } = await response.json();
        return { data };


    } catch (e) {
        const errorMessage = getUserErrorMessage(e);
        throw new Error(errorMessage);
    }
}

export async function EliminarUsuario({ id }: { id: string }): Promise<{ message: string }> {
    try {
        const response = await fetch(`${API_URL}/user?id_usuario=${id}`, {
            method: "DELETE",
        });

        await handleApiError(response);


        const { message } = await response.json();
        return { message };

    } catch (e) {
        const errorMessage = getUserErrorMessage(e);
        throw new Error(errorMessage);
    }
}