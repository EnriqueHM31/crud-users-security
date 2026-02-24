import type { UserRole } from "../types/user.types";

export const RUTAS = {
    INICIO: "/",
    LOGIN: "/login",
    PANEL_ADMIN: "/dashboard",
    PANEL_USUARIO: "/landing",
    PERFIL: "/profile",
    NO_ENCONTRADO: "/404",
} as const;

const RUTA_POR_ROL_DEFECTO: Record<UserRole, string> = {
    admin: RUTAS.PANEL_ADMIN,
    user: RUTAS.PANEL_USUARIO,
};

export const ROLES = {
    ADMIN: "admin",
    USER: "user",
};

export function obtenerRutaPorRolDefecto(rol: UserRole | null | undefined): string {
    if (!rol) return RUTAS.PERFIL;

    return RUTA_POR_ROL_DEFECTO[rol] ?? RUTAS.PERFIL;
}
