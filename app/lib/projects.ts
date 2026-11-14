export type Lang = { name: string; color: string };

export type Project = {
  name: string;
  repo: string;
  langs: Lang[];
};

const L = {
  cs: { name: "C#", color: "var(--l-cs)" },
  cpp: { name: "C++", color: "var(--l-cpp)" },
  rust: { name: "Rust", color: "var(--l-rust)" },
  py: { name: "Python", color: "var(--l-py)" },
  ts: { name: "TypeScript", color: "var(--l-ts)" },
  lua: { name: "Lua", color: "var(--l-lua)" },
} satisfies Record<string, Lang>;

export const GITHUB_URL = "https://github.com/snaporteur";

export const featured: Project[] = [
  {
    name: "esports-player",
    repo: "esports-player",
    langs: [L.ts, L.rust],
  },
  {
    name: "theme-manager",
    repo: "theme-manager",
    langs: [L.rust],
  },
  {
    name: "TheBot",
    repo: "TheBot",
    langs: [L.py],
  },
];

export const others: Project[] = [
  { name: "structgen", repo: "structgen", langs: [L.cpp] },
  { name: "OpenGL Sandbox", repo: "OpenGL-C--LearnProject", langs: [L.cs] },
  { name: "buildpy", repo: "buildpy", langs: [L.py] },
  { name: "dotfiles", repo: "dotfiles", langs: [L.lua] },
  { name: "alex-website", repo: "alex-website", langs: [L.ts] },
];
