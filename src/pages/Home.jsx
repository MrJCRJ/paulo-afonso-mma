import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ChevronRight, Flame, MapPin, Medal, ShieldCheck } from "lucide-react";
import { SITE, IMG, HERO_VIDEO, LOGO_HERO_STILL, SCHEDULE, RANK_COLORS, getGrade, gradeLabel } from "@/lib/siteConfig";
import { demoStore } from "@/lib/demoStore";
import { Reveal, Eyebrow, SectionTitle, RankChip } from "@/components/Reveal";
import Seo from "@/components/Seo";

const heroLines = ["FORJA DE", "GUERREIROS"];

const Marquee = () => {
  const items = ["Equipe Mendonça Júnior", "Muay Thai", "Boxe", "Paulo Afonso — Bahia", `Desde ${SITE.founded}`];
  const row = items.map((t, i) => (
    <span key={i} className="inline-flex items-center gap-6 pr-6">
      <span className="font-display text-3xl uppercase tracking-wider text-zinc-100 sm:text-4xl">{t}</span>
      <Flame size={22} className="text-tiger" aria-hidden />
    </span>
  ));
  return (
    <div className="relative overflow-hidden border-y border-zinc-800/80 bg-[#0E0E11] py-5">
      <div className="animate-marquee flex w-max">
        <div className="flex">{row}</div>
        <div className="flex" aria-hidden>
          {row}
        </div>
      </div>
    </div>
  );
};

