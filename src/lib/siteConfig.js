export const SITE = {
  name: "PA FIGHT TEAM",
  team: "Equipe Mendonça Júnior",
  founded: 2015,
  city: "Paulo Afonso",
  state: "Bahia",
  modalities: ["Muay Thai", "Boxe"],
  whatsapp: "5575998522249",
  instagram: "pafight_team",
  instagramUrl: "https://www.instagram.com/pafight_team/",
  phoneDisplay: "(75) 99852-2249",
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
 * Graduação Muay Thai (prajied no braço).
 * Estrutura: faixa (cor) + grau (ponta) + nível.
 * Base comum no Brasil (estilo CBMTT / academias tradicionais).
 */
export const MUAY_THAI_GRADES = [
  { id: "branca", faixa: "Branca", grau: null, nivel: "Iniciante", bg: "#e4e4e7", fg: "#09090b", tip: null },
  { id: "amarela", faixa: "Amarela", grau: null, nivel: "Iniciante", bg: "#eab308", fg: "#09090b", tip: null },
  { id: "amarela-branca", faixa: "Amarela", grau: "Ponta branca", nivel: "Iniciante", bg: "#eab308", fg: "#09090b", tip: "#fafafa" },
  { id: "verde", faixa: "Verde", grau: null, nivel: "Iniciante", bg: "#22c55e", fg: "#09090b", tip: null },
  { id: "verde-branca", faixa: "Verde", grau: "Ponta branca", nivel: "Intermediário", bg: "#22c55e", fg: "#09090b", tip: "#fafafa" },
  { id: "azul", faixa: "Azul", grau: null, nivel: "Intermediário", bg: "#3b82f6", fg: "#fafafa", tip: null },
  { id: "azul-branca", faixa: "Azul", grau: "Ponta branca", nivel: "Intermediário", bg: "#3b82f6", fg: "#fafafa", tip: "#fafafa" },
  { id: "marrom", faixa: "Marrom", grau: null, nivel: "Avançado", bg: "#7c4a21", fg: "#fafafa", tip: null },
  { id: "marrom-branca", faixa: "Marrom", grau: "Ponta branca", nivel: "Avançado", bg: "#7c4a21", fg: "#fafafa", tip: "#fafafa" },
  { id: "vermelha", faixa: "Vermelha", grau: null, nivel: "Avançado", bg: "#dc2626", fg: "#fafafa", tip: null },
  { id: "vermelha-branca", faixa: "Vermelha", grau: "Ponta branca", nivel: "Avançado", bg: "#dc2626", fg: "#fafafa", tip: "#fafafa" },
  { id: "preta", faixa: "Preta", grau: null, nivel: "Instrutor", bg: "#18181b", fg: "#fafafa", tip: null },
  { id: "preta-branca", faixa: "Preta", grau: "Ponta branca", nivel: "Professor / Kru", bg: "#18181b", fg: "#fafafa", tip: "#fafafa" },
];

export const NIVEIS = ["Iniciante", "Intermediário", "Avançado", "Instrutor", "Professor / Kru"];

export function getGrade(idOrFaixa) {
  return (
    MUAY_THAI_GRADES.find((g) => g.id === idOrFaixa) ||
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
  return grade.grau ? `${grade.faixa} · ${grade.grau}` : grade.faixa;
}

/** Compat: lista só das faixas-base para loops simples */
export const RANKS = MUAY_THAI_GRADES.map((g) => g.id);

export const RANK_COLORS = Object.fromEntries(
  MUAY_THAI_GRADES.map((g) => [g.id, { bg: g.bg, fg: g.fg, tip: g.tip }]),
);

export const PIX_KEY = "pagamentos@pafightteam.com";
export const PIX_NAME = "PA FIGHT TEAM";
export const PIX_CITY = "PAULO AFONSO";

export const IMG = {
  hero: "/imgs/gallery/constancia.jpg",
  muaythai: "/imgs/gallery/muay-thai-arte.jpg",
  boxe: "/imgs/1526792903869-f3035bfc7f29.jpg",
  gym: "/imgs/gallery/regras-tatame.jpg",
  victory: "/imgs/gallery/graduacao-evento.jpg",
  arena: "/imgs/gallery/muay-thai-arte.jpg",
  gloves: "/imgs/gloves.jpg",
  atleta: "/imgs/gallery/atleta.jpg",
};

export const SCHEDULE = [
  { days: "Seg, Qua e Sex", modality: "Muay Thai", time: "19h — 20h30", level: "Todos os níveis" },
  { days: "Ter e Qui", modality: "Boxe", time: "19h — 20h30", level: "Todos os níveis" },
  { days: "Sábado", modality: "Muay Thai + Boxe", time: "09h — 10h30", level: "Turma juvenil (12 a 16 anos)" },
  { days: "Ter e Qui", modality: "Boxe", time: "20h30 — 21h30", level: "Time de competições" },
];
