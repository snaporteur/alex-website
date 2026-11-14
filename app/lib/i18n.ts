export type Locale = "en" | "fr";
export const LOCALES: Locale[] = ["en", "fr"];

/** Chemin de chaque langue : l'anglais à la racine, le français sous /fr. */
export const PATHS: Record<Locale, string> = { en: "/", fr: "/fr" };

type ProjectText = { desc: string; kind?: string };

export type Dict = {
  htmlLang: string;
  meta: { title: string; description: string; ogLocale: string; jobTitle: string; keywords: string[] };
  switchLabel: string;
  legalLink: string;
  home: { location: string; langs: string; about: string; github: string; scene: string };
  about: { title: string; back: string; intro: string[]; languages: string; copyLabel: string };
  languages: { name: string; use: string }[];
  projects: { featured: string; other: string; seeGithub: string; newTab: string; items: Record<string, ProjectText> };
};

/** Les `**mots**` sont affichés en gras. */
const en: Dict = {
  htmlLang: "en",
  meta: {
    title: "Alexandre J. · Student developer (C#, C++, Python)",
    description:
      "Alexandre J., student developer from Ille-et-Vilaine, France, specialising in graphics programming. Games, interactive 3D, apps and tools in C#, C++ and Python.",
    ogLocale: "en_US",
    jobTitle: "Student developer",
    keywords: ["Alexandre J.", "developer", "graphics programming", "C#", "C++", "Python", "Unity", "portfolio"],
  },
  switchLabel: "Language",
  legalLink: "Mentions légales",
  home: {
    location: "France, Ille-et-Vilaine",
    langs: "C#, C++, Python",
    about: "About Me",
    github: "GitHub (opens in a new tab)",
    scene: "A 3D code symbol </> that rotates and follows the mouse",
  },
  about: {
    title: "About Me",
    back: "Back",
    intro: [
      "Hi, I'm **Alexandre**, a student developer from Ille-et-Vilaine, France. I'm specialising in **graphics programming**: the code that turns geometry, light and shaders into pixels.",
      "I like building **games**, **interactive 3D**, **apps and tools**, and small **scripts** that automate the boring parts.",
    ],
    languages: "Languages",
    copyLabel: "© 2026 Alexandre J.",
  },
  languages: [
    { name: "C#", use: "Unity apps and .NET apps" },
    { name: "C++", use: "Engines, graphics and performance" },
    { name: "Python", use: "Scripts, tools and automation" },
  ],
  projects: {
    featured: "Featured projects",
    other: "Other projects",
    seeGithub: "See my GitHub",
    newTab: "(opens GitHub in a new tab)",
    items: {
      "esports-player": {
        desc: "Desktop app to follow esports live and on demand from hand-picked YouTube and Twitch channels.",
        kind: "Tauri app",
      },
      "theme-manager": { desc: "A theme manager written in Rust.", kind: "Tool" },
      TheBot: { desc: "Discord bot for my friends' server.", kind: "Bot" },
      structgen: { desc: "Struct generator from .st files, with serialization." },
      "OpenGL-C--LearnProject": { desc: "Getting familiar with Silk.NET and OpenGL." },
      buildpy: { desc: "A simple build script that uses CMake." },
      dotfiles: { desc: "My personal configuration files." },
      "alex-website": { desc: "The code of this website." },
    },
  },
};

const fr: Dict = {
  htmlLang: "fr",
  meta: {
    title: "Alexandre J. · Étudiant développeur (C#, C++, Python)",
    description:
      "Alexandre J., étudiant développeur en Ille-et-Vilaine, spécialisé en programmation graphique. Jeux, 3D interactive, applications et outils en C#, C++ et Python.",
    ogLocale: "fr_FR",
    jobTitle: "Étudiant développeur",
    keywords: [
      "Alexandre J.",
      "développeur",
      "programmation graphique",
      "C#",
      "C++",
      "Python",
      "Unity",
      "portfolio",
    ],
  },
  switchLabel: "Langue",
  legalLink: "Mentions légales",
  home: {
    location: "France, Ille-et-Vilaine",
    langs: "C#, C++, Python",
    about: "À propos",
    github: "GitHub (s'ouvre dans un nouvel onglet)",
    scene: "Un symbole de code </> en 3D qui tourne et suit la souris",
  },
  about: {
    title: "À propos",
    back: "Retour",
    intro: [
      "Salut, moi c'est **Alexandre**, étudiant développeur en Ille-et-Vilaine, en France. Je me spécialise dans la **programmation graphique** : le code qui transforme la géométrie, la lumière et les shaders en pixels.",
      "J'aime créer des **jeux**, de la **3D interactive**, des **applications et des outils**, ainsi que de petits **scripts** qui automatisent les tâches ennuyeuses.",
    ],
    languages: "Langages",
    copyLabel: "© 2026 Alexandre J.",
  },
  languages: [
    { name: "C#", use: "Apps Unity et applications .NET" },
    { name: "C++", use: "Moteurs, graphismes et performances" },
    { name: "Python", use: "Scripts, outils et automatisation" },
  ],
  projects: {
    featured: "Projets mis en avant",
    other: "Autres projets",
    seeGithub: "Voir mon GitHub",
    newTab: "(ouvre GitHub dans un nouvel onglet)",
    items: {
      "esports-player": {
        desc: "Application de bureau pour suivre l'esport en direct et en replay depuis des chaînes YouTube et Twitch sélectionnées à la main.",
        kind: "Application Tauri",
      },
      "theme-manager": { desc: "Un gestionnaire de thèmes écrit en Rust.", kind: "Outil" },
      TheBot: { desc: "Bot Discord pour le serveur de mes amis.", kind: "Bot" },
      structgen: { desc: "Générateur de structures à partir de fichiers .st, avec sérialisation." },
      "OpenGL-C--LearnProject": { desc: "Prise en main de Silk.NET et d'OpenGL." },
      buildpy: { desc: "Un script de build simple qui utilise CMake." },
      dotfiles: { desc: "Mes fichiers de configuration personnels." },
      "alex-website": { desc: "Le code de ce site." },
    },
  },
};

export const dict: Record<Locale, Dict> = { en, fr };
