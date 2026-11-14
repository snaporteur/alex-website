import type { Metadata, Viewport } from "next";
import { dict, PATHS, type Locale } from "./i18n";

export const SITE_URL = "https://alexandre35.fr";
export const SITE_NAME = "Alexandre J.";

export const VIEWPORT: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

/** Métadonnées d'une langue : titre, Open Graph, canonique et liens hreflang. */
export function buildMetadata(locale: Locale): Metadata {
  const { meta } = dict[locale];
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: meta.title, template: `%s · ${SITE_NAME}` },
    description: meta.description,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    keywords: meta.keywords,
    alternates: {
      canonical: PATHS[locale],
      languages: { en: PATHS.en, fr: PATHS.fr, "x-default": PATHS.en },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
    openGraph: {
      type: "website",
      url: PATHS[locale],
      siteName: SITE_NAME,
      title: meta.title,
      description: meta.description,
      locale: meta.ogLocale,
      alternateLocale: locale === "en" ? dict.fr.meta.ogLocale : dict.en.meta.ogLocale,
    },
    twitter: { card: "summary", title: meta.title, description: meta.description },
  };
}
