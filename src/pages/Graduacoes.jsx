import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Award, Search } from "lucide-react";
import {
  MUAY_THAI_GRADES,
  NIVEIS,
  RANK_COLORS,
  GRADUATION_HISTORY,
  getGrade,
  gradeLabel,
} from "@/lib/siteConfig";
import { demoStore } from "@/lib/demoStore";
import { Reveal, Eyebrow, SectionTitle, RankChip } from "@/components/Reveal";
import Seo from "@/components/Seo";

const fmtDate = (iso) =>
  iso ? new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }) : "";

function resolveGrade(entry) {
  const g = getGrade(entry.rank) || getGrade(entry.faixa);
  return {
    id: entry.rank || g?.id,
    faixa: entry.faixa || g?.faixa || entry.rank,
    grau: entry.grau ?? g?.grau ?? null,
    nivel: entry.nivel || g?.nivel || "—",
    khan: g?.khan,
    colors: RANK_COLORS[entry.rank] || (g ? { bg: g.bg, fg: g.fg, tip: g.tip } : null),
  };
}

export default function Graduacoes() {
  const data = demoStore.getGraduations();
  const [search, setSearch] = useState("");

  const groups = useMemo(() => {
    const map = new Map();
    for (const g of data) {
      const key = (g.student_name || "—").trim();
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(g);
    }
    return [...map.entries()]
      .map(([name, list]) => {
        const sorted = [...list].sort((a, b) => (a.date || "").localeCompare(b.date || ""));
        return { name, current: sorted[sorted.length - 1], history: sorted.reverse() };
      })
      .filter((g) => g.name.toLowerCase().includes(search.trim().toLowerCase()))
      .sort((a, b) => (b.current?.date || "").localeCompare(a.current?.date || ""));
  }, [data, search]);

  return (
    <div className="min-h-screen bg-onyx px-4 pb-24 pt-28 sm:px-8 lg:px-12">
      <Seo
        title="Graduação Muay Thai — Prajied"
        description="Quadro KRUANG / PRAJIED: Khan, cor do prajied, grau e nível no PA FIGHT TEAM."
      />
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow>Muay Thai · KRUANG / PRAJIED</Eyebrow>
          <SectionTitle className="mt-3">Graduação no braço</SectionTitle>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
            O nome correto é <strong className="text-zinc-100">Prajied</strong> (corda no bíceps). No Brasil o quadro
            costuma aparecer como <strong className="text-zinc-100">Kruang / Prajied</strong>. Cada etapa é um{" "}
            <strong className="text-zinc-100">Khan</strong>, com cor, grau (segunda cor) e nível.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <article className="mt-10 border border-zinc-800/80 bg-[#121215] p-6 sm:p-8">
            <Eyebrow>{GRADUATION_HISTORY.title}</Eyebrow>
            <p className="mt-3 text-sm font-semibold text-zinc-100">{GRADUATION_HISTORY.lead}</p>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-400">
              {GRADUATION_HISTORY.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12">
            <Eyebrow>Quadro completo · 16 Khan</Eyebrow>
            <div className="mt-4 overflow-x-auto border border-zinc-800/80">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[#0C0C0F] font-mono text-[10px] uppercase tracking-[0.18em] text-tiger">
                  <tr>
                    <th className="px-4 py-3">Khan</th>
                    <th className="px-4 py-3">Prajied</th>
                    <th className="px-4 py-3">Grau</th>
                    <th className="px-4 py-3">Nível</th>
                    <th className="px-4 py-3">Tempo ref.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80">
                  {MUAY_THAI_GRADES.map((g) => (
                    <tr key={g.id} className="bg-[#121215]/hover:bg-tiger/5">
                      <td className="px-4 py-3 font-mono text-xs text-zinc-400">{g.khan}</td>
                      <td className="px-4 py-3">
                        <RankChip rank={g.faixa} grau={g.grau ? `e ${g.grau}` : null} colors={{ bg: g.bg, fg: g.fg, tip: g.tip }} />
                      </td>
                      <td className="px-4 py-3 text-zinc-300">{g.grau || "—"}</td>
                      <td className="px-4 py-3 font-semibold text-zinc-100">{g.nivel}</td>
                      <td className="px-4 py-3 font-mono text-xs text-zinc-500">{g.tempo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              Referência tradicional IFMA/CBMTT — confirme na academia se o quadro do cliente diferir
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 space-y-5">
            <Eyebrow>Por nível</Eyebrow>
            {NIVEIS.map((nivel) => {
              const grades = MUAY_THAI_GRADES.filter((g) => g.nivel === nivel);
              if (!grades.length) return null;
              return (
                <div key={nivel}>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-tiger">{nivel}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {grades.map((g) => (
                      <RankChip
                        key={g.id}
                        rank={g.faixa}
                        grau={g.grau ? `e ${g.grau}` : null}
                        nivel={g.nivel}
                        colors={{ bg: g.bg, fg: g.fg, tip: g.tip }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <div className="relative mt-12 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" aria-hidden />
          <input
            className="field pl-11"
            placeholder="Buscar aluno pelo nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar aluno"
          />
        </div>

        {groups.length === 0 ? (
          <div className="mt-16 border border-dashed border-zinc-800 p-14 text-center">
            <Award size={40} className="mx-auto text-zinc-600" />
            <p className="mt-4 font-display text-3xl uppercase text-zinc-300">Nenhum aluno encontrado</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((g, i) => {
              const cur = resolveGrade(g.current || {});
              const order = MUAY_THAI_GRADES.findIndex((x) => x.id === cur.id);
              return (
                <motion.article
                  key={g.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.55, delay: (i % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-full flex-col border border-zinc-800/80 bg-[#121215] p-6 transition-colors hover:border-tiger/50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-3xl uppercase tracking-wide text-zinc-50">{g.name}</h3>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                        {g.current?.modality || "Muay Thai"}
                        {cur.khan ? ` · ${cur.khan}` : ""}
                      </p>
                    </div>
                    <div
                      className="flex h-14 w-14 flex-none items-center justify-center rounded-full border-4 font-display text-xl"
                      style={{ borderColor: cur.colors?.bg || "#e4e4e7", color: cur.colors?.bg || "#e4e4e7" }}
                    >
                      {order >= 0 ? order + 1 : "—"}
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Prajied atual</p>
                      <div className="mt-2">
                        <RankChip
                          rank={cur.faixa}
                          grau={cur.grau ? `e ${cur.grau}` : null}
                          nivel={cur.nivel}
                          colors={cur.colors}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 border border-zinc-800/80 p-3 text-center">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">Prajied</p>
                        <p className="mt-1 text-xs font-bold text-zinc-100">{cur.faixa}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">Grau</p>
                        <p className="mt-1 text-xs font-bold text-zinc-100">{cur.grau || "—"}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">Nível</p>
                        <p className="mt-1 text-xs font-bold text-tiger">{cur.nivel}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 border-t border-zinc-800/80 pt-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Histórico</p>
                    <ul className="mt-2 space-y-1.5">
                      {g.history.map((h) => {
                        const hg = resolveGrade(h);
                        return (
                          <li key={h.id} className="flex items-center justify-between gap-2 text-xs text-zinc-400">
                            <span className="text-zinc-300">{gradeLabel({ faixa: hg.faixa, grau: hg.grau })}</span>
                            <span className="shrink-0">{fmtDate(h.date)}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  {g.history[0]?.notes && (
                    <p className="mt-4 border-l-2 border-tiger/60 pl-3 text-xs italic text-zinc-500">&quot;{g.history[0].notes}&quot;</p>
                  )}
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
