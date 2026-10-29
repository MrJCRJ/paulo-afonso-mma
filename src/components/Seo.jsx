import { Helmet } from "react-helmet-async";
import { SITE } from "@/lib/siteConfig";

export default function Seo({ title, description }) {
  const full = title ? `${title} · ${SITE.name}` : `${SITE.name} — Muay Thai & Boxe | ${SITE.city} - BA`;
  const desc =
    description ||
    `${SITE.name} — Muay Thai & Boxe em ${SITE.city}, ${SITE.state}. ${SITE.team}, forjando campeões desde ${SITE.founded}.`;
  return (
    <Helmet>
      <title>{full}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={desc} />
    </Helmet>
  );
}
