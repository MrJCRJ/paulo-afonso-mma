import { Link } from "react-router-dom";
import { MapPin, Flame } from "lucide-react";
import { SITE } from "@/lib/siteConfig";

const Footer = () => (
  <footer className="relative border-t border-zinc-800/80 bg-onyx">
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-8 lg:px-12">
      <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <img src="/logo.jpg" alt="" className="h-16 w-16 rounded-full object-cover ring-1 ring-tiger/50" />
          <div>
            <p className="font-display text-2xl tracking-widest text-zinc-50">PA FIGHT TEAM</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-tiger">
              {SITE.team} — Desde {SITE.founded}
            </p>
          </div>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Rodapé">
          {[
            ["Matrículas", "/matriculas"],
            ["Graduações", "/graduacoes"],
            ["Galeria", "/galeria"],
            ["Eventos", "/eventos"],
            ["Pagamentos", "/pagamentos"],
          ].map(([label, to]) => (
            <Link
              key={to}
              to={to}
              className="text-sm font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:text-tiger"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-zinc-800/60 pt-6 text-[12px] text-zinc-500 sm:flex-row sm:items-center">
        <a
          href={SITE.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 transition-colors hover:text-tiger"
        >
          <MapPin size={13} className="text-tiger" />
          {SITE.addressLine}
        </a>
        <p className="inline-flex items-center gap-2 uppercase tracking-wider">
          <Flame size={13} className="text-tiger" />
          Forjando guerreiros desde {SITE.founded}
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
