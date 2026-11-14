import { external, layer } from "../../lib/layer";
import type { Dict } from "../../lib/i18n";
import { featured, GITHUB_URL, others } from "../../lib/projects";
import { GithubIcon } from "../ui/icons";
import { FeaturedProjectCard, ProjectRow } from "./ProjectItems";

export default function Projects({ t }: { t: Dict }) {
  const { items, newTab } = t.projects;
  return (
    <div className="tabpanel" id="projects">
      <section className="layer" style={layer(50, 2)} aria-labelledby="feat-t">
        <h3 id="feat-t">{t.projects.featured}</h3>
        <ul className="projects featured-list">
          {featured.map((p) => (
            <li key={p.repo}>
              <FeaturedProjectCard project={p} text={items[p.repo]} newTab={newTab} />
            </li>
          ))}
        </ul>
      </section>
      <section className="layer" style={layer(30, 3)} aria-labelledby="other-t">
        <h3 id="other-t">{t.projects.other}</h3>
        <ul className="others">
          {others.map((p) => (
            <li key={p.repo}>
              <ProjectRow project={p} text={items[p.repo]} newTab={newTab} />
            </li>
          ))}
        </ul>
      </section>
      <div className="actions layer" style={layer(60, 5)}>
        <a className="btn" href={GITHUB_URL} {...external}>
          <GithubIcon />
          {t.projects.seeGithub}
        </a>
      </div>
    </div>
  );
}
