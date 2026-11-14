"use client";

import { dict, LOCALES, PATHS, type Locale } from "../lib/i18n";

/** Sélecteur EN / FR discret, en haut à droite. Le choix est mémorisé (il prime sur la détection automatique). */
export default function LangSwitch({ locale }: { locale: Locale }) {
  const choose = (target: Locale) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      localStorage.setItem("lang", target);
    } catch {}
    // on garde la section ouverte (#about, #projects)
    e.preventDefault();
    location.assign(PATHS[target] + location.hash);
  };
  return (
    <nav className="lang-switch" aria-label={dict[locale].switchLabel}>
      {LOCALES.map((l) =>
        l === locale ? (
          <span key={l} aria-current="true">
            {l.toUpperCase()}
          </span>
        ) : (
          <a key={l} href={PATHS[l]} lang={l} hrefLang={l} onClick={choose(l)}>
            {l.toUpperCase()}
          </a>
        ),
      )}
    </nav>
  );
}
