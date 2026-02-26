import { API_URL_AUTH } from "../config";
import type { User, UserLogueado, UserRole } from "../types/user.types";
import { MensajeAmigableParaUsuario, handleApiError } from "../utils/errores";

export async function Login({ username, password }: { username: string; password: string }): Promise<{ data: UserLogueado; message: string }> {
    try {
        const response = await fetch(API_URL_AUTH + "/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        await handleApiError(response);

        const { data, message } = await response.json();
        return { data, message };
    } catch (e) {
        const errorMessage = MensajeAmigableParaUsuario(e);
        throw new Error(errorMessage);
    }
}

export async function Registrarse({
    username,
    name,
    contrasena,
    email,
    role,
}: {
    username: string;
    name: string;
    contrasena: string;
    email: string;
    role: UserRole;
}): Promise<{ data: Omit<User, "id, contrasena">; message: string }> {
    try {
        const response = await fetch(API_URL_AUTH + "/user", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, name, contrasena, email, role }),
        });

        await handleApiError(response);
        const { data, message } = await response.json();
        return { data, message };
    } catch (e) {
        const errorMessage = MensajeAmigableParaUsuario(e);
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
        const errorMessage = MensajeAmigableParaUsuario(e);
        throw new Error(errorMessage);
    }
}

export async function CheckSession(): Promise<{ data: UserLogueado }> {
    try {
        const response = await fetch(API_URL_AUTH + "/verify", {
            method: "POST",
            credentials: "include",
        });

        await handleApiError(response);

        const { data } = await response.json();
        return { data };
    } catch (e) {
        const errorMessage = MensajeAmigableParaUsuario(e);
        throw new Error(errorMessage);
    }
}
