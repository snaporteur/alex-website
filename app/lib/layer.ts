import type { CSSProperties } from "react";

/** Style d'un calque de la scène 3D : profondeur (z, en px) et rang dans le fondu (i). */
export const layer = (z: number, i: number) => ({ "--z": `${z}px`, "--i": i }) as CSSProperties;

/** Attributs d'un lien externe ouvert dans un nouvel onglet. */
export const external = { target: "_blank", rel: "noopener noreferrer" } as const;
