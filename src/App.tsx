import { useEffect, useState, Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";
import { useAuthStore } from "./store/auth.store";
import { useIsAuthenticated, useUserRole } from "./hooks/useAuth";
import { getDefaultRouteForRole, ROUTES } from "./config/routes";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Landing = lazy(() => import("./pages/Landing"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

export function HomeRedirect() {
    const isAuthenticated = useIsAuthenticated();
    const rol = useUserRole();

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    return <Navigate to={getDefaultRouteForRole(rol)} replace />;
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
                <Route path={ROUTES.HOME} element={<HomeRedirect />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />

                <Route
                    path={ROUTES.DASHBOARD}
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path={ROUTES.LANDING}
                    element={
                        <ProtectedRoute allowedRoles={["user"]}>
                            <Landing />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path={ROUTES.PROFILE}
                    element={
                        <ProtectedRoute allowedRoles={["admin", "user"]}>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}

export default App;
