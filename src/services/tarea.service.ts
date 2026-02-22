import { API_URL } from "../config";
import type { Task } from "../types/task.types";
import { getUserErrorMessage, handleApiError } from "../utils/errores";

export async function ObtenerTareasUser({ id }: { id: string }): Promise<{ data: Task[] }> {
    try {
        const response = await fetch(`${API_URL}/task?id_usuario=${id}`, {
            method: "GET",
            credentials: "include",
        });

        await handleApiError(response);

        const { data } = await response.json();
        return { data };


    } catch (e) {
        const errorMessage = getUserErrorMessage(e);
        throw new Error(errorMessage);
    }
}


export async function CrearTarea({ id, task }: { id: string; task: Omit<Task, "id"> }): Promise<{ data: Task }> {
    try {
        const response = await fetch(`${API_URL}/task`, {
            method: "POST",

            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                id_usuario: id,
                ...task,
            }),
        });

        await handleApiError(response);

        const { data } = await response.json();
        return { data };


    } catch (e) {
        const errorMessage = getUserErrorMessage(e);
        throw new Error(errorMessage);
    }
}

export async function EditarTarea({ id, task }: { id: string; task: Omit<Task, "id"> }): Promise<{ data: Task }> {

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });

        await handleApiError(response);

        const { data } = await response.json();
        return { data };

    } catch (e) {
        const errorMessage = getUserErrorMessage(e);
        throw new Error(errorMessage);
    }
}

export async function EliminarTarea({ id }: { id: string }): Promise<{ message: string }> {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
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