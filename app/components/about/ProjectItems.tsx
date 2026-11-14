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
const NewTab = ({ label }: { label: string }) => <span className="sr">{label}</span>;
type Props = { project: Project; text: { desc: string; kind?: string }; newTab: string };

/** Grande carte d'un projet mis en avant. */
export function FeaturedProjectCard({ project: p, text, newTab }: Props) {
  return (
    <a className="project feature" href={repoUrl(p)} {...external}>
      <b>{p.name}</b>
      <span className="desc">{text.desc}</span>
      <span className="meta">
        {p.langs.map((l) => (
          <LangTag key={l.name} lang={l} />
        ))}
        {text.kind && <span>{text.kind}</span>}
      </span>
      <GoIcon />
      <NewTab label={newTab} />
    </a>
  );
}

/** Ligne compacte d'un autre projet. */
export function ProjectRow({ project: p, text, newTab }: Props) {
  return (
    <a href={repoUrl(p)} {...external}>
      <b>{p.name}</b>
      <span className="desc">{text.desc}</span>
      <LangTag lang={p.langs[0]} />
      <GoIcon />
      <NewTab label={newTab} />
    </a>
  );
}
