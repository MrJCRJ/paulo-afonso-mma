import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { LOGO_NAV } from "@/lib/siteConfig";
import Seo from "@/components/Seo";

export default function Login({ redirectAfter }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const user = await login(email, password);
      const from = redirectAfter || location.state?.from;
      navigate(from && from !== "/login" ? from : user.role === "admin" ? "/admin" : "/area-do-aluno");
    } catch (err) {
      setError(err?.message || "Não foi possível entrar.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-onyx px-4 py-28">
      <Seo title="Entrar" />
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md border border-zinc-800/80 bg-[#121215] p-8 sm:p-10"
      >
        <div className="text-center">
          <img src={LOGO_NAV} alt="" className="mx-auto h-20 w-20 rounded-full object-cover ring-1 ring-tiger/50" />
          <h1 className="mt-4 font-display text-4xl uppercase tracking-wide text-zinc-50">Entrar</h1>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-tiger">Área do aluno e equipe</p>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <input
            required
            type="email"
            className="field"
            placeholder="E-mail"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            className="field"
            placeholder="Senha"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-center text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center bg-tiger py-3.5 text-sm font-bold uppercase tracking-wider text-onyx transition-colors hover:bg-orange-400 disabled:opacity-60"
          >
            {busy ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-zinc-500">
          Ainda não tem cadastro?{" "}
          <Link to="/matriculas" className="font-bold text-tiger hover:text-orange-300">
            Faça sua matrícula
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
