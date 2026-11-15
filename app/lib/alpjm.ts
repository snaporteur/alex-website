import { GITHUB_URL, L, type Lang, type Project } from "./projects";

/**
 * Projets affichés sur le site, lus en direct dans AlPjM (API REST, clé en lecture seule).
 *
 * Variables d'environnement (lues au build, donc publiques) :
 *  - NEXT_PUBLIC_ALPJM_URL       adresse d'AlPjM (défaut : https://alpjm.alexandre35.fr)
 *  - NEXT_PUBLIC_ALPJM_API_KEY   clé API en lecture seule sur les projets
 *  - NEXT_PUBLIC_ALPJM_WORKSPACE slug du workspace (défaut : le premier accessible avec la clé)
 *
 * Convention, à écrire dans la description du projet AlPjM (une ligne chacune) :
 *   site: featured            projet mis en avant     (ou `site: public` pour la liste « autres »)
 *   langs: TypeScript, Rust   langages affichés       (facultatif)
 *   kind: Tauri app           étiquette               (facultatif)
 * Sans `site:`, le projet n'est pas affiché. Le reste de la description (1er paragraphe) sert de
 * texte quand aucune traduction n'existe dans i18n.ts.
 */
const BASE = (process.env.NEXT_PUBLIC_ALPJM_URL ?? "https://alpjm.alexandre35.fr").replace(/\/$/, "");
const KEY = process.env.NEXT_PUBLIC_ALPJM_API_KEY;
const WORKSPACE = process.env.NEXT_PUBLIC_ALPJM_WORKSPACE;

type ApiProject = { name?: string; description?: string | null; repositoryUrl?: string | null };

const LANGS: Record<string, Lang> = {
  "c#": L.cs, csharp: L.cs, "c++": L.cpp, cpp: L.cpp, rust: L.rust, python: L.py, py: L.py,
  typescript: L.ts, ts: L.ts, lua: L.lua,
};
const otherLang = (name: string): Lang => ({ name, color: "var(--muted, #888)" });

async function get<T>(path: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${BASE}/api/v1${path}`, { headers: { Authorization: `Bearer ${KEY}` }, signal });
  if (!res.ok) throw new Error(`AlPjM ${res.status}`);
  return res.json();
}

const field = (desc: string, key: string) =>
  new RegExp(`^\\s*${key}\\s*:\\s*(.+?)\\s*$`, "im").exec(desc)?.[1];

function toProject(p: ApiProject): { project: Project; featured: boolean } | null {
  const desc = p.description ?? "";
  const site = field(desc, "site")?.toLowerCase();
  if ((site !== "featured" && site !== "public") || !p.name) return null;
  const url = p.repositoryUrl ?? undefined;
  const repo = url?.replace(/\.git$/, "").split("/").pop() ?? p.name;
  const text = desc
    .split(/\r?\n/)
    .filter((l) => !/^\s*(site|langs|kind)\s*:/i.test(l))
    .join("\n")
    .split(/\n\s*\n/)
    .map((x) => x.trim())
    .find(Boolean);
  const langs = (field(desc, "langs") ?? "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)
    .map((x) => LANGS[x.toLowerCase()] ?? otherLang(x));
  return {
    featured: site === "featured",
    project: {
      name: p.name,
      repo,
      url: url?.startsWith(GITHUB_URL) ? url.replace(/\.git$/, "") : url,
      langs,
      desc: text?.replace(/[*_`]/g, ""),
      kind: field(desc, "kind"),
    },
  };
}

export async function fetchSiteProjects(signal?: AbortSignal) {
  if (!KEY) throw new Error("NEXT_PUBLIC_ALPJM_API_KEY is not set");
  const slug = WORKSPACE ?? (await get<{ slug: string }[]>("/workspaces", signal))[0]?.slug;
  const list = await get<ApiProject[]>(`/workspaces/${slug}/projects`, signal);
  const parsed = list.map(toProject).filter((x) => x !== null);
  return {
    featured: parsed.filter((x) => x.featured).map((x) => x.project),
    others: parsed.filter((x) => !x.featured).map((x) => x.project),
  };
}
