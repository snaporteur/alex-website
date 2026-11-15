"use client";

import { useEffect, useState } from "react";
import { external, layer } from "../../lib/layer";
import type { Dict } from "../../lib/i18n";
import { fetchSiteProjects } from "../../lib/alpjm";
import { GITHUB_URL, type Project } from "../../lib/projects";
import { GithubIcon } from "../ui/icons";
import { FeaturedProjectCard, ProjectRow } from "./ProjectItems";

export default function Projects({ t }: { t: Dict }) {
  const { items, newTab } = t.projects;
  // Les projets viennent uniquement d'AlPjM : rien n'est affiché tant que l'API n'a pas répondu.
  const [{ featured, others }, setLists] = useState<{
    featured: Project[];
    others: Project[];
  }>({
    featured: [],
    others: [],
  });
  useEffect(() => {
    const ctrl = new AbortController();
    fetchSiteProjects(ctrl.signal)
      .then(setLists)
      .catch(() => {});
    return () => ctrl.abort();
  }, []);
  const text = (p: Project) =>
    items[p.repo] ?? { desc: p.desc ?? "", kind: p.kind };
  return (
    <div className="tabpanel" id="projects">
      {featured.length > 0 && (
        <section
          className="layer"
          style={layer(50, 2)}
          aria-labelledby="feat-t"
        >
          <h3 id="feat-t">{t.projects.featured}</h3>
          <ul className="projects featured-list">
            {featured.map((p) => (
              <li key={p.repo}>
                <FeaturedProjectCard
                  project={p}
                  text={text(p)}
                  newTab={newTab}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
      {others.length > 0 && (
        <section
          className="layer"
          style={layer(30, 3)}
          aria-labelledby="other-t"
        >
          <h3 id="other-t">{t.projects.other}</h3>
          <ul className="others">
            {others.map((p) => (
              <li key={p.repo}>
                <ProjectRow project={p} text={text(p)} newTab={newTab} />
              </li>
            ))}
          </ul>
        </section>
      )}
      <div className="actions layer" style={layer(60, 5)}>
        <a className="btn" href={GITHUB_URL} {...external}>
          <GithubIcon />
          {t.projects.seeGithub}
        </a>
      </div>
    </div>
  );
}
