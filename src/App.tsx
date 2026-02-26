import { useEffect, useState, Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";
import { useAuthStore } from "./store/auth.store";
import { useIsAuthenticated, useUserRole } from "./hooks/useAuthStore";
import { obtenerRutaPorRolDefecto, RUTAS } from "./config/routes";
import { ROLES } from "./config/routes";
import type { UserRole } from "./types/user.types";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Landing = lazy(() => import("./pages/Landing"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

export function HomeRedirect() {
    const isAuthenticated = useIsAuthenticated();
    const rol = useUserRole();

    if (!isAuthenticated) {
        return <Navigate to={RUTAS.LOGIN} replace />;
    }

    return <Navigate to={obtenerRutaPorRolDefecto(rol)} replace />;
}

function App() {
    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        useAuthStore
            .getState()
            .checkSession()
            .finally(() => setAuthReady(true));
    }, []);

    if (!authReady) {
        return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">Cargando...</div>;
    }

    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">Cargando...</div>}>
            <Routes>
                <Route path={RUTAS.INICIO} element={<HomeRedirect />} />
                <Route path={RUTAS.LOGIN} element={<Login />} />

                <Route
                    path={RUTAS.PANEL_ADMIN}
                    element={
                        <ProtectedRoute allowedRoles={[ROLES.ADMIN as UserRole]}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path={RUTAS.PANEL_USUARIO}
                    element={
                        <ProtectedRoute allowedRoles={[ROLES.USER as UserRole]}>
                            <Landing />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path={RUTAS.PERFIL}
                    element={
                        <ProtectedRoute allowedRoles={[ROLES.ADMIN as UserRole, ROLES.USER as UserRole]}>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route path={RUTAS.NO_ENCONTRADO} element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}

export default App;
