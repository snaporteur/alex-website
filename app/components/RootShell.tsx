import { Inter } from "next/font/google";
import "../globals.css";
import { dict, PATHS, type Locale } from "../lib/i18n";
import { GITHUB_URL } from "../lib/projects";
import { SITE_NAME, SITE_URL } from "../lib/site";

const inter = Inter({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
  variable: "--font-inter",
});

/** Première visite sur « / » avec un navigateur en français et sans choix mémorisé → /fr.
    Exécuté avant l'affichage ; les robots (navigateur en anglais) ne sont jamais redirigés. */
const AUTO_LANG = `try{if(location.pathname==="/"&&!localStorage.getItem("lang")){var l=(navigator.languages&&navigator.languages[0])||navigator.language||"";if(/^fr(-|$)/i.test(l))location.replace("/fr"+location.search+location.hash)}}catch(e){}`;

/** <html> et <body> communs aux deux langues (chaque langue a son propre layout racine). */
export default function RootShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const { meta, htmlLang } = dict[locale];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL + (PATHS[locale] === "/" ? "" : PATHS[locale]),
    description: meta.description,
    jobTitle: meta.jobTitle,
    address: { "@type": "PostalAddress", addressRegion: "Ille-et-Vilaine", addressCountry: "FR" },
    knowsAbout: ["Graphics programming", "C#", "C++", "Python", "Game development"],
    sameAs: [GITHUB_URL],
  };
  return (
    <html lang={htmlLang} className={inter.variable}>
      <body>
        {locale === "en" && <script dangerouslySetInnerHTML={{ __html: AUTO_LANG }} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
