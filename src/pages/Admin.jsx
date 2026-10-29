import { useState } from "react";
import { RefreshCw, Users, Wallet, GraduationCap, CalendarClock } from "lucide-react";
import { demoStore } from "@/lib/demoStore";
import { Reveal } from "@/components/Reveal";
import Seo from "@/components/Seo";

const fmtMoney = (v) => `R$ ${Number(v).toFixed(2).replace(".", ",")}`;

export default function Admin() {
  const [tick, setTick] = useState(0);
  const refresh = () => setTick((t) => t + 1);
  void tick;

  const enrollments = demoStore.getEnrollments();
  const payments = demoStore.getPayments();
  const graduations = demoStore.getGraduations();
  const posts = demoStore.getPosts();

  const pendingPayments = payments.filter((p) => p.status !== "confirmed").length;

  const resetDemo = () => {
    demoStore.reset();
    refresh();
  };

  const confirmPayment = (id) => {
    const next = payments.map((p) => (p.id === id ? { ...p, status: "confirmed" } : p));
    demoStore.setPayments(next);
    refresh();
  };

  return (
    <div className="min-h-screen bg-onyx px-4 pb-24 pt-28 sm:px-8 lg:px-12">
      <Seo title="Admin" />
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-tiger">Comissão técnica · demo enxuta</p>
            <h1 className="mt-2 font-display text-5xl uppercase tracking-wide text-zinc-50 sm:text-6xl">Painel da equipe</h1>
            <p className="mt-3 max-w-xl text-sm text-zinc-400">
              Sem backend: só leitura/edição local para preview. Matrículas reais vão pelo WhatsApp.
            </p>
          </div>
          <button
            type="button"
            onClick={resetDemo}
            className="inline-flex items-center gap-2 border border-zinc-700 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-zinc-300 hover:border-tiger hover:text-tiger"
          >
            <RefreshCw size={14} /> Resetar dados demo
          </button>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Matrículas (local)", value: enrollments.length, icon: Users },
            { label: "Pagamentos pendentes", value: pendingPayments, icon: Wallet },
            { label: "Graduações no mural", value: graduations.length, icon: GraduationCap },
            { label: "Posts / eventos", value: posts.length, icon: CalendarClock },
          ].map((s) => (
            <div key={s.label} className="border border-zinc-800/80 bg-[#121215] p-5">
              <s.icon size={18} className="text-tiger" aria-hidden />
              <p className="mt-3 font-display text-4xl text-zinc-50">{s.value}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">{s.label}</p>
            </div>
          ))}
        </div>

        <section className="mt-10 border border-zinc-800/80 bg-[#121215] p-6">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-tiger">Matrículas recebidas no navegador</h2>
          {enrollments.length === 0 ? (
            <p className="mt-4 text-sm text-zinc-500">Nenhuma ainda. Envie pelo formulário de matrículas.</p>
          ) : (
            <ul className="mt-4 divide-y divide-zinc-800/80 border border-zinc-800/80">
              {enrollments.map((e) => (
                <li key={e.id} className="grid gap-1 p-4 text-sm sm:grid-cols-[1.2fr_1fr_1fr_auto]">
                  <span className="font-bold text-zinc-100">{e.name}</span>
                  <span className="text-zinc-400">{e.modality}</span>
                  <span className="text-zinc-400">{e.plan}</span>
                  <span className="font-mono text-[10px] text-tiger">{e.id}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-6 border border-zinc-800/80 bg-[#121215] p-6">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-tiger">Pagamentos demo</h2>
          <ul className="mt-4 divide-y divide-zinc-800/80 border border-zinc-800/80">
            {payments.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm">
                <span className="font-mono text-zinc-100">
                  {p.month} · {fmtMoney(p.amount)}
                </span>
                <div className="flex items-center gap-3">
                  <span className={p.status === "confirmed" ? "text-green-400" : "text-amber-400"}>
                    {p.status === "confirmed" ? "Confirmado" : "Aguardando"}
                  </span>
                  {p.status !== "confirmed" && (
                    <button
                      type="button"
                      onClick={() => confirmPayment(p.id)}
                      className="border border-zinc-700 px-3 py-1 text-[10px] font-bold uppercase tracking-wider hover:border-tiger hover:text-tiger"
                    >
                      Confirmar
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
