"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { mountCodeSymbol, type CodeSymbol } from "./codeSymbol";
import { BackIcon, CodeIcon, GithubIcon, GoIcon, LocationIcon } from "./icons";
import { featured, GITHUB_URL, others, type Lang } from "./projects";

/** Style d'un calque : profondeur (z, en px) et rang dans le fondu (i). */
const layer = (z: number, i: number) => ({ "--z": `${z}px`, "--i": i }) as CSSProperties;
const dot = (c: string) => ({ "--c": c }) as CSSProperties;
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function LangTag({ lang }: { lang: Lang }) {
  return (
    <span className="lang">
      <i style={dot(lang.color)} aria-hidden="true" />
      {lang.name}
    </span>
  );
}

export default function Site() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current!;
    const body = document.body;
    const home = stage.querySelector<HTMLElement>("#home")!;
    const about = stage.querySelector<HTMLElement>("#about")!;
    const world = stage.querySelector<HTMLElement>("#world")!;
    const projects = stage.querySelector<HTMLElement>("#projects")!;
    const host = stage.querySelector<HTMLElement>("#scene")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = matchMedia("(min-width: 768px) and (min-height: 701px) and (pointer: fine)");
    const cleanups: (() => void)[] = [];
    const on = <K extends keyof WindowEventMap>(
      target: Window | Document | HTMLElement,
      type: K | string,
      fn: (e: never) => void,
    ) => {
      target.addEventListener(type, fn as EventListener);
      cleanups.push(() => target.removeEventListener(type, fn as EventListener));
    };
    const timers = new Set<number>();
    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
    };

    const symbol: CodeSymbol | null = mountCodeSymbol(host, reduce);

    // ---------- Navigation entre les deux plans (hash #about / #home / #projects) ----------
    const show = (view: "home" | "about", focus: boolean) => {
      const isAbout = view === "about";
      body.classList.toggle("is-about", isAbout);
      home.inert = isAbout;
      about.inert = !isAbout;
      symbol?.kick(isAbout);
      if (focus) {
        const target = stage.querySelector<HTMLElement>(isAbout ? "#about-title" : "#to-about")!;
        later(() => target.focus({ preventScroll: true }), reduce ? 0 : 500);
      }
    };
    // #projects : ouvre About et descend jusqu'aux projets
    const selectSection = (name: string) => {
      if (name !== "projects") {
        about.scrollTop = 0;
        return;
      }
      later(() => {
        const top =
          about.scrollTop + projects.getBoundingClientRect().top - about.getBoundingClientRect().top - 24;
        about.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      }, reduce ? 0 : 950);
    };
    const fromHash = (focus: boolean) => {
      const h = location.hash;
      selectSection(h === "#projects" ? "projects" : "about");
      show(h === "#about" || h === "#projects" ? "about" : "home", focus);
    };
    const go = (view: string) => {
      if (view !== "home") selectSection(view);
      show(view === "home" ? "home" : "about", true);
      try {
        history.replaceState(null, "", "#" + view);
      } catch {}
      stage.scrollTop = 0;
      stage.scrollLeft = 0;
    };
    // clic géré directement : pas de saut de défilement vers l'ancre
    stage.querySelectorAll<HTMLAnchorElement>('a[href="#about"], a[href="#home"], a[href="#projects"]').forEach((a) =>
      on(a, "click", (e: MouseEvent) => {
        e.preventDefault();
        go(a.getAttribute("href")!.slice(1));
      }),
    );
    on(window, "hashchange", () => fromHash(true));
    on(stage, "scroll", () => {
      stage.scrollTop = 0;
      stage.scrollLeft = 0;
    });
    on(document, "keydown", (e: KeyboardEvent) => {
      if (e.key === "Escape" && body.classList.contains("is-about")) go("home");
    });

    // retour visuel instantané au toucher (iOS n'applique pas toujours :active)
    stage.querySelectorAll<HTMLElement>(".btn, .icon-link, .project, .others a").forEach((el) => {
      on(el, "pointerdown", () => el.classList.add("is-pressed"));
      for (const t of ["pointerup", "pointercancel", "pointerleave", "blur"])
        on(el, t, () => el.classList.remove("is-pressed"));
    });
    fromHash(false);

    // ---------- Inclinaison de toute la scène + relief du texte ----------
    let px = 0, py = 0, sx = 0, sy = 0;
    on(window, "pointermove", (e: PointerEvent) => {
      px = e.clientX / innerWidth - 0.5;
      py = e.clientY / innerHeight - 0.5;
    });
    const titles = [...stage.querySelectorAll<HTMLElement>(".extrude")];
    const extrude = (dx: number, dy: number) => {
      const s: string[] = [];
      for (let i = 1; i <= 7; i++) s.push(`${(dx * i).toFixed(2)}px ${(dy * i).toFixed(2)}px 0 var(--ext)`);
      s.push(`${(dx * 14).toFixed(1)}px ${(dy * 14).toFixed(1)}px 22px rgba(0,0,0,.12)`);
      return s.join(",");
    };
    let lastShadow = "";
    const tilt = () => {
      const active = desktop.matches && !reduce;
      sx += ((active ? px : 0) - sx) * 0.07;
      sy += ((active ? py : 0) - sy) * 0.07;
      world.style.setProperty("--ry", (sx * 7).toFixed(3) + "deg");
      world.style.setProperty("--rx", (-sy * 5).toFixed(3) + "deg");
      // la tranche du texte se dessine du côté opposé au pointeur
      const sh = extrude(0.9 - sx * 1.6, 0.9 - sy * 1.6);
      if (sh !== lastShadow) {
        titles.forEach((t) => (t.style.textShadow = sh));
        lastShadow = sh;
      }
    };

    let raf = 0;
    const loop = () => {
      tilt();
      symbol?.render(px, py);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((id) => clearTimeout(id));
      cleanups.forEach((fn) => fn());
      symbol?.dispose();
      body.classList.remove("is-about");
    };
  }, []);

  return (
    <div className="stage" ref={stageRef}>
      <div className="world" id="world">
        {/* ===== Home ===== */}
        <section className="panel home" id="home" aria-labelledby="name">
          <div className="wrap">
            <div className="intro">
              <h1 className="title layer extrude" id="name" tabIndex={-1} style={layer(90, 0)}>
                Alexandre J.
              </h1>
              <p className="info layer" style={layer(45, 1)}>
                <LocationIcon />
                France, Ille-et-Vilaine
              </p>
              <p className="info layer" style={layer(45, 2)}>
                <CodeIcon />
                C#, C++, Python
              </p>
              <div className="actions layer" style={layer(70, 3)}>
                <a className="btn" id="to-about" href="#about">
                  About Me
                </a>
                <a className="icon-link" href={GITHUB_URL} {...ext} aria-label="GitHub (opens in a new tab)">
                  <GithubIcon />
                </a>
              </div>
            </div>
            <div className="visual layer" style={layer(-40, 1)}>
              <div
                className="scene"
                id="scene"
                role="img"
                aria-label="A 3D code symbol </> that rotates and follows the mouse"
              />
            </div>
          </div>
        </section>

        {/* ===== About ===== */}
        <section className="panel about" id="about" aria-labelledby="about-title" inert>
          <div className="wrap">
            <div className="col">
              <h2 className="title layer extrude" id="about-title" tabIndex={-1} style={layer(90, 0)}>
                About Me
              </h2>
              <div className="layer back-wrap" style={layer(60, 1)}>
                <a className="btn" id="to-home" href="#home" aria-label="Back">
                  <BackIcon />
                  <span className="back-label">Back</span>
                </a>
              </div>
            </div>
            <div className="col">
              <div className="tabpanel" id="tab-about">
                <p className="layer" style={layer(40, 1)}>
                  Hi, I&apos;m <strong>Alexandre</strong>, a student developer from Ille-et-Vilaine, France. I&apos;m
                  specialising in <strong>graphics programming</strong>: the code that turns geometry, light and shaders
                  into pixels.
                </p>
                <p className="layer" style={layer(40, 2)}>
                  I like building <strong>games</strong>, <strong>interactive 3D</strong>, <strong>apps and tools</strong>,
                  and small <strong>scripts</strong> that automate the boring parts.
                </p>
                <div className="layer" style={layer(30, 3)}>
                  <h3>Languages</h3>
                  <ul className="list">
                    <li>
                      C# <span>Unity games and .NET apps</span>
                    </li>
                    <li>
                      C++ <span>Engines, graphics and performance</span>
                    </li>
                    <li>
                      Python <span>Scripts, tools and automation</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="tabpanel" id="projects">
                <section className="layer" style={layer(50, 2)} aria-labelledby="feat-t">
                  <h3 id="feat-t">Featured projects</h3>
                  <ul className="projects featured-list">
                    {featured.map((p) => (
                      <li key={p.repo}>
                        <a className="project feature" href={`${GITHUB_URL}/${p.repo}`} {...ext}>
                          <b>{p.name}</b>
                          <span className="desc">{p.desc}</span>
                          <span className="meta">
                            {p.langs.map((l) => (
                              <LangTag key={l.name} lang={l} />
                            ))}
                            {p.kind && <span>{p.kind}</span>}
                          </span>
                          <GoIcon />
                          <span className="sr">(opens GitHub in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="layer" style={layer(30, 3)} aria-labelledby="other-t">
                  <h3 id="other-t">Other projects</h3>
                  <ul className="others">
                    {others.map((p) => (
                      <li key={p.repo}>
                        <a href={`${GITHUB_URL}/${p.repo}`} {...ext}>
                          <b>{p.name}</b>
                          <span className="desc">{p.desc}</span>
                          <LangTag lang={p.langs[0]} />
                          <GoIcon />
                          <span className="sr">(opens GitHub in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
                <div className="actions layer" style={layer(60, 5)}>
                  <a className="btn" href={GITHUB_URL} {...ext}>
                    <GithubIcon />
                    See my GitHub
                  </a>
                </div>
              </div>
              <p className="layer copy" style={layer(10, 5)}>
                © 2026 Alexandre J.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
