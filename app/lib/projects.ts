export type Lang = { name: string; color: string };

export type Project = {
  name: string;
  repo: string;
  desc: string;
  langs: Lang[];
  kind?: string;
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
    desc: "Desktop app to follow esports live and on demand from hand-picked YouTube and Twitch channels.",
    langs: [L.ts, L.rust],
    kind: "Tauri app",
  },
  {
    name: "theme-manager",
    repo: "theme-manager",
    desc: "A theme manager written in Rust.",
    langs: [L.rust],
    kind: "Tool",
  },
  {
    name: "TheBot",
    repo: "TheBot",
    desc: "Discord bot for my friends' server.",
    langs: [L.py],
    kind: "Bot",
  },
];

export const others: Project[] = [
  { name: "structgen", repo: "structgen", desc: "Struct generator from .st files, with serialization.", langs: [L.cpp] },
  { name: "OpenGL Sandbox", repo: "OpenGL-C--LearnProject", desc: "Getting familiar with Silk.NET and OpenGL.", langs: [L.cs] },
  { name: "buildpy", repo: "buildpy", desc: "A simple build script that uses CMake.", langs: [L.py] },
  { name: "dotfiles", repo: "dotfiles", desc: "My personal configuration files.", langs: [L.lua] },
  { name: "alex-website", repo: "alex-website", desc: "The code of this website.", langs: [L.ts] },
];
