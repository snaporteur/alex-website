export type Lang = { name: string; color: string };

export type Project = {
  name: string;
  /** Clé d'identification (nom du dépôt) ; sert aussi à retrouver les textes traduits. */
  repo: string;
  /** Lien du projet (dépôt GitHub). */
  url?: string;
  langs: Lang[];
  /** Texte venant d'AlPjM, utilisé quand il n'y a pas de traduction dans i18n.ts. */
  desc?: string;
  kind?: string;
};

export const L = {
  cs: { name: "C#", color: "var(--l-cs)" },
  cpp: { name: "C++", color: "var(--l-cpp)" },
  rust: { name: "Rust", color: "var(--l-rust)" },
  py: { name: "Python", color: "var(--l-py)" },
  ts: { name: "TypeScript", color: "var(--l-ts)" },
  lua: { name: "Lua", color: "var(--l-lua)" },
} satisfies Record<string, Lang>;

export const GITHUB_URL = "https://github.com/snaporteur";
