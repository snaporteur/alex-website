# alex-website

Personal website / portfolio of Alex.

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Three.js.

## Concept

A fullscreen 3D scene with two layers: *Home* in the foreground and *About* in the background, and you move from one to the other. The About page presents GitHub projects (featured ones plus a list of other projects, with their languages), loaded from AlPjM.

Pages: home (`/`), `/fr` (French version), `/legal` (legal notice / GDPR).

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

## Projects from AlPjM

The projects shown on the About page are read live (in the browser) from the AlPjM REST API, with a **read-only API key** limited to the projects of one workspace. There is no list in the code: if the API is unreachable or no project is tagged, the project sections are hidden.

Configure at build time (see `.env.example`; these values end up in the public bundle, so only use a read-only key):

| Variable | Notes |
| --- | --- |
| `NEXT_PUBLIC_ALPJM_API_KEY` | Read-only AlPjM API key. Required. |
| `NEXT_PUBLIC_ALPJM_URL` | Default `https://alpjm.alexandre35.fr`. |
| `NEXT_PUBLIC_ALPJM_WORKSPACE` | Workspace slug. Default: first workspace the key can reach. |

AlPjM must allow cross-origin requests (CORS) from the site's origin.

**Convention**: in the AlPjM project description, add one line each:

```
site: featured            # featured card (or `site: public` for the "other projects" list)
langs: TypeScript, Rust   # optional
kind: Tauri app           # optional
```

Projects without a `site:` line are not shown. The repository URL of the project is the link; the first paragraph of the description is used as text unless `app/lib/i18n.ts` has a translation for that repository name.
