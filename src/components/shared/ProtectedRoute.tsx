import { Navigate, useLocation } from "react-router-dom";
import { useIsAuthenticated, useUserRole } from "../../hooks/useAuth";
import { RUTAS, obtenerRutaPorRolDefecto } from "../../config/routes";
import type { ReactNode } from "react";
import type { UserRole } from "../../types/user.types";

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const isAuthenticated = useIsAuthenticated();
    const role = useUserRole();
    const location = useLocation();

    if (isAuthenticated === undefined || role === undefined) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to={RUTAS.LOGIN} replace state={{ from: location }} />;
    }

    if (allowedRoles?.length && role && !allowedRoles.includes(role)) {
        return <Navigate to={obtenerRutaPorRolDefecto(role)} replace />;
    }

    return <>{children}</>;
}
