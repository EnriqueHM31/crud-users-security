import { API_URL_TASK } from "../config";
import type { Task, TaskCreate } from "../types/task.types";
import type { UUID } from "../types/user.types";
import { getUserErrorMessage, handleApiError } from "../utils/errores";

export async function ObtenerTareasUser({ id }: { id: UUID }): Promise<{ data: Task[] }> {
    try {
        const response = await fetch(`${API_URL_TASK}/user/${id}`, {
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

export async function CrearTarea({ id_usuario, task }: { id_usuario: UUID; task: TaskCreate }): Promise<{ data: Task }> {
    try {
        const response = await fetch(`${API_URL_TASK}/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                id_usuario,
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

export async function EditarTarea({ id_tarea, completado }: { id_tarea: UUID; completado: boolean }): Promise<{ data: Task }> {
    try {
        const response = await fetch(`${API_URL_TASK}/${id_tarea}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ completado }),
        });

        await handleApiError(response);

        const { data } = await response.json();
        return { data };
    } catch (e) {
        const errorMessage = getUserErrorMessage(e);
        throw new Error(errorMessage);
    }
}

export async function EliminarTarea({ id }: { id: UUID }): Promise<{ message: string }> {
    try {
        const response = await fetch(`${API_URL_TASK}/${id}`, {
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
