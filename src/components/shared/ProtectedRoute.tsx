import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "../../hooks/useAuth";
import { useAuthenticatedUser } from "../../hooks/useUsers";
import type { ReactNode } from "react";
import type { UserRole } from "../../types/user.types";
import { getDefaultRouteForRole } from "../../utils/auth";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const isAuthenticated = useIsAuthenticated();
  const user = useAuthenticatedUser();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getDefaultRouteForRole(user.role)} replace />;
  }

  return <>{children}</>;
}
