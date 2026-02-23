import { useEffect, useState, Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";
import { useAuthStore } from "./store/auth.store";

import { useIsAuthenticated } from "./hooks/useAuth";
import { useAuthenticatedUser } from "./hooks/useUsers";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Landing = lazy(() => import("./pages/Landing"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

function getDefaultRouteForRole(role: string): string {
    const routes: Record<string, string> = {
        admin: "/dashboard",
        user: "/landing",
    };

    return routes[role] || "/login";
}

export function HomeRedirect() {
    const isAuthenticated = useIsAuthenticated();
    const user = useAuthenticatedUser();

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    return <Navigate to={getDefaultRouteForRole(user.role)} replace />;
}

function App() {
    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        async function initAuth() {
            await useAuthStore.getState().checkSession();
            setAuthReady(true);
        }

        initAuth();
    }, []);

    if (!authReady) {
        return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">Cargando...</div>;
    }

    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">Cargando...</div>}>
            <Routes>
                <Route path="/" element={<HomeRedirect />} />

                <Route path="/login" element={<Login />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/landing"
                    element={
                        <ProtectedRoute allowedRoles={["user"]}>
                            <Landing />
                        </ProtectedRoute>
                    }
                />

                <Route path="/profile" element={<Profile />} />

                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}

export default App;
