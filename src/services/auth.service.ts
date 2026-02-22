import { API_URL_AUTENTICACION } from "../config";
import type { User } from "../types/user.types";
import { handleApiError } from "../utils/errores";

export async function Login({ username, password }: { username: string; password: string }): Promise<{ data: Omit<User, "id, password">; message: string }> {
    const response = await fetch(API_URL_AUTENTICACION + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    await handleApiError(response);

    const { data, message } = await response.json();
    return { data, message };
}


export async function Registrarse({ username, name, password, email, role }: { username: string; name: string; password: string; email: string; role: "admin" | "user" }): Promise<{ data: Omit<User, "id, password">; message: string }> {
    const response = await fetch(API_URL_AUTENTICACION + "/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, name, password, email, role }),
    });

    await handleApiError(response);
    const { data, message } = await response.json();
    return { data, message };
}

export async function CerrarSesion(): Promise<{ message: string }> {
    const response = await fetch(API_URL_AUTENTICACION + "/logout", {
        method: "POST",
    });

    await handleApiError(response);

    const { message } = await response.json();
    return { message };
}


export async function CheckSession(): Promise<{ data: boolean }> {

    const response = await fetch(API_URL_AUTENTICACION + "/checkSession", {
        method: "POST",
        credentials: "include",
    });

    await handleApiError(response);

    const { data } = await response.json();
    return { data };
}