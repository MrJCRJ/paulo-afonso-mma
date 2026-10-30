import { Link } from "react-router-dom";
import { ArrowRight, Medal, ReceiptText } from "lucide-react";
import { MUAY_THAI_GRADES, RANK_COLORS, SITE, getGrade, gradeLabel } from "@/lib/siteConfig";
import { demoStore } from "@/lib/demoStore";
import { useAuth } from "@/context/AuthContext";
import { Reveal, RankChip } from "@/components/Reveal";
import Seo from "@/components/Seo";

const fmtMoney = (v) => `R$ ${Number(v).toFixed(2).replace(".", ",")}`;
const fmtDate = (iso) => (iso ? new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR") : "");

export default function AreaDoAluno() {
  const { user } = useAuth();
  const graduations = demoStore
    .getGraduations()
    .filter((g) => g.student_email === user?.email || g.student_name === user?.name)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  const payments = demoStore.getPayments();
  const current = graduations[0];
  const grade = current ? getGrade(current.rank) || getGrade(current.faixa) : null;
  const rankIdx = grade ? MUAY_THAI_GRADES.findIndex((g) => g.id === grade.id) : -1;
  const next = rankIdx >= 0 && rankIdx < MUAY_THAI_GRADES.length - 1 ? MUAY_THAI_GRADES[rankIdx + 1] : null;
  const progress = rankIdx >= 0 ? ((rankIdx + 1) / MUAY_THAI_GRADES.length) * 100 : 8;

  return (
    <div className="min-h-screen bg-onyx px-4 pb-24 pt-28 sm:px-8 lg:px-12">
      <Seo title="Área do aluno" />
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-tiger">Área do aluno · demo</p>
            <h1 className="mt-2 font-display text-5xl uppercase tracking-wide text-zinc-50 sm:text-6xl">
              E aí, {user?.name?.split(" ")[0]}!
            </h1>
          </div>
          <Link
            to="/pagamentos"
            className="inline-flex items-center gap-2 bg-tiger px-6 py-3 text-xs font-bold uppercase tracking-wider text-onyx hover:bg-orange-400"
          >
            Ver Pix / planos <ArrowRight size={14} />
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="grain relative overflow-hidden border border-tiger/40 bg-gradient-to-br from-[#18181B] to-[#0C0C0F] p-8">
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <img src="/logo.jpg" alt="" className="h-14 w-14 rounded-full object-cover ring-1 ring-tiger/50" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-tiger">Carteira do atleta</span>
                </div>
                <p className="mt-8 font-display text-4xl uppercase tracking-wide text-zinc-50">{user?.name}</p>
                <p className="mt-1 font-mono text-xs text-zinc-500">{user?.email}</p>
                <div className="mt-6 flex items-center justify-between border-t border-zinc-800/80 pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{SITE.team}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Desde {SITE.founded}</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between border border-zinc-800/80 bg-[#121215] p-8">
              <div>
                <h3 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.24em] text-tiger">
                  <Medal size={14} aria-hidden /> Graduação atual
                </h3>
                {current ? (
                  <>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <RankChip
                        rank={current.faixa || grade?.faixa}
                        grau={current.grau ?? grade?.grau}
                        label={grade?.label}
                        nivel={current.nivel || grade?.nivel}
                        colors={RANK_COLORS[current.rank] || (grade && { bg: grade.bg, fg: grade.fg, tips: grade.tips })}
                      />
                      <span className="text-sm text-zinc-500">{current.modality}</span>
                    </div>
                    <p className="mt-3 text-xs text-zinc-500">Última graduação em {fmtDate(current.date)}</p>
                    <div className="mt-6">
                      <div className="flex justify-between font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                        <span>{gradeLabel({ faixa: current.faixa || grade?.faixa, grau: current.grau ?? grade?.grau })}</span>
                        <span>{next ? gradeLabel(next) : "Topo da pirâmide"}</span>
                      </div>
                      <div className="mt-2 h-2 bg-zinc-800">
                        <div className="h-full bg-tiger transition-all duration-700" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="mt-5 text-sm text-zinc-400">Nenhuma graduação registrada ainda.</p>
                )}
              </div>
              <Link to="/graduacoes" className="mt-6 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-tiger hover:text-orange-300">
                Ver mural completo <ArrowRight size={13} />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-8 border border-zinc-800/80 bg-[#121215] p-6 sm:p-8">
          <h3 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.24em] text-tiger">
            <ReceiptText size={14} aria-hidden /> Histórico de pagamentos (local)
          </h3>
          {payments.length === 0 ? (
            <p className="mt-6 border border-dashed border-zinc-800 p-8 text-center text-sm text-zinc-500">Nenhum pagamento demo.</p>
          ) : (
            <div className="mt-5 divide-y divide-zinc-800/80 border border-zinc-800/80">
              {payments.map((p) => (
                <div key={p.id} className="grid grid-cols-2 gap-2 p-4 text-sm sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-center">
                  <span className="font-mono font-bold text-zinc-100">{p.month}</span>
                  <span className="text-zinc-300">{fmtMoney(p.amount)}</span>
                  <span className="hidden font-mono text-xs text-zinc-500 sm:block">{p.receipt_ref || "—"}</span>
                  <span
                    className={`justify-self-end px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.15em] ${
                      p.status === "confirmed"
                        ? "border border-green-500/40 bg-green-500/15 text-green-400"
                        : "border border-amber-500/40 bg-amber-500/15 text-amber-400"
                    }`}
                  >
                    {p.status === "confirmed" ? "Confirmado" : "Aguardando"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
