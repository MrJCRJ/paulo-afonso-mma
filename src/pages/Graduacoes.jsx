import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Award, Search } from "lucide-react";
import { RANKS, RANK_COLORS } from "@/lib/siteConfig";
import { demoStore } from "@/lib/demoStore";
import { Reveal, Eyebrow, SectionTitle, RankChip } from "@/components/Reveal";
import Seo from "@/components/Seo";

const fmtDate = (iso) =>
  iso ? new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }) : "";

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
      <Seo title="Graduações" />
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow>Mural de graduações</Eyebrow>
          <SectionTitle className="mt-3">Cada fita, uma história</SectionTitle>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2">
            {RANKS.map((r) => (
              <RankChip key={r} rank={r} colors={RANK_COLORS[r]} />
            ))}
          </div>
        </Reveal>

        <div className="relative mt-8 max-w-md">
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
            {groups.map((g, i) => (
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
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{g.current?.modality}</p>
                  </div>
                  <div
                    className="flex h-14 w-14 flex-none items-center justify-center rounded-full border-4 font-display text-xl"
                    style={{
                      borderColor: RANK_COLORS[g.current?.rank]?.bg || "#e4e4e7",
                      color: RANK_COLORS[g.current?.rank]?.bg || "#e4e4e7",
                    }}
                  >
                    {RANKS.indexOf(g.current?.rank) + 1}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Graduação atual</p>
                  <div className="mt-2">
                    <RankChip rank={g.current?.rank} colors={RANK_COLORS[g.current?.rank]} />
                  </div>
                </div>
                <div className="mt-5 border-t border-zinc-800/80 pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Histórico</p>
                  <ul className="mt-2 space-y-1.5">
                    {g.history.map((h) => (
                      <li key={h.id} className="flex items-center justify-between text-xs text-zinc-400">
                        <span className="text-zinc-300">{h.rank}</span>
                        <span>{fmtDate(h.date)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {g.history[0]?.notes && (
                  <p className="mt-4 border-l-2 border-tiger/60 pl-3 text-xs italic text-zinc-500">&quot;{g.history[0].notes}&quot;</p>
                )}
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
