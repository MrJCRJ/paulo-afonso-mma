import { motion } from "framer-motion";
import { CalendarDays, MapPin, Newspaper } from "lucide-react";
import { demoStore } from "@/lib/demoStore";
import { Reveal, Eyebrow, SectionTitle } from "@/components/Reveal";
import Seo from "@/components/Seo";

const fmtDate = (iso) =>
  iso
    ? new Date(`${iso}T12:00:00`)
        .toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short", year: "numeric" })
        .toUpperCase()
    : "Data a confirmar";

export default function Eventos() {
  const posts = demoStore.getPosts();
  const events = posts.filter((p) => p.type === "event");
  const news = posts.filter((p) => p.type === "news");

  return (
    <div className="min-h-screen bg-onyx px-4 pb-24 pt-28 sm:px-8 lg:px-12">
      <Seo title="Eventos" />
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow>Agenda e novidades</Eyebrow>
          <SectionTitle className="mt-3">Eventos & Notícias</SectionTitle>
        </Reveal>

        <section className="mt-12">
          <h3 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.24em] text-tiger">
            <CalendarDays size={14} aria-hidden /> Próximos eventos
          </h3>
          {events.length === 0 ? (
            <div className="mt-6 border border-dashed border-zinc-800 p-12 text-center">
              <p className="font-display text-3xl uppercase text-zinc-300">Agenda em preparação</p>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {events.map((e, i) => (
                <motion.article
                  key={e.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group overflow-hidden border border-zinc-800/80 bg-[#121215] transition-colors hover:border-tiger/50"
                >
                  {e.image_url && (
                    <div className="relative h-44 overflow-hidden">
                      <img src={e.image_url} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121215] to-transparent" />
                      <span className="absolute left-4 top-4 bg-tiger px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-onyx">
                        {fmtDate(e.date)}
                      </span>
                    </div>
                  )}
                  <div className="p-6">
                    {!e.image_url && <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-tiger">{fmtDate(e.date)}</p>}
                    <h4 className="mt-2 font-display text-3xl uppercase tracking-wide text-zinc-50 group-hover:text-tiger">{e.title}</h4>
                    {e.location && (
                      <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-zinc-500">
                        <MapPin size={12} className="text-tiger" aria-hidden /> {e.location}
                      </p>
                    )}
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">{e.body}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </section>

        <section className="mt-16">
          <h3 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.24em] text-tiger">
            <Newspaper size={14} aria-hidden /> Notícias da equipe
          </h3>
          {news.length === 0 ? (
            <div className="mt-6 border border-dashed border-zinc-800 p-12 text-center">
              <p className="font-display text-3xl uppercase text-zinc-300">Sem notícias no momento</p>
            </div>
          ) : (
            <div className="mt-6 divide-y divide-zinc-800/80 border border-zinc-800/80">
              {news.map((n, i) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="grid gap-4 p-6 sm:grid-cols-[180px_1fr] sm:items-center"
                >
                  {n.image_url ? (
                    <img src={n.image_url} alt="" className="h-28 w-full border border-zinc-800 object-cover" loading="lazy" />
                  ) : (
                    <div className="h-28 w-full border border-zinc-800 bg-onyx" />
                  )}
                  <div>
                    <h4 className="font-display text-2xl uppercase tracking-wide text-zinc-50">{n.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{n.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
