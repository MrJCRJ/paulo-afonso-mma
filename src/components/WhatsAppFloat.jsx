import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/siteConfig";
import { waLink } from "@/lib/whatsapp";

export default function WhatsAppFloat() {
  return (
    <a
      href={waLink(`Olá! Vim pelo site do ${SITE.name} e quero saber sobre as turmas.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-tiger text-onyx shadow-[0_0_28px_rgba(249,115,22,0.45)] transition hover:scale-105 hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tiger"
    >
      <MessageCircle size={26} strokeWidth={2.2} />
    </a>
  );
}
