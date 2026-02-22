import type { UserRole } from "../types/user.types";

export const getDefaultRouteForRole = (role: UserRole): string =>
  role === "admin" ? "/dashboard" : "/landing";
