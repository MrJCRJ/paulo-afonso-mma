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
 * Quadro no estilo CBMTT / IFMA: 16 Khan.
 * - prajied = corda no braço que marca o grau
 * - grau composto (ex.: Amarelo e Branco) = “ponta” / segunda cor
 * - nível = experiência / título
 */
export const MUAY_THAI_GRADES = [
  { id: "khan-1", khan: "1º Khan Nueng", faixa: "Branco", grau: null, nivel: "Iniciante", tempo: "3 meses", bg: "#e4e4e7", fg: "#09090b", tip: null },
  { id: "khan-2", khan: "2º Khan Song", faixa: "Amarelo", grau: null, nivel: "Iniciante", tempo: "3 meses", bg: "#eab308", fg: "#09090b", tip: null },
  { id: "khan-3", khan: "3º Khan Sam", faixa: "Amarelo", grau: "Branco", nivel: "Iniciante", tempo: "3 meses", bg: "#eab308", fg: "#09090b", tip: "#fafafa" },
  { id: "khan-4", khan: "4º Khan Sih", faixa: "Verde", grau: null, nivel: "Iniciante", tempo: "3 meses", bg: "#22c55e", fg: "#09090b", tip: null },
  { id: "khan-5", khan: "5º Khan Hah", faixa: "Verde", grau: "Branco", nivel: "Intermediário", tempo: "6 meses", bg: "#22c55e", fg: "#09090b", tip: "#fafafa" },
  { id: "khan-6", khan: "6º Khan Hok", faixa: "Azul", grau: null, nivel: "Intermediário", tempo: "6 meses", bg: "#3b82f6", fg: "#fafafa", tip: null },
  { id: "khan-7", khan: "7º Khan Jed", faixa: "Azul", grau: "Branco", nivel: "Intermediário", tempo: "6 meses", bg: "#3b82f6", fg: "#fafafa", tip: "#fafafa" },
  { id: "khan-8", khan: "8º Khan Pad", faixa: "Marrom", grau: null, nivel: "Avançado", tempo: "6 meses", bg: "#7c4a21", fg: "#fafafa", tip: null },
  { id: "khan-9", khan: "9º Khan Kaoh", faixa: "Marrom", grau: "Branco", nivel: "Avançado", tempo: "6 meses", bg: "#7c4a21", fg: "#fafafa", tip: "#fafafa" },
  { id: "khan-10", khan: "10º Khan Sib", faixa: "Vermelho", grau: null, nivel: "Avançado", tempo: "6 meses", bg: "#dc2626", fg: "#fafafa", tip: null },
  { id: "khan-11", khan: "11º Khan Sib Ed", faixa: "Vermelho", grau: "Branco", nivel: "Kru em treinamento", tempo: "12 meses · 18 anos", bg: "#dc2626", fg: "#fafafa", tip: "#fafafa" },
  { id: "khan-12", khan: "12º Khan Sib Song", faixa: "Preto", grau: null, nivel: "Kru auxiliar", tempo: "24 meses · 20 anos", bg: "#18181b", fg: "#fafafa", tip: null },
  { id: "khan-13", khan: "13º Khan Sib Sam", faixa: "Preto", grau: "Branco", nivel: "Kru (Professor)", tempo: "36 meses · 22 anos", bg: "#18181b", fg: "#fafafa", tip: "#fafafa" },
  { id: "khan-14", khan: "14º Khan Sib Sih", faixa: "Prata", grau: null, nivel: "Arjarn (Mestre)", tempo: "Por nomeação", bg: "#a1a1aa", fg: "#09090b", tip: null },
  { id: "khan-15", khan: "15º Khan Sib Hah", faixa: "Ouro", grau: null, nivel: "Arjarn Yai", tempo: "Por nomeação", bg: "#f59e0b", fg: "#09090b", tip: null },
  { id: "khan-16", khan: "16º Khan Sib Hok", faixa: "Ouro", grau: "Prata", nivel: "Grão-mestre de honra", tempo: "Por nomeação", bg: "#f59e0b", fg: "#09090b", tip: "#a1a1aa" },
];

export const NIVEIS = [
  "Iniciante",
  "Intermediário",
  "Avançado",
  "Kru em treinamento",
  "Kru auxiliar",
  "Kru (Professor)",
  "Arjarn (Mestre)",
  "Arjarn Yai",
  "Grão-mestre de honra",
];

export const GRADUATION_HISTORY = {
  title: "Prajied ou Kruang?",
  lead: "O nome correto da corda de graduação no braço é Prajied. No Brasil muita gente ainda chama de Kruang.",
  paragraphs: [
    "Na Tailândia o prajied nasceu como amuleto de proteção — pedaço de tecido abençoado, muitas vezes com um pequeno kruang (adorno/sagrado) no cordão — e não como “faixa” de academia. Lutadores experientes podem usar prajied branco sem qualquer relação com nível técnico.",
    "Fora da Tailândia, especialmente no Brasil, o prajied passou a funcionar como graduação (o equivalente didático à faixa). O Kruang, em sentido estrito, é o adorno/equipe; no dia a dia brasileiro os dois nomes acabam misturados nos quadros “KRUANG / PRAJIED”.",
    "O PA FIGHT TEAM exibe o quadro em Khan (graus) com a cor do Prajied, a segunda cor quando houver (grau/ponta) e o nível/título. Tempos mínimos seguem a referência tradicional IFMA/CBMTT e podem ser confirmados na academia.",
  ],
};

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
  return grade.grau ? `${grade.faixa} e ${grade.grau}` : grade.faixa;
}

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

/** Capas de vídeos do Instagram — abrem o perfil (CDN bloqueia download sem login). */
export const IG_VIDEO_COVERS = [
  { id: "v1", title: "Treino / reel", cover: "/imgs/gallery/treino-01.jpg", href: "https://www.instagram.com/pafight_team/" },
  { id: "v2", title: "Bastidores", cover: "/imgs/gallery/treino-03.jpg", href: "https://www.instagram.com/pafight_team/" },
  { id: "v3", title: "Equipe", cover: "/imgs/gallery/atleta.jpg", href: "https://www.instagram.com/pafight_team/" },
  { id: "v4", title: "Arena", cover: "/imgs/gallery/treino-04.jpg", href: "https://www.instagram.com/pafight_team/" },
];

export const SCHEDULE = [
  { days: "Seg, Qua e Sex", modality: "Muay Thai", time: "19h — 20h30", level: "Todos os níveis" },
  { days: "Ter e Qui", modality: "Boxe", time: "19h — 20h30", level: "Todos os níveis" },
  { days: "Sábado", modality: "Muay Thai + Boxe", time: "09h — 10h30", level: "Turma juvenil (12 a 16 anos)" },
  { days: "Ter e Qui", modality: "Boxe", time: "20h30 — 21h30", level: "Time de competições" },
];