/** Logo 2D cinematográfica com tilt 3D pelo mouse (sem troca de frames / sem boca). */
const InteractiveLogo = () => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.4 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-32, 32]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [26, -26]);
  const glareBg = useTransform([sx, sy], ([x, y]) => {
    const px = 50 + x * 100;
    const py = 50 + y * 100;
    return `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.38) 0%, transparent 42%), linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 42%, rgba(0,0,0,0.38) 100%)`;
  });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      className="relative mx-auto hidden aspect-square w-full max-w-md cursor-grab active:cursor-grabbing lg:block"
      style={{ perspective: 1400 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="pointer-events-none absolute inset-[8%] rounded-full bg-tiger/35 blur-3xl" aria-hidden />
      <motion.div
        className="relative h-full w-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="absolute -inset-[3%] rounded-full bg-[#9a3412]"
          style={{ transform: "translateZ(-18px)" }}
          aria-hidden
        />
        <div className="relative overflow-hidden rounded-full shadow-[0_30px_70px_rgba(0,0,0,0.55),0_0_90px_rgba(249,115,22,0.35)] ring-1 ring-tiger/55">
          <img
            src={LOGO_HERO_STILL}
            alt="Logo PA FIGHT TEAM"
            className="h-full w-full select-none object-cover"
            draggable={false}
          />
          <motion.div className="pointer-events-none absolute inset-0" style={{ background: glareBg }} aria-hidden />
        </div>
      </motion.div>
      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
        Mova o mouse sobre a logo
      </p>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="grain relative flex min-h-screen items-center overflow-hidden bg-onyx pt-16">
      <div className="absolute inset-0">
        <video
          className="h-full w-full scale-105 object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={IMG.hero}
          aria-hidden
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-onyx/85 via-onyx/45 to-onyx" />
        <div className="absolute inset-0 bg-gradient-to-r from-onyx/90 via-onyx/35 to-onyx/25" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:px-12">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <Eyebrow>Paulo Afonso — Bahia · Desde {SITE.founded}</Eyebrow>
          </motion.div>

          <h1 className="mt-6 font-display text-[19vw] leading-[0.88] tracking-wide text-zinc-50 sm:text-7xl lg:text-8xl xl:text-[7.5rem]">
            {heroLines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)]"
                  initial={{ y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {i === 1 ? <span className="text-tiger">{line}</span> : line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-zinc-200 sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.55 }}
          >
            Muay Thai e Boxe de verdade, no sangue quente do sertão baiano. A{" "}
            <strong className="text-zinc-50">Equipe Mendonça Júnior</strong> forma lutadores e pessoas desde{" "}
            {SITE.founded}. Sua hora é agora.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.65 }}
          >
            <Link
              to="/matriculas"
              className="pulse-ring inline-flex items-center gap-2 bg-tiger px-8 py-4 text-sm font-bold uppercase tracking-wider text-onyx transition-all duration-300 hover:bg-orange-400"
            >
              Garantir minha vaga <ArrowRight size={16} />
            </Link>
            <Link
              to="/graduacoes"
              className="inline-flex items-center gap-2 border border-zinc-500/80 bg-onyx/40 px-8 py-4 text-sm font-bold uppercase tracking-wider text-zinc-100 backdrop-blur-sm transition-colors duration-300 hover:border-tiger hover:text-tiger"
            >
              Ver graduações
            </Link>
          </motion.div>

          <motion.div
            className="mt-12 flex flex-wrap gap-8 border-t border-zinc-700/60 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.85 }}
          >
            {[
              ["2015", "Ano de fundação"],
              ["02", "Modalidades"],
              ["BA", "Paulo Afonso"],
            ].map(([n, label]) => (
              <div key={label}>
                <p className="font-display text-3xl text-tiger">{n}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <InteractiveLogo />
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronRight size={22} className="rotate-90 text-tiger" aria-hidden />
        </motion.div>
      </div>
    </section>
  );
};

const Modalidades = () => {
  const cards = [
    {
      name: "Muay Thai",
      tag: "A arte das oito armas",
      img: IMG.muaythai,
      desc: "Golpes com punhos, pés, joelhos e cotovelos. Condicionamento puro, disciplina tailandesa com identidade sertaneja.",
      items: ["Clinch e cornering", "Pad work e saco", "Todas as idades"],
    },
    {
      name: "Boxe",
      tag: "A ciência do punho",
      img: IMG.boxe,
      desc: "Footwork, defesa e mão rápida. Base sólida desde o primeiro dia, do treino leve ao ringue.",
      items: ["Footwork e esquivas", "Combos e saco", "Time de competições"],
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-8 lg:px-12 lg:py-32">
      <Reveal>
        <Eyebrow>O que treinar</Eyebrow>
        <SectionTitle className="mt-3">
          Duas escolas.
          <br />
          Um tigre.
        </SectionTitle>
      </Reveal>
      <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
        {cards.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.12}>
            <article className="group relative h-full overflow-hidden border border-zinc-800/80 bg-[#121215] transition-colors duration-500 hover:border-tiger/60">
              <div className="relative h-64 overflow-hidden sm:h-72">
                <img
                  src={c.img}
                  alt={`Aula de ${c.name} no PA FIGHT TEAM`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent" />
                <span className="absolute left-4 top-4 bg-tiger px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-onyx">
                  {c.tag}
                </span>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="font-display text-4xl uppercase tracking-wide text-zinc-50">{c.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">{c.desc}</p>
                <ul className="mt-5 space-y-2">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-sm text-zinc-300">
                      <ShieldCheck size={15} className="text-tiger" aria-hidden /> {it}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

const Academia = () => (
  <section className="border-y border-zinc-800/80 bg-[#0C0C0F]">
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-32">
      <Reveal>
        <div className="relative">
          <img
            src={IMG.gym}
            alt="Treino na academia PA FIGHT TEAM"
            className="h-full max-h-[520px] w-full border border-zinc-800 object-cover"
            loading="lazy"
          />
          <div className="absolute -bottom-5 -right-3 hidden bg-tiger px-6 py-4 sm:block">
            <p className="font-display text-3xl uppercase leading-none text-onyx">Desde 2015</p>
          </div>
        </div>
      </Reveal>
      <div>
        <Reveal>
          <Eyebrow>A casa do tigre</Eyebrow>
          <SectionTitle className="mt-3">Mais que academia, uma equipe</SectionTitle>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-base leading-relaxed text-zinc-300 sm:text-lg">
            Fundado em <strong className="text-tiger">2015</strong>, o{" "}
            <strong className="text-zinc-50">PA FIGHT TEAM — Equipe Mendonça Júnior</strong> nasceu em Paulo Afonso, no
            coração da Bahia, para formar lutadores dentro e fora do ringue. Aqui cada aluno é tratado como família:
            evolui no Muay Thai e no Boxe com método, respeito e muita garra.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10">
            <Eyebrow>Turmas e horários</Eyebrow>
            <div className="mt-4 divide-y divide-zinc-800/80 border border-zinc-800/80">
              {SCHEDULE.map((s) => (
                <div
                  key={s.modality + s.time + s.days}
                  className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[1.1fr_1fr_0.9fr] sm:items-center"
                >
                  <p className="text-sm font-bold uppercase tracking-wider text-zinc-100">{s.modality}</p>
                  <p className="text-sm text-zinc-400">{s.days}</p>
                  <p className="text-sm text-zinc-400">
                    {s.time} · <span className="text-zinc-500">{s.level}</span>
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              Horários de referência — confirme na academia
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.22}>
          <p className="mt-6 text-sm text-zinc-400">
            <strong className="text-zinc-200">{SITE.addressStreet}</strong>
            <br />
            {SITE.city} — {SITE.state} · WhatsApp {SITE.phoneDisplay}
          </p>
          <div className="mt-4 overflow-hidden border border-zinc-800/80">
            <iframe
              title={`Mapa ${SITE.addressStreet}`}
              src={SITE.mapsEmbed}
              className="h-48 w-full grayscale contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex text-xs font-bold uppercase tracking-wider text-tiger hover:text-orange-300"
          >
            Instagram @{SITE.instagram}
          </a>
        </Reveal>
      </div>
    </div>
  </section>
);

const fmtDate = (iso) =>
  iso
    ? new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
    : "";

const GraduacoesPreview = () => {
  const items = demoStore.getGraduations().slice(0, 4);
  if (!items.length) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-8 lg:px-12 lg:py-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>Fita nova, ânimo novo</Eyebrow>
          <SectionTitle className="mt-3">Últimas graduações</SectionTitle>
        </div>
        <Link
          to="/graduacoes"
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-tiger hover:text-orange-300"
        >
          Ver mural completo <ArrowRight size={14} />
        </Link>
      </Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((g, i) => {
          const grade = getGrade(g.rank) || getGrade(g.faixa);
          return (
          <Reveal key={g.id} delay={i * 0.08}>
            <div className="flex h-full flex-col justify-between border border-zinc-800/80 bg-[#121215] p-5 transition-colors hover:border-tiger/50">
              <div className="flex items-center justify-between gap-2">
                <RankChip
                  rank={g.faixa || grade?.faixa || gradeLabel(g.rank)}
                  grau={g.grau ?? grade?.grau}
                  nivel={g.nivel || grade?.nivel}
                  colors={RANK_COLORS[g.rank] || (grade && { bg: grade.bg, fg: grade.fg, tips: grade.tips })}
                />
                <Medal size={18} className="shrink-0 text-tiger" aria-hidden />
              </div>
              <div className="mt-8">
                <p className="font-display text-2xl uppercase tracking-wide text-zinc-50">{g.student_name}</p>
                <p className="mt-1 text-xs text-zinc-500">
                  {g.modality} · {fmtDate(g.date)}
                </p>
              </div>
            </div>
          </Reveal>
          );
        })}
      </div>
    </section>
  );
};

const GaleriaPreview = () => {
  const photos = demoStore.getGallery().slice(0, 4);
  if (!photos.length) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-8 lg:px-12 lg:pb-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>O clima da equipe</Eyebrow>
          <SectionTitle className="mt-3">Dentro do ringue</SectionTitle>
        </div>
        <Link
          to="/galeria"
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-tiger hover:text-orange-300"
        >
          Ver galeria completa <ArrowRight size={14} />
        </Link>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {photos.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.06} className={i % 2 === 1 ? "translate-y-6" : ""}>
            <img
              src={p.url}
              alt=""
              className="aspect-[3/4] w-full border border-zinc-800/80 object-cover transition duration-500 hover:border-tiger/60"
              loading="lazy"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

const EventosPreview = () => {
  const events = demoStore.getPosts().filter((p) => p.type === "event").slice(0, 2);
  if (!events.length) return null;
  return (
    <section className="border-t border-zinc-800/80 bg-[#0C0C0F]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8 lg:px-12 lg:py-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Agenda do tigre</Eyebrow>
            <SectionTitle className="mt-3">Próximos eventos</SectionTitle>
          </div>
          <Link
            to="/eventos"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-tiger hover:text-orange-300"
          >
            Ver agenda e notícias <ArrowRight size={14} />
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {events.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.1}>
              <article className="group flex h-full gap-5 border border-zinc-800/80 bg-[#121215] p-6 transition-colors hover:border-tiger/50">
                <div className="flex h-20 w-20 flex-none flex-col items-center justify-center bg-tiger text-onyx">
                  <span className="font-display text-4xl leading-none">
                    {e.date ? new Date(`${e.date}T12:00:00`).getDate() : "?"}
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase">
                    {e.date ? fmtDate(e.date).split(" ")[1]?.replace(".", "") : "—"}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl uppercase tracking-wide text-zinc-50 group-hover:text-tiger">
                    {e.title}
                  </h3>
                  {e.location && (
                    <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-zinc-500">
                      <MapPin size={12} className="text-tiger" aria-hidden /> {e.location}
                    </p>
                  )}
                  <p className="mt-2 line-clamp-2 text-sm text-zinc-400">{e.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const CtaFinal = () => (
  <section className="grain relative overflow-hidden border-t border-zinc-800/80">
    <img src={IMG.arena} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" loading="lazy" />
    <div className="absolute inset-0 bg-gradient-to-b from-onyx via-onyx/70 to-onyx" />
    <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 text-center sm:px-8 lg:px-12 lg:py-36">
      <Reveal>
        <Eyebrow>Vagas abertas — turmas de Muay Thai e Boxe</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-4xl font-display text-5xl uppercase leading-[0.95] tracking-wide text-zinc-50 sm:text-7xl lg:text-8xl">
          O ringue é seu. <span className="text-stroke">Só falta você.</span>
        </h2>
        <Link
          to="/matriculas"
          className="mt-10 inline-flex items-center gap-2 bg-tiger px-10 py-5 text-sm font-bold uppercase tracking-wider text-onyx transition-all duration-300 hover:bg-orange-400 hover:shadow-[0_0_32px_rgba(249,115,22,0.5)]"
        >
          Fazer minha matrícula <ArrowRight size={16} />
        </Link>
      </Reveal>
    </div>
  </section>
);

export default function Home() {
  return (
    <div>
      <Seo />
      <Hero />
      <Marquee />
      <Modalidades />
      <Academia />
      <GraduacoesPreview />
      <GaleriaPreview />
      <EventosPreview />
      <CtaFinal />
    </div>
  );
}
