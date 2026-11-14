import { external, layer } from "../../lib/layer";
import type { Dict } from "../../lib/i18n";
import { GITHUB_URL } from "../../lib/projects";
import { CodeIcon, GithubIcon, LocationIcon } from "../ui/icons";

export default function HomePanel({ t }: { t: Dict }) {
  return (
    <section className="panel home" id="home" aria-labelledby="name">
      <div className="wrap">
        <div className="intro">
          <h1 className="title layer extrude" id="name" tabIndex={-1} style={layer(90, 0)}>
            Alexandre J.
          </h1>
          <p className="info layer" style={layer(45, 1)}>
            <LocationIcon />
            {t.home.location}
          </p>
          <p className="info layer" style={layer(45, 2)}>
            <CodeIcon />
            {t.home.langs}
          </p>
          <div className="actions layer" style={layer(70, 3)}>
            <a className="btn" id="to-about" href="#about">
              {t.home.about}
            </a>
            <a className="icon-link" href={GITHUB_URL} {...external} aria-label={t.home.github}>
              <GithubIcon />
            </a>
          </div>
        </div>
        <div className="visual layer" style={layer(-40, 1)}>
          <div className="scene" id="scene" role="img" aria-label={t.home.scene} />
        </div>
      </div>
    </section>
  );
}
