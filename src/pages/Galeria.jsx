import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { demoStore } from "@/lib/demoStore";
import { Reveal, Eyebrow, SectionTitle } from "@/components/Reveal";
import Seo from "@/components/Seo";

const CATEGORIES = ["Todos", "Treinos", "Graduações", "Eventos", "Torneios"];

export default function Galeria() {
  const photos = demoStore.getGallery();
  const [cat, setCat] = useState("Todos");
  const [lightbox, setLightbox] = useState(null);
  const filtered = useMemo(() => (cat === "Todos" ? photos : photos.filter((p) => p.category === cat)), [photos, cat]);

  return (
    <div className="min-h-screen bg-onyx px-4 pb-24 pt-28 sm:px-8 lg:px-12">
      <Seo title="Galeria" />
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow>Galeria da equipe</Eyebrow>
          <SectionTitle className="mt-3">
            Sujeira de treino,
            <br />
            orgulho de campeão
          </SectionTitle>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filtros da galeria">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`border px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                cat === c ? "border-tiger bg-tiger text-onyx" : "border-zinc-800 text-zinc-400 hover:border-tiger/60 hover:text-zinc-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 border border-dashed border-zinc-800 p-14 text-center">
            <p className="font-display text-3xl uppercase text-zinc-300">Nenhuma foto por aqui ainda</p>
          </div>
        ) : (
          <div className="mt-10 columns-2 gap-4 lg:columns-3 xl:columns-4">
            {filtered.map((p, i) => (
              <motion.button
                key={p.id}
                type="button"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, delay: (i % 8) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setLightbox(p)}
                className="group mb-4 block w-full break-inside-avoid border border-zinc-800/80 text-left transition-colors hover:border-tiger/60"
              >
                <img src={p.url} alt={p.title} className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                <div className="flex items-center justify-between p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-300">{p.title}</p>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-tiger">{p.category}</span>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-onyx/95 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.title}
          >
            <motion.figure
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox.url} alt={lightbox.title} className="max-h-[78vh] w-full border border-zinc-800 object-contain" />
              <figcaption className="flex items-center justify-between p-3">
                <p className="font-display text-xl uppercase tracking-wide text-zinc-100">{lightbox.title}</p>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-tiger">{lightbox.category}</span>
              </figcaption>
            </motion.figure>
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute right-5 top-5 border border-zinc-700 p-2 text-zinc-300 transition-colors hover:border-tiger hover:text-tiger"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
