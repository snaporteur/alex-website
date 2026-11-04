import Link from "next/link";
import { external, layer } from "../../lib/layer";
import { GITHUB_URL } from "../../lib/projects";
import { CodeIcon, GithubIcon, LocationIcon } from "../ui/icons";

export default function HomePanel() {
  return (
    <section className="panel home" id="home" aria-labelledby="name">
      <div className="wrap">
        <div className="intro">
          <h1 className="title layer extrude" id="name" tabIndex={-1} style={layer(90, 0)}>
            Alexandre J.
          </h1>
          <p className="info layer" style={layer(45, 1)}>
            <LocationIcon />
            France, Ille-et-Vilaine
          </p>
          <p className="info layer" style={layer(45, 2)}>
            <CodeIcon />
            C#, C++, Python
          </p>
          <div className="actions layer" style={layer(70, 3)}>
            <a className="btn" id="to-about" href="#about">
              About Me
            </a>
            <a className="icon-link" href={GITHUB_URL} {...external} aria-label="GitHub (opens in a new tab)">
              <GithubIcon />
            </a>
          </div>
        </div>
        <div className="visual layer" style={layer(-40, 1)}>
          <div
            className="scene"
            id="scene"
            role="img"
            aria-label="A 3D code symbol </> that rotates and follows the mouse"
          />
        </div>
      </div>
      <Link className="legal-link" href="/legal" lang="fr">
        Mentions légales
      </Link>
    </section>
  );
}
