import type { UserRole } from "../types/user.types";

export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    DASHBOARD: "/dashboard",
    LANDING: "/landing",
    PROFILE: "/profile",
    NOT_FOUND: "/404",
} as const;

const DEFAULT_ROUTE_BY_ROLE: Record<UserRole, string> = {
    admin: ROUTES.DASHBOARD,
    user: ROUTES.LANDING,
};

export function getDefaultRouteForRole(role: UserRole | null | undefined): string {
    if (!role) return ROUTES.PROFILE;
    return DEFAULT_ROUTE_BY_ROLE[role] ?? ROUTES.PROFILE;
}

export const ROUTE_ALLOWED_ROLES: Record<string, UserRole[]> = {
    [ROUTES.DASHBOARD]: ["admin"],
    [ROUTES.LANDING]: ["user"],
    [ROUTES.PROFILE]: ["admin", "user"],
};

export function isRoleAllowed(path: string, role: UserRole): boolean {
    const allowed = ROUTE_ALLOWED_ROLES[path];

    if (!allowed) return false;

    return allowed.includes(role);
}
