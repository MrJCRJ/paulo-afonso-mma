import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Seo from "@/components/Seo";

export default function Login({ redirectAfter }) {
  const { loginAs } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const enter = async (role) => {
    const user = await loginAs(role);
    const from = redirectAfter || location.state?.from;
    navigate(from && from !== "/login" ? from : user.role === "admin" ? "/admin" : "/area-do-aluno");
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
          <img src="/logo.jpg" alt="" className="mx-auto h-20 w-20 rounded-full object-cover ring-1 ring-tiger/50" />
          <h1 className="mt-4 font-display text-4xl uppercase tracking-wide text-zinc-50">Área restrita</h1>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-tiger">Demo local — sem Google / backend</p>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Nesta v1 o login é só para preview das telas de aluno e admin. Dados ficam no seu navegador.
        </p>

        <div className="mt-8 grid gap-3">
          <button
            type="button"
            onClick={() => enter("student")}
            className="inline-flex items-center justify-center gap-2 bg-tiger py-3.5 text-sm font-bold uppercase tracking-wider text-onyx hover:bg-orange-400"
          >
            <User size={16} /> Entrar como aluno (demo)
          </button>
          <button
            type="button"
            onClick={() => enter("admin")}
            className="inline-flex items-center justify-center gap-2 border border-zinc-600 py-3.5 text-sm font-bold uppercase tracking-wider text-zinc-100 hover:border-tiger hover:text-tiger"
          >
            <Shield size={16} /> Entrar como admin (demo)
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-500">
          Ainda não treina?{" "}
          <Link to="/matriculas" className="font-bold text-tiger hover:text-orange-300">
            Faça sua matrícula
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
