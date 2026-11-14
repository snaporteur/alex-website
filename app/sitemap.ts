import type { MetadataRoute } from "next";
import { PATHS } from "./lib/i18n";
import { SITE_URL } from "./lib/site";

export const dynamic = "force-static";

const languages = { en: `${SITE_URL}${PATHS.en}`, fr: `${SITE_URL}${PATHS.fr}`, "x-default": `${SITE_URL}${PATHS.en}` };

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: languages.en, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: languages.fr, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${SITE_URL}/legal`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
