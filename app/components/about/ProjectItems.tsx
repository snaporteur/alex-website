import type { CSSProperties } from "react";
import { external } from "../../lib/layer";
import { GITHUB_URL, type Lang, type Project } from "../../lib/projects";
import { GoIcon } from "../ui/icons";

export function LangTag({ lang }: { lang: Lang }) {
  return (
    <span className="lang">
      <i style={{ "--c": lang.color } as CSSProperties} aria-hidden="true" />
      {lang.name}
    </span>
  );
}

const repoUrl = (p: Project) => `${GITHUB_URL}/${p.repo}`;
const NewTab = () => <span className="sr">(opens GitHub in a new tab)</span>;

/** Grande carte d'un projet mis en avant. */
export function FeaturedProjectCard({ project: p }: { project: Project }) {
  return (
    <a className="project feature" href={repoUrl(p)} {...external}>
      <b>{p.name}</b>
      <span className="desc">{p.desc}</span>
      <span className="meta">
        {p.langs.map((l) => (
          <LangTag key={l.name} lang={l} />
        ))}
        {p.kind && <span>{p.kind}</span>}
      </span>
      <GoIcon />
      <NewTab />
    </a>
  );
}

/** Ligne compacte d'un autre projet. */
export function ProjectRow({ project: p }: { project: Project }) {
  return (
    <a href={repoUrl(p)} {...external}>
      <b>{p.name}</b>
      <span className="desc">{p.desc}</span>
      <LangTag lang={p.langs[0]} />
      <GoIcon />
      <NewTab />
    </a>
  );
}
