import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { useAuthActions } from "../../hooks/useAuth";
import type { ReactNode } from "react";

interface AppLayoutProps {
  title: string;
  children: ReactNode;
}

export function AppLayout({ title, children }: AppLayoutProps) {
  const { logout } = useAuthActions();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="grid min-h-screen bg-[radial-gradient(circle_at_top_right,#12203a,#06080f_45%)] text-slate-50 lg:grid-cols-[250px_1fr]">
      <Sidebar />
      <section className="grid grid-rows-[auto_1fr]">
        <Navbar title={title} onLogout={handleLogout} />
        <main className="p-5">{children}</main>
      </section>
    </div>
  );
}
