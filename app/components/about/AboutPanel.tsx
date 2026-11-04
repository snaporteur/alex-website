import Link from "next/link";
import { layer } from "../../lib/layer";
import { BackIcon } from "../ui/icons";
import AboutIntro from "./AboutIntro";
import Projects from "./Projects";

export default function AboutPanel() {
  return (
    <section className="panel about" id="about" aria-labelledby="about-title" inert>
      <div className="wrap">
        <div className="col">
          <h2 className="title layer extrude" id="about-title" tabIndex={-1} style={layer(90, 0)}>
            About Me
          </h2>
          <div className="layer back-wrap" style={layer(60, 1)}>
            <a className="btn" id="to-home" href="#home" aria-label="Back">
              <BackIcon />
              <span className="back-label">Back</span>
            </a>
          </div>
        </div>
        <div className="col">
          <AboutIntro />
          <Projects />
          <p className="layer copy" style={layer(10, 5)}>
            © 2026 Alexandre J. ·{" "}
            <Link href="/legal" lang="fr">
              Mentions légales
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
