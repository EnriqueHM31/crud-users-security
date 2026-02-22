import { NavLink } from "react-router-dom";
import { FiGrid, FiShield, FiUser } from "react-icons/fi";
import { useAuthenticatedUser } from "../../hooks/useUsers";

export function Sidebar() {
  const user = useAuthenticatedUser();
  const baseLinkClass =
    "inline-flex items-center gap-2 rounded-lg border border-transparent px-3 py-2.5 text-slate-300 transition hover:border-slate-700 hover:bg-slate-900 hover:text-slate-50";
  const activeLinkClass = "border-slate-700 bg-slate-900 text-slate-50";

  return (
    <aside className="border-b border-slate-800 bg-slate-950/95 p-4 lg:border-r lg:border-b-0">
      <div className="mb-6 inline-flex items-center gap-2 text-lg font-bold">
        <FiShield className="text-blue-500" />
        <span>Sistema de Seguridad</span>
      </div>

      <nav className="grid gap-2">
        {user?.role === "admin" ? (
          <>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? `${baseLinkClass} ${activeLinkClass}` : baseLinkClass
              }
            >
              <FiGrid />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? `${baseLinkClass} ${activeLinkClass}` : baseLinkClass
              }
            >
              <FiUser />
              <span>Perfiles</span>
            </NavLink>
          </>
        ) : null}
        {user?.role === "user" ? (
          <NavLink
            to="/landing"
            className={({ isActive }) =>
              isActive ? `${baseLinkClass} ${activeLinkClass}` : baseLinkClass
            }
          >
            <FiUser />
            <span>Landing</span>
          </NavLink>
        ) : null}
      </nav>
    </aside>
  );
}
