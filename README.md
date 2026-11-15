# alex-website

Personal website / portfolio of Alex.

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Three.js.

## Concept

A fullscreen 3D scene with two layers: *Home* in the foreground and *About* in the background, and you move from one to the other. The About page presents GitHub projects (featured ones plus a list of other projects, with their languages — see `app/lib/projects.ts`).

Pages: home (`/`), `/fr` (French version), `/github` (redirects to the GitHub profile), `/legal` (legal notice / GDPR).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

The site is exported statically (`output: "export"`):

```bash
npm run build
```

The result is generated in `out/`. The project uses **npm** (`package-lock.json`).
