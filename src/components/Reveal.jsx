import { motion } from "framer-motion";
import { prajiedChipBackground } from "@/lib/siteConfig";

export const Reveal = ({ children, delay = 0, y = 32, className = "", once = true }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, amount: 0.15 }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const Eyebrow = ({ children }) => (
  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-tiger sm:text-xs">{children}</p>
);

export const SectionTitle = ({ children, className = "" }) => (
  <h2 className={`font-display text-4xl uppercase leading-[0.95] tracking-wide text-zinc-50 sm:text-5xl lg:text-6xl ${className}`}>
    {children}
  </h2>
);

export const RankChip = ({ rank, colors, grau, nivel, label }) => {
  const tips = colors?.tips || (colors?.tip ? [colors.tip] : null);
  const chipColors = { bg: colors?.bg, tips };
  const text = label || (grau ? `${rank} ponta ${String(grau).toLowerCase()}` : rank);
  return (
    <span
      className="inline-flex max-w-full flex-col gap-0.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider"
      style={{ background: prajiedChipBackground(chipColors), color: colors?.fg || "#09090b" }}
      title={nivel ? `Título: ${nivel}` : undefined}
    >
      <span className="inline-flex items-center gap-1.5">
        <span
          className="relative h-2.5 w-5 shrink-0 overflow-hidden rounded-full"
          style={{ background: prajiedChipBackground(chipColors), boxShadow: `inset 0 0 0 1px ${(colors?.fg || "#09090b")}55` }}
          aria-hidden
        />
        <span className="min-w-0 break-words leading-tight">{text}</span>
      </span>
      {nivel && <span className="pl-6 text-[9px] font-semibold tracking-[0.14em] opacity-80">{nivel}</span>}
    </span>
  );
};
