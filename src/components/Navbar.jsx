import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { SITE } from "@/lib/siteConfig";
import LogoMedallion from "@/components/LogoMedallion";

const links = [
  { to: "/", label: "Início" },
  { to: "/matriculas", label: "Matrículas" },
  { to: "/graduacoes", label: "Graduações" },
  { to: "/galeria", label: "Galeria" },
  { to: "/eventos", label: "Eventos" },
  { to: "/pagamentos", label: "Pagamentos" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <header className="glass fixed inset-x-0 top-0 z-50 border-b border-zinc-800/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12">
        <Link to="/" className="flex items-center gap-3" aria-label={`${SITE.name} — início`}>
          <LogoMedallion variant="nav" />
          <div className="leading-none">
            <span className="font-display text-xl tracking-widest text-zinc-50">PA FIGHT TEAM</span>
            <span className="block font-mono text-[9px] uppercase tracking-[0.24em] text-tiger">Muay Thai & Boxe</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-[13px] font-semibold uppercase tracking-wider transition-colors duration-300 ${
                  isActive ? "text-tiger" : "text-zinc-400 hover:text-zinc-50"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {!loading && user ? (
            <>
              <Link
                to={user.role === "admin" ? "/admin" : "/area-do-aluno"}
                className="inline-flex items-center gap-2 border border-zinc-700 px-4 py-2 text-[12px] font-bold uppercase tracking-wider text-zinc-100 transition-colors hover:border-tiger hover:text-tiger"
              >
                {user.role === "admin" ? <LayoutDashboard size={14} /> : <User size={14} />}
                {user.role === "admin" ? "Painel" : "Área do Aluno"}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-2 text-[12px] font-semibold uppercase tracking-wider text-zinc-500 transition-colors hover:text-tiger"
              >
                <LogOut size={14} /> Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-[12px] font-bold uppercase tracking-wider text-zinc-300 transition-colors hover:text-tiger">
                Entrar
              </Link>
              <Link
                to="/matriculas"
                className="bg-tiger px-5 py-2.5 text-[12px] font-bold uppercase tracking-wider text-onyx transition-all duration-300 hover:bg-orange-400 hover:shadow-[0_0_24px_rgba(249,115,22,0.45)]"
              >
                Matricule-se
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="text-zinc-200 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="glass border-t border-zinc-800/80 px-4 pb-6 pt-2 lg:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block border-b border-zinc-800/60 py-3 text-sm font-semibold uppercase tracking-wider ${isActive ? "text-tiger" : "text-zinc-300"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="flex gap-3 pt-4">
            {!loading && user ? (
              <>
                <Link
                  to={user.role === "admin" ? "/admin" : "/area-do-aluno"}
                  onClick={() => setOpen(false)}
                  className="flex-1 border border-zinc-700 py-2.5 text-center text-[12px] font-bold uppercase tracking-wider text-zinc-100"
                >
                  {user.role === "admin" ? "Painel" : "Área do Aluno"}
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="border border-zinc-700 px-4 text-[12px] font-bold uppercase tracking-wider text-zinc-400"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 border border-zinc-700 py-2.5 text-center text-[12px] font-bold uppercase tracking-wider text-zinc-100"
                >
                  Entrar
                </Link>
                <Link
                  to="/matriculas"
                  onClick={() => setOpen(false)}
                  className="flex-1 bg-tiger py-2.5 text-center text-[12px] font-bold uppercase tracking-wider text-onyx"
                >
                  Matricule-se
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
