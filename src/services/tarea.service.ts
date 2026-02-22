import { API_URL_TAREAS } from "../config";
import type { Task } from "../types/task.types";
import { handleApiError } from "../utils/errores";

export async function ObtenerTareasUser({ id }: { id: string }): Promise<{ data: Task[] }> {
    const response = await fetch(`${API_URL_TAREAS}/${id}`, {
        method: "GET",
        credentials: "include",
    });

    await handleApiError(response);

    const { data } = await response.json();
    return { data };
}


export async function CrearTarea({ id, task }: { id: string; task: Omit<Task, "id"> }): Promise<{ data: Task }> {
    const response = await fetch(`${API_URL_TAREAS}/${id}`, {
        method: "POST",

        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(task),
    });

    await handleApiError(response);

    const { data } = await response.json();
    return { data };
}

export async function EditarTarea({ id, task }: { id: string; task: Omit<Task, "id"> }): Promise<{ data: Task }> {
    const response = await fetch(`${API_URL_TAREAS}/${id}`, {
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
}

export async function EliminarTarea({ id }: { id: string }): Promise<{ message: string }> {
    const response = await fetch(`${API_URL_TAREAS}/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    await handleApiError(response);

    const { message } = await response.json();
    return { message };
}