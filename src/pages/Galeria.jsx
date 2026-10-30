import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { demoStore } from "@/lib/demoStore";
import { LOCAL_VIDEOS, SITE } from "@/lib/siteConfig";
import { Reveal, Eyebrow, SectionTitle } from "@/components/Reveal";
import Seo from "@/components/Seo";

export default function Galeria() {
  const photos = demoStore.getGallery();
  const [lightbox, setLightbox] = useState(null);
  const [playing, setPlaying] = useState(null);

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

        <Reveal delay={0.08}>
          <div className="mt-10">
            <Eyebrow>Vídeos · @{SITE.instagram}</Eyebrow>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              Reel baixado do Instagram e vídeo enviado pela academia. Clique para assistir aqui.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {LOCAL_VIDEOS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setPlaying(v)}
                  className="group relative aspect-[9/16] max-h-[520px] w-full overflow-hidden border border-zinc-800/80 text-left sm:aspect-video sm:max-h-none"
                >
                  <img
                    src={v.cover}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "/imgs/cliente/foto-05.jpg";
                    }}
                  />
                  <span className="absolute inset-0 bg-onyx/35" />
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-50">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-tiger text-onyx">
                      <Play size={26} fill="currentColor" />
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">{v.title}</span>
                  </span>
                </button>
              ))}
            </div>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-xs font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:text-tiger"
            >
              Mais no @{SITE.instagram} →
            </a>
          </div>
        </Reveal>

        {photos.length === 0 ? (
          <div className="mt-16 border border-dashed border-zinc-800 p-14 text-center">
            <p className="font-display text-3xl uppercase text-zinc-300">Nenhuma foto por aqui ainda</p>
          </div>
        ) : (
          <div className="mt-12 columns-2 gap-4 lg:columns-3 xl:columns-4">
            {photos.map((p, i) => (
              <motion.button
                key={p.id}
                type="button"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, delay: (i % 8) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setLightbox(p)}
                className="group mb-4 block w-full break-inside-avoid overflow-hidden border border-zinc-800/80 text-left transition-colors hover:border-tiger/60"
              >
                <img
                  src={p.url}
                  alt=""
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
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
            aria-label="Foto ampliada"
          >
            <motion.figure
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox.url} alt="" className="max-h-[85vh] w-full border border-zinc-800 object-contain" />
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

      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-onyx/95 p-4 backdrop-blur-sm"
            onClick={() => setPlaying(null)}
            role="dialog"
            aria-modal="true"
            aria-label={playing.title}
          >
            <motion.div
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                key={playing.id}
                src={playing.src}
                poster={playing.cover}
                controls
                autoPlay
                playsInline
                className="max-h-[80vh] w-full border border-zinc-800 bg-black object-contain"
              />
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="font-display text-lg uppercase tracking-wide text-zinc-100">{playing.title}</p>
                {playing.href && (
                  <a
                    href={playing.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-tiger hover:underline"
                  >
                    Ver no Instagram
                  </a>
                )}
              </div>
            </motion.div>
            <button
              type="button"
              onClick={() => setPlaying(null)}
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
