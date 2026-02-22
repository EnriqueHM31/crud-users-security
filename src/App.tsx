import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";
import { useIsAuthenticated } from "./hooks/useAuth";
import { useAuthenticatedUser } from "./hooks/useUsers";
import { getDefaultRouteForRole } from "./utils/auth";

/* Lazy Pages */
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Landing = lazy(() => import("./pages/Landing"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

function HomeRedirect() {
    const isAuthenticated = useIsAuthenticated();
    const user = useAuthenticatedUser();

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    return <Navigate to={getDefaultRouteForRole(user.role)} replace />;
}

function App() {
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

                {/* Not Found */}
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}

export default App;
