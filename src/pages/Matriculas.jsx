import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Dumbbell, HeartPulse, UserRound } from "lucide-react";
import { PLANS, SITE } from "@/lib/siteConfig";
import { enrollmentMessage, openWhatsApp } from "@/lib/whatsapp";
import { demoStore } from "@/lib/demoStore";
import { useAuth } from "@/context/AuthContext";
import { Reveal, Eyebrow, SectionTitle } from "@/components/Reveal";
import Seo from "@/components/Seo";

const MODALITIES = ["Muay Thai", "Boxe", "Combo (Muay Thai + Boxe)"];
const LEVELS = ["Iniciante (nunca treinei)", "Já treinei antes", "Atleta / competitivo"];

const Step = ({ icon: Icon, title, children }) => (
  <div>
    <div className="mb-4 flex items-center gap-2">
      <Icon size={16} className="text-tiger" aria-hidden />
      <h3 className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-zinc-400">{title}</h3>
    </div>
    {children}
  </div>
);

export default function Matriculas() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    birth_date: "",
    password: "",
    password2: "",
    modality: "Muay Thai",
    plan: "Mensal",
    experience: LEVELS[0],
    health: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.password2) {
      setError("As senhas não coincidem.");
      return;
    }
    setBusy(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
      });
      const code = `PAFT-${Date.now().toString(36).toUpperCase()}`;
      const { password, password2, ...publicForm } = form;
      const enrollment = {
        id: code,
        ...publicForm,
        status: "pending",
        created_at: new Date().toISOString(),
      };
      const list = demoStore.getEnrollments();
      demoStore.setEnrollments([enrollment, ...list]);
      openWhatsApp(enrollmentMessage(publicForm));
      setResult({ code });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err?.message || "Não foi possível concluir o cadastro.");
    } finally {
      setBusy(false);
    }
  };

  if (result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-onyx px-4 pt-16">
        <Seo title="Matrícula enviada" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-lg border border-tiger/50 bg-[#121215] p-8 text-center sm:p-12"
        >
          <CheckCircle2 size={56} className="mx-auto text-tiger" />
          <h1 className="mt-5 font-display text-5xl uppercase tracking-wide text-zinc-50">Cadastro criado!</h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Abrimos o WhatsApp com seus dados, <strong className="text-zinc-100">{form.name.split(" ")[0]}</strong>.
            Confirme o envio da mensagem. Sua conta já está pronta — entre com o e-mail e a senha que cadastrou.
          </p>
          <div className="mt-6 border border-dashed border-zinc-700 bg-onyx p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">Código de referência</p>
            <p className="mt-1 font-mono text-2xl font-bold tracking-wider text-tiger">{result.code}</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 bg-tiger px-6 py-3 text-xs font-bold uppercase tracking-wider text-onyx hover:bg-orange-400"
            >
              Entrar <ArrowRight size={14} />
            </Link>
            <Link
              to="/area-do-aluno"
              className="inline-flex items-center justify-center border border-zinc-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-zinc-100 hover:border-tiger hover:text-tiger"
            >
              Área do aluno
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-onyx px-4 pb-24 pt-28 sm:px-8 lg:px-12">
      <Seo title="Matrículas" description={`Matricule-se no ${SITE.name}. Crie sua conta e envie no WhatsApp.`} />
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Eyebrow>Matrículas abertas</Eyebrow>
          <SectionTitle className="mt-3">Entre para o bando</SectionTitle>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            Crie sua conta, escolha modalidade/plano e envie no WhatsApp do {SITE.name}. Depois entre em{" "}
            <Link to="/login" className="text-tiger hover:text-orange-300">
              Entrar
            </Link>{" "}
            com o mesmo e-mail e senha.
          </p>
        </Reveal>

        <form onSubmit={submit} className="mt-10 space-y-8 border border-zinc-800/80 bg-[#121215] p-6 sm:p-10">
          <Step icon={UserRound} title="1. Seus dados e acesso">
            <div className="grid gap-4 sm:grid-cols-2">
              <input required className="field" placeholder="Nome completo" value={form.name} onChange={(e) => set("name", e.target.value)} />
              <input required type="email" className="field" placeholder="E-mail" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
              <input required className="field" placeholder="WhatsApp / Telefone" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              <input type="date" className="field text-zinc-400" value={form.birth_date} onChange={(e) => set("birth_date", e.target.value)} />
              <input
                required
                type="password"
                className="field"
                placeholder="Senha (mín. 6)"
                autoComplete="new-password"
                minLength={6}
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
              />
              <input
                required
                type="password"
                className="field"
                placeholder="Confirmar senha"
                autoComplete="new-password"
                minLength={6}
                value={form.password2}
                onChange={(e) => set("password2", e.target.value)}
              />
            </div>
          </Step>

          <Step icon={Dumbbell} title="2. Modalidade">
            <div className="grid gap-3 sm:grid-cols-3">
              {MODALITIES.map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => set("modality", m)}
                  className={`border p-4 text-left text-sm font-bold uppercase tracking-wide transition-all duration-300 ${
                    form.modality === m ? "border-tiger bg-tiger/10 text-tiger" : "border-zinc-800 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </Step>

          <Step icon={HeartPulse} title="3. Plano">
            <div className="grid gap-3 sm:grid-cols-3">
              {PLANS.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => set("plan", p.id)}
                  className={`relative border p-4 text-left transition-all duration-300 ${
                    form.plan === p.id ? "border-tiger bg-tiger/10" : "border-zinc-800 hover:border-zinc-600"
                  }`}
                >
                  {p.highlight && (
                    <span className="absolute -top-2 right-3 bg-tiger px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-onyx">
                      Mais escolhido
                    </span>
                  )}
                  <p className={`font-display text-2xl ${form.plan === p.id ? "text-tiger" : "text-zinc-100"}`}>{p.name}</p>
                  <p className="text-sm text-zinc-400">
                    R$ {p.price} {p.period}
                  </p>
                </button>
              ))}
            </div>
          </Step>

          <Step icon={UserRound} title="4. Sobre você">
            <div className="grid gap-4">
              <select className="field" value={form.experience} onChange={(e) => set("experience", e.target.value)}>
                {LEVELS.map((l) => (
                  <option key={l} value={l} className="bg-zinc-900">
                    {l}
                  </option>
                ))}
              </select>
              <textarea
                className="field min-h-24"
                placeholder="Restrições de saúde, lesões ou observações (opcional)"
                value={form.health}
                onChange={(e) => set("health", e.target.value)}
              />
            </div>
          </Step>

          {error && <p className="text-center text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 bg-tiger py-4 text-sm font-bold uppercase tracking-wider text-onyx transition-all duration-300 hover:bg-orange-400 disabled:opacity-60"
          >
            {busy ? "Cadastrando…" : (
              <>
                Criar conta e enviar no WhatsApp <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
