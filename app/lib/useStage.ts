"use client";

import { useEffect, type RefObject } from "react";
import { mountCodeSymbol } from "./codeSymbol";

/**
 * Anime la scène : navigation Home ⇄ About (hash #home / #about / #projects),
 * inclinaison de la scène et relief des titres selon le pointeur, et le </> en Three.js.
 */
export function useStage(stageRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const body = document.body;
    const home = stage.querySelector<HTMLElement>("#home")!;
    const about = stage.querySelector<HTMLElement>("#about")!;
    const world = stage.querySelector<HTMLElement>("#world")!;
    const projects = stage.querySelector<HTMLElement>("#projects")!;
    const host = stage.querySelector<HTMLElement>("#scene")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = matchMedia("(min-width: 768px) and (min-height: 701px) and (pointer: fine)");

    const cleanups: (() => void)[] = [];
    const on = (target: EventTarget, type: string, fn: (e: never) => void) => {
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

    const symbol = mountCodeSymbol(host, reduce);

    // ---------- Navigation entre les deux plans ----------
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
    stage
      .querySelectorAll<HTMLAnchorElement>('a[href="#about"], a[href="#home"], a[href="#projects"]')
      .forEach((a) =>
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
  }, [stageRef]);
}
