import { IMG } from "./siteConfig";

export const SEED_GRADUATIONS = [
  {
    id: "g1",
    student_name: "João Tigre Silva",
    student_email: "aluno@teste.com",
    modality: "Muay Thai",
    rank: "Verde",
    date: "2026-03-12",
    notes: "Evolução forte no clinch.",
  },
  {
    id: "g2",
    student_name: "João Tigre Silva",
    student_email: "aluno@teste.com",
    modality: "Muay Thai",
    rank: "Amarela",
    date: "2025-08-20",
    notes: "",
  },
  {
    id: "g3",
    student_name: "Ana Beatriz Rocha",
    student_email: "ana@exemplo.com",
    modality: "Boxe",
    rank: "Azul",
    date: "2026-02-05",
    notes: "Footwork de destaque.",
  },
  {
    id: "g4",
    student_name: "Carlos Mendes",
    student_email: "carlos@exemplo.com",
    modality: "Muay Thai",
    rank: "Laranja",
    date: "2025-11-18",
    notes: "",
  },
  {
    id: "g5",
    student_name: "Mariana Costa",
    student_email: "mariana@exemplo.com",
    modality: "Boxe",
    rank: "Amarela",
    date: "2026-01-22",
    notes: "Primeira graduação da temporada.",
  },
];

export const SEED_GALLERY = [
  { id: "p1", url: IMG.muaythai, title: "Pad work", category: "Treinos" },
  { id: "p2", url: IMG.boxe, title: "Sombra no ringue", category: "Treinos" },
  { id: "p3", url: IMG.gym, title: "A casa do tigre", category: "Treinos" },
  { id: "p4", url: IMG.arena, title: "Arena", category: "Eventos" },
  { id: "p5", url: IMG.victory, title: "Vitória da equipe", category: "Torneios" },
  { id: "p6", url: IMG.gloves, title: "Luvas prontas", category: "Treinos" },
  { id: "p7", url: IMG.hero, title: "Postura de guerreiro", category: "Graduações" },
  { id: "p8", url: IMG.muaythai, title: "Clinch", category: "Treinos" },
];

export const SEED_POSTS = [
  {
    id: "e1",
    type: "event",
    title: "Avaliação de faixas — Muay Thai",
    body: "Avaliação aberta para alunos com frequência mínima. Traga uniforme limpo e garrafa d'água.",
    date: "2026-11-15",
    location: "PA FIGHT TEAM — Paulo Afonso",
    image_url: IMG.gym,
  },
  {
    id: "e2",
    type: "event",
    title: "Sparring controlado — Boxe",
    body: "Sessão de sparring com proteção completa. Inscrições na recepção ou pelo WhatsApp.",
    date: "2026-11-08",
    location: "PA FIGHT TEAM — Paulo Afonso",
    image_url: IMG.boxe,
  },
  {
    id: "n1",
    type: "news",
    title: "Turma juvenil de sábado com vagas",
    body: "Muay Thai + Boxe para 12 a 16 anos, sábado 09h. Ideal para disciplina e condicionamento.",
    date: "2026-10-20",
    location: "",
    image_url: IMG.arena,
  },
];

export const SEED_PAYMENTS_ALUNO = [
  {
    id: "pay1",
    month: "2026-09",
    amount: 120,
    receipt_ref: "E123456DEMO",
    notes: "",
    status: "confirmed",
  },
  {
    id: "pay2",
    month: "2026-10",
    amount: 120,
    receipt_ref: "E987654DEMO",
    notes: "Pago no dia 05",
    status: "pending",
  },
];
