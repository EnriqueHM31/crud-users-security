import { FiGrid, FiUser } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useAuthenticatedUser } from "../../hooks/useUsersStore";
import { ROLES } from "../../config/routes";

export function Sidebar() {
    const user = useAuthenticatedUser();
    if (user === null) return null;
    const { rol } = user;
    const ClassCSSNormal =
        "inline-flex items-center gap-2 rounded-lg border border-transparent px-3 py-2.5 text-slate-300 transition hover:border-slate-700 hover:bg-slate-900 hover:text-slate-50";
    const ClassCSSActive = "border-slate-700 bg-slate-900 text-slate-50";

    return (
        <aside className="border-b border-slate-800 bg-slate-950/95 p-4 lg:border-r lg:border-b-0">
            <div className="mb-6 inline-flex items-center gap-2 text-lg font-bold">
                <img src="/logo.png" alt="Logo" className="h-8 w-8" />
                <span>Sistema de Seguridad</span>
            </div>

            <nav className="grid gap-2">
                {rol === ROLES.ADMIN && (
                    <>
                        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? `${ClassCSSNormal} ${ClassCSSActive}` : ClassCSSNormal)}>
                            <FiGrid />
                            <span>Dashboard</span>
                        </NavLink>

                        <NavLink to="/profile" className={({ isActive }) => (isActive ? `${ClassCSSNormal} ${ClassCSSActive}` : ClassCSSNormal)}>
                            <FiUser />
                            <span>Perfil</span>
                        </NavLink>
                    </>
                )}
                {rol === ROLES.USER && (
                    <>
                        <NavLink to="/landing" className={({ isActive }) => (isActive ? `${ClassCSSNormal} ${ClassCSSActive}` : ClassCSSNormal)}>
                            <FiGrid />
                            <span>Landing</span>
                        </NavLink>

                        <NavLink to="/profile" className={({ isActive }) => (isActive ? `${ClassCSSNormal} ${ClassCSSActive}` : ClassCSSNormal)}>
                            <FiUser />
                            <span>Perfil</span>
                        </NavLink>
                    </>
                )}
            </nav>
        </aside>
    );
}
