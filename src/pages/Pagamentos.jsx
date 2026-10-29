import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { Check, Copy, MessageCircle } from "lucide-react";
import { buildPixPayload } from "@/lib/pix";
import { PIX_KEY, PIX_NAME, PIX_CITY, PLANS, SITE } from "@/lib/siteConfig";
import { openWhatsApp, planMessage, waLink } from "@/lib/whatsapp";
import { Reveal, Eyebrow, SectionTitle } from "@/components/Reveal";
import Seo from "@/components/Seo";

const fmtMoney = (v) => `R$ ${Number(v).toFixed(2).replace(".", ",")}`;

export default function Pagamentos() {
  const [amount, setAmount] = useState(120);
  const [copied, setCopied] = useState(false);
  const payload = useMemo(
    () => buildPixPayload({ key: PIX_KEY, name: PIX_NAME, city: PIX_CITY, amount: Number(amount) || 0 }),
    [amount],
  );

  const copyKey = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="min-h-screen bg-onyx px-4 pb-24 pt-28 sm:px-8 lg:px-12">
      <Seo title="Pagamentos" description={`Planos e Pix do ${SITE.name}.`} />
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow>Mensalidades</Eyebrow>
          <SectionTitle className="mt-3">Planos e Pix</SectionTitle>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Escolha o plano, pague via Pix e confirme pelo WhatsApp. Sem checkout online — conversa direta com a academia.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <Reveal key={p.id}>
              <article
                className={`flex h-full flex-col border p-6 ${
                  p.highlight ? "border-tiger bg-tiger/5" : "border-zinc-800/80 bg-[#121215]"
                }`}
              >
                {p.highlight && (
                  <span className="mb-3 w-fit bg-tiger px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-onyx">
                    Mais escolhido
                  </span>
                )}
                <h3 className="font-display text-3xl uppercase text-zinc-50">{p.name}</h3>
                <p className="mt-2 font-mono text-2xl text-tiger">
                  {fmtMoney(p.price)} <span className="text-sm text-zinc-500">{p.period}</span>
                </p>
                <ul className="mt-5 flex-1 space-y-2 text-sm text-zinc-400">
                  {p.perks.map((perk) => (
                    <li key={perk}>· {perk}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    setAmount(p.price);
                    openWhatsApp(planMessage(p.name));
                  }}
                  className="mt-6 inline-flex items-center justify-center gap-2 bg-tiger py-3 text-xs font-bold uppercase tracking-wider text-onyx hover:bg-orange-400"
                >
                  <MessageCircle size={14} /> Quero este plano
                </button>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border border-zinc-800/80 bg-[#121215] p-6 sm:p-8">
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-tiger">Pix da academia</h3>
            <div className="mt-5 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
              <div className="border border-zinc-700 bg-white p-2">
                <QRCodeCanvas value={payload} size={168} level="M" marginSize={2} bgColor="#ffffff" fgColor="#09090b" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Chave Pix (e-mail)</p>
                <p className="mt-1 break-all font-mono text-sm text-zinc-100">{PIX_KEY}</p>
                <label className="mt-4 block text-left">
                  <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">Valor do QR (R$)</span>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    className="field"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </label>
                <button
                  type="button"
                  onClick={copyKey}
                  className="mt-4 inline-flex items-center gap-2 border border-zinc-600 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-zinc-100 transition-colors hover:border-tiger hover:text-tiger"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  {copied ? "Chave copiada!" : "Copiar chave Pix"}
                </button>
              </div>
            </div>
          </div>

          <div className="border border-zinc-800/80 bg-[#121215] p-6 sm:p-8">
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-tiger">Como pagar</h3>
            <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-zinc-400">
              <li>Escaneie o QR ou copie a chave Pix.</li>
              <li>Faça o pagamento no valor do seu plano.</li>
              <li>
                Mande o comprovante no{" "}
                <a className="font-bold text-tiger hover:text-orange-300" href={waLink("Olá! Segue o comprovante do Pix.")} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
                .
              </li>
            </ol>
            <p className="mt-6 text-xs text-zinc-500">
              Área do aluno (demo) mostra histórico local após{" "}
              <Link to="/login" className="text-tiger hover:text-orange-300">
                entrar
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
