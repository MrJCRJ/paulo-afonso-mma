import { SITE } from "./siteConfig";

export function waLink(text) {
  const phone = String(SITE.whatsapp || "").replace(/\D/g, "");
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${phone}${q}`;
}

export function openWhatsApp(text) {
  window.open(waLink(text), "_blank", "noopener,noreferrer");
}

export function enrollmentMessage(form) {
  return [
    `Olá! Vim pelo site do ${SITE.name}.`,
    `Quero me matricular.`,
    "",
    `Nome: ${form.name}`,
    `E-mail: ${form.email}`,
    `Telefone: ${form.phone}`,
    form.birth_date ? `Nascimento: ${form.birth_date}` : null,
    `Modalidade: ${form.modality}`,
    `Plano: ${form.plan}`,
    `Experiência: ${form.experience}`,
    form.health ? `Observações: ${form.health}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function planMessage(planName, modality) {
  return `Olá! Vim pelo site do ${SITE.name}. Quero saber mais sobre o plano ${planName}${modality ? ` (${modality})` : ""}.`;
}
