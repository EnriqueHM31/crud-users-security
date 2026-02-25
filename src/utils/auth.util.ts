import type { AuthStore } from "../types/auth.types";
import type { UserRole } from "../types/user.types";

export function normalizeUser(data: Record<string, unknown> | null): AuthStore["userAuthenticated"] {
    if (!data) return null;
    const rol = data.rol as UserRole | undefined;
    return { ...data, rol } as AuthStore["userAuthenticated"];
}
