import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "../../hooks/useAuth";
import { useAuthenticatedUser } from "../../hooks/useUsers";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: string[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const isAuthenticated = useIsAuthenticated();
    const user = useAuthenticatedUser();

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
