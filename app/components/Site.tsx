"use client";

import Link from "next/link";
import { useRef } from "react";
import { dict, type Locale } from "../lib/i18n";
import { useStage } from "../lib/useStage";
import HomePanel from "./home/HomePanel";
import AboutPanel from "./about/AboutPanel";
import LangSwitch from "./LangSwitch";

/** Scène 3D plein écran : le plan Home devant, le plan About au fond. */
export default function Site({ locale }: { locale: Locale }) {
  const stageRef = useRef<HTMLDivElement>(null);
  useStage(stageRef);
  const t = dict[locale];

  return (
    <div className="stage" ref={stageRef}>
      <div className="world" id="world">
        <HomePanel t={t} />
        <AboutPanel t={t} />
      </div>
      {/* hors de .world : fixes, ils ne suivent ni l'inclinaison ni les transitions de la scène */}
      <LangSwitch locale={locale} />
      <Link className="legal-link" href="/legal" lang="fr">
        {t.legalLink}
      </Link>
    </div>
  );
}
