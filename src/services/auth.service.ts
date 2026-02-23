import { API_URL_AUTH } from "../config";
import type { User } from "../types/user.types";
import { getUserErrorMessage, handleApiError } from "../utils/errores";

export async function Login({ username, password }: { username: string; password: string }): Promise<{ data: Omit<User, "id" | "password">; message: string }> {
    try {
        const response = await fetch(API_URL_AUTH + "/login", {
            method: "POST",
            credentials: "include", // ⭐ MUY IMPORTANTE
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        await handleApiError(response);

        const { data, message } = await response.json();
        return { data, message };
    } catch (e) {
        const errorMessage = getUserErrorMessage(e);
        throw new Error(errorMessage);
    }
}

export async function Registrarse({
    username,
    name,
    password,
    email,
    role,
}: {
    username: string;
    name: string;
    password: string;
    email: string;
    role: "admin" | "user";
}): Promise<{ data: Omit<User, "id, password">; message: string }> {
    try {
        const response = await fetch(API_URL_AUTH + "/user", {
            method: "POST",
            credentials: "include",
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
        const response = await fetch(API_URL_AUTH + "/logout", {
            method: "POST",
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

export async function CheckSession(): Promise<{ data: boolean }> {
    try {
        const response = await fetch(API_URL_AUTH + "/verify", {
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
