import { motion } from "framer-motion";

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

export const RankChip = ({ rank, colors }) => (
  <span
    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
    style={{ background: colors?.bg || "#e4e4e7", color: colors?.fg || "#09090b" }}
  >
    <span
      className="h-2 w-2 rounded-full"
      style={{ background: colors?.fg === "#fafafa" ? "#f97316" : "currentColor", opacity: 0.7 }}
    />
    {rank}
  </span>
);
