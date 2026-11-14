import Link from "next/link";
import { layer } from "../../lib/layer";
import type { Dict } from "../../lib/i18n";
import { BackIcon } from "../ui/icons";
import AboutIntro from "./AboutIntro";
import Projects from "./Projects";

export default function AboutPanel({ t }: { t: Dict }) {
  return (
    <section className="panel about" id="about" aria-labelledby="about-title" inert>
      <div className="wrap">
        <div className="col">
          <h2 className="title layer extrude" id="about-title" tabIndex={-1} style={layer(90, 0)}>
            {t.about.title}
          </h2>
          <div className="layer back-wrap" style={layer(60, 1)}>
            <a className="btn" id="to-home" href="#home" aria-label={t.about.back}>
              <BackIcon />
              <span className="back-label">{t.about.back}</span>
            </a>
          </div>
        </div>
        <div className="col">
          <AboutIntro t={t} />
          <Projects t={t} />
          <p className="layer copy" style={layer(10, 5)}>
            {t.about.copyLabel} ·{" "}
            <Link href="/legal" lang="fr">
              {t.legalLink}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
