import { API_URL } from "../config";
import type { User } from "../types/user.types";
import { getUserErrorMessage, handleApiError } from "../utils/errores";

export async function Login({ username, password }: { username: string; password: string }): Promise<{ data: Omit<User, "id, password">; message: string }> {

    try {
        const response = await fetch(API_URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        console.log({ response });
        await handleApiError(response);

        const { data, message } = await response.json();
        return { data, message };
    } catch (e) {
        const errorMessage = getUserErrorMessage(e);
        throw new Error(errorMessage);
    }
}


export async function Registrarse({ username, name, password, email, role }: { username: string; name: string; password: string; email: string; role: "admin" | "user" }): Promise<{ data: Omit<User, "id, password">; message: string }> {
    try {
        const response = await fetch(API_URL + "/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, name, password, email, role }),
        });

        await handleApiError(response);
        const { data, message } = await response.json();
        return { data, message };

    } catch (e) {
        const errorMessage = getUserErrorMessage(e);
        throw new Error(errorMessage);
    }
}

export async function CerrarSesion(): Promise<{ message: string }> {
    try {
        const response = await fetch(API_URL + "/logout", {
            method: "POST",
        });

        await handleApiError(response);

        const { message } = await response.json();
        return { message };

    } catch (e) {
        const errorMessage = getUserErrorMessage(e);
        throw new Error(errorMessage);
    }
}


export async function CheckSession(): Promise<{ data: boolean }> {

    try {
        const response = await fetch(API_URL + "/verify", {
            method: "POST",
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