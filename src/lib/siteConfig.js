export const SITE = {
  name: "PA FIGHT TEAM",
  team: "Equipe Mendonça Júnior",
  founded: 2015,
  city: "Paulo Afonso",
  state: "Bahia",
  modalities: ["Muay Thai", "Boxe"],
  whatsapp: "5575983156616",
  instagram: "pafight_team",
  instagramUrl: "https://www.instagram.com/pafight_team/",
  phoneDisplay: "(75) 98315-6616",
  addressStreet: "Avenida Landulfo Alves, 182",
  addressLine: "Av. Landulfo Alves, 182 — Paulo Afonso, BA",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Avenida+Landulfo+Alves+182+Paulo+Afonso+BA",
  mapsEmbed:
    "https://www.google.com/maps?q=Avenida+Landulfo+Alves+182,+Paulo+Afonso,+BA&hl=pt-BR&z=16&output=embed",
};

export const PLANS = [
  {
    id: "Mensal",
    name: "Mensal",
    price: 120,
    period: "/mês",
    highlight: false,
    perks: ["1 modalidade", "Acesso às turmas da modalidade", "Sem fidelidade"],
  },
  {
    id: "Trimestral",
    name: "Trimestral",
    price: 320,
    period: "/trimestre",
    highlight: true,
    perks: ["1 modalidade", "Economia de R$ 40", "Avaliação de graduação incluída"],
  },
  {
    id: "Anual",
    name: "Anual",
    price: 1100,
    period: "/ano",
    highlight: false,
    perks: ["Muay Thai + Boxe (combo)", "Melhor valor do ano", "Kit do atleta com desconto"],
  },
];

/**
 * Graduação Muay Thai — Prajied (nome correto) / Kruang (nome popular no BR).
 * Quadro CBMT / CMTB: 11 prajieds nas cores da bandeira tailandesa.
 * - prajied = corda no braço
 * - grau = “ponta” (próxima cor entre um grau e outro)
 * - nivel = título a partir de Monitor
 * - tips = cores da ponta no chip (1 ou 2)
 */
const C = {
  branco: "#f4f4f5",
  vermelho: "#dc2626",
  azulClaro: "#38bdf8",
  azulEscuro: "#1e3a8a",
  preto: "#18181b",
};

export const MUAY_THAI_GRADES = [
  { id: "cbmt-1", ordem: 1, faixa: "Branco", grau: null, label: "Branco", nivel: "Praticante", bg: C.branco, fg: "#09090b", tips: null },
  { id: "cbmt-2", ordem: 2, faixa: "Branco", grau: "Vermelha", label: "Branco ponta vermelha", nivel: "Praticante", bg: C.branco, fg: "#09090b", tips: [C.vermelho] },
  { id: "cbmt-3", ordem: 3, faixa: "Vermelho", grau: null, label: "Vermelho", nivel: "Praticante", bg: C.vermelho, fg: "#fafafa", tips: null },
  { id: "cbmt-4", ordem: 4, faixa: "Vermelho", grau: "Azul-claro", label: "Vermelho ponta azul-claro", nivel: "Praticante", bg: C.vermelho, fg: "#fafafa", tips: [C.azulClaro] },
  { id: "cbmt-5", ordem: 5, faixa: "Azul-claro", grau: null, label: "Azul-claro", nivel: "Praticante", bg: C.azulClaro, fg: "#09090b", tips: null },
  { id: "cbmt-6", ordem: 6, faixa: "Azul-claro", grau: "Azul-escuro", label: "Azul-claro ponta azul-escuro", nivel: "Monitor", bg: C.azulClaro, fg: "#09090b", tips: [C.azulEscuro] },
  { id: "cbmt-7", ordem: 7, faixa: "Azul-escuro", grau: null, label: "Azul-escuro", nivel: "Instrutor auxiliar", bg: C.azulEscuro, fg: "#fafafa", tips: null },
  { id: "cbmt-8", ordem: 8, faixa: "Azul-escuro", grau: "Preta", label: "Azul-escuro ponta preta", nivel: "Instrutor", bg: C.azulEscuro, fg: "#fafafa", tips: [C.preto] },
  { id: "cbmt-9", ordem: 9, faixa: "Preto", grau: null, label: "Preto", nivel: "Professor", bg: C.preto, fg: "#fafafa", tips: null },
  { id: "cbmt-10", ordem: 10, faixa: "Preto", grau: "Branca", label: "Preto ponta branca", nivel: "Mestre", bg: C.preto, fg: "#fafafa", tips: [C.branco] },
  { id: "cbmt-11", ordem: 11, faixa: "Preto", grau: "Branca e vermelha", label: "Preto ponta branca e vermelha", nivel: "Grão-mestre", bg: C.preto, fg: "#fafafa", tips: [C.branco, C.vermelho] },
];

