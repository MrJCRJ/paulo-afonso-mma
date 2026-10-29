export const SITE = {
  name: "PA FIGHT TEAM",
  team: "Equipe Mendonça Júnior",
  founded: 2015,
  city: "Paulo Afonso",
  state: "Bahia",
  modalities: ["Muay Thai", "Boxe"],
  whatsapp: "5599999999999",
  addressLine: "Paulo Afonso — Bahia, Brasil",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Paulo+Afonso+Bahia",
  mapsEmbed:
    "https://www.google.com/maps?q=Paulo+Afonso,+BA&hl=pt-BR&z=14&output=embed",
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

export const RANKS = ["Branca", "Amarela", "Laranja", "Verde", "Azul", "Marrom", "Preta"];

export const RANK_COLORS = {
  Branca: { bg: "#e4e4e7", fg: "#09090b" },
  Amarela: { bg: "#eab308", fg: "#09090b" },
  Laranja: { bg: "#f97316", fg: "#09090b" },
  Verde: { bg: "#22c55e", fg: "#09090b" },
  Azul: { bg: "#3b82f6", fg: "#09090b" },
  Marrom: { bg: "#7c4a21", fg: "#fafafa" },
  Preta: { bg: "#18181b", fg: "#fafafa" },
};

export const PIX_KEY = "pagamentos@pafightteam.com";
export const PIX_NAME = "PA FIGHT TEAM";
export const PIX_CITY = "PAULO AFONSO";

export const IMG = {
  hero: "/imgs/1607702713064-0143212236ae.jpg",
  muaythai: "/imgs/1601588462060-470011bd9a18.jpg",
  boxe: "/imgs/1526792903869-f3035bfc7f29.jpg",
  gym: "/imgs/1758778932703-7bfaaf1c42cd.jpg",
  victory: "/imgs/victory.jpg",
  arena: "/imgs/1509563268479-0f004cf3f58b.jpg",
  gloves: "/imgs/gloves.jpg",
};

export const SCHEDULE = [
  { days: "Seg, Qua e Sex", modality: "Muay Thai", time: "19h — 20h30", level: "Todos os níveis" },
  { days: "Ter e Qui", modality: "Boxe", time: "19h — 20h30", level: "Todos os níveis" },
  { days: "Sábado", modality: "Muay Thai + Boxe", time: "09h — 10h30", level: "Turma juvenil (12 a 16 anos)" },
  { days: "Ter e Qui", modality: "Boxe", time: "20h30 — 21h30", level: "Time de competições" },
];
