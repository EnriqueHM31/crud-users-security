import { API_URL_USERS } from "../config";
import type { User } from "../types/user.types";
import { handleApiError } from "../utils/errores";

export async function ObtenerUsuarios(): Promise<User[]> {
    const response = await fetch(`${API_URL_USERS}`);

    await handleApiError(response);


    const { data } = await response.json();
    return data;
}


export async function EditarUsuario({ id, user }: { id: string; user: Omit<User, "id"> }): Promise<User> {
    const response = await fetch(`${API_URL_USERS}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    await handleApiError(response);


    const { data } = await response.json();
    return data;
}

export async function CrearUsuario({ user }: { user: Omit<User, "id"> }): Promise<User> {
    const response = await fetch(`${API_URL_USERS}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    await handleApiError(response);

    const { data } = await response.json();
    return data;
}

export async function EliminarUsuario({ id }: { id: string }): Promise<{ message: string }> {
    const response = await fetch(`${API_URL_USERS}/${id}`, {
        method: "DELETE",
    });

    await handleApiError(response);


    const { message } = await response.json();
    return { message };
}