export const NIVEIS = [
  "Praticante",
  "Monitor",
  "Instrutor auxiliar",
  "Instrutor",
  "Professor",
  "Mestre",
  "Grão-mestre",
];

export function getGrade(idOrFaixa) {
  return (
    MUAY_THAI_GRADES.find((g) => g.id === idOrFaixa) ||
    MUAY_THAI_GRADES.find((g) => g.label === idOrFaixa) ||
    MUAY_THAI_GRADES.find((g) => g.faixa === idOrFaixa && !g.grau) ||
    null
  );
}

export function gradeLabel(grade) {
  if (!grade) return "—";
  if (typeof grade === "string") {
    const g = getGrade(grade);
    return g ? gradeLabel(g) : grade;
  }
  if (grade.label) return grade.label;
  return grade.grau ? `${grade.faixa} ponta ${String(grade.grau).toLowerCase()}` : grade.faixa;
}

/** Fundo do chip: corpo + ponta(s) em ~75/25. */
export function prajiedChipBackground(gradeOrColors) {
  const bg = gradeOrColors?.bg || "#e4e4e7";
  const tips = gradeOrColors?.tips;
  if (!tips?.length) return bg;
  if (tips.length === 1) return `linear-gradient(90deg, ${bg} 75%, ${tips[0]} 75%)`;
  return `linear-gradient(90deg, ${bg} 70%, ${tips[0]} 70%, ${tips[0]} 85%, ${tips[1]} 85%)`;
}

export const RANKS = MUAY_THAI_GRADES.map((g) => g.id);

export const RANK_COLORS = Object.fromEntries(
  MUAY_THAI_GRADES.map((g) => [g.id, { bg: g.bg, fg: g.fg, tips: g.tips }]),
);

export const PIX_KEY = "pagamentos@pafightteam.com";
export const PIX_NAME = "PA FIGHT TEAM";
export const PIX_CITY = "PAULO AFONSO";

export const IMG = {
  hero: "/imgs/cliente/foto-05.jpg",
  muaythai: "/imgs/cliente/foto-16.jpg",
  boxe: "/imgs/1526792903869-f3035bfc7f29.jpg",
  gym: "/imgs/cliente/foto-19.jpg",
  victory: "/imgs/cliente/foto-22.jpg",
  arena: "/imgs/cliente/foto-03.jpg",
  gloves: "/imgs/gloves.jpg",
  atleta: "/imgs/cliente/foto-05.jpg",
};

/** Hero da Home: loop curto mudo (comprimido a partir do treino da academia). */
export const HERO_VIDEO = "/videos/hero-treino.mp4";

/** Logo cinematográfica (Nano Banana) + loop montado em ffmpeg. */
export const LOGO_VIDEO = "/videos/logo-loop.mp4";
export const LOGO_HERO_STILL = "/imgs/logo-anim/hero-logo.jpg";
export const LOGO_NAV = "/imgs/logo-anim/nav-logo.jpg";

/** Vídeos locais (reel IG + vídeo do cliente) — reprodução na galeria. */
export const LOCAL_VIDEOS = [
  {
    id: "v-treino",
    title: "Treino · academia",
    src: "/videos/cliente-treino.mp4",
    cover: "/imgs/cliente/poster-cliente-treino.jpg",
  },
  {
    id: "v-reel",
    title: "Reel · Instagram",
    src: "/videos/reel-CkA-2jRj2ks.mp4",
    cover: "/imgs/cliente/poster-reel.jpg",
    href: "https://www.instagram.com/reel/CkA-2jRj2ks/",
  },
];

/** Alias legado */
export const IG_VIDEO_COVERS = LOCAL_VIDEOS.map((v) => ({
  id: v.id,
  title: v.title,
  cover: v.cover,
  href: v.href || SITE.instagramUrl,
}));

export const SCHEDULE = [
  { days: "Seg, Qua e Sex", modality: "Muay Thai", time: "19h — 20h30", level: "Todos os níveis" },
  { days: "Ter e Qui", modality: "Boxe", time: "19h — 20h30", level: "Todos os níveis" },
  { days: "Sábado", modality: "Muay Thai + Boxe", time: "09h — 10h30", level: "Turma juvenil (12 a 16 anos)" },
  { days: "Ter e Qui", modality: "Boxe", time: "20h30 — 21h30", level: "Time de competições" },
];
