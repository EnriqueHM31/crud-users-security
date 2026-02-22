import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";
import { Dashboard } from "./pages/Dashboard";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { useIsAuthenticated } from "./hooks/useAuth";
import { useAuthenticatedUser } from "./hooks/useUsers";
import { getDefaultRouteForRole } from "./utils/auth";

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
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}

export default App;
