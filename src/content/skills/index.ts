import type { SkillGuide } from "./types";
import { uxResearchGuide } from "./ux-research";

export * from "./types";
export { uxResearchGuide };

/** Guias publicados, por slug. A rota /skills/[slug], o sitemap e o índice leem daqui. */
export const guides: Record<string, SkillGuide> = {
  [uxResearchGuide.slug]: uxResearchGuide,
};

export function getGuide(slug: string): SkillGuide | undefined {
  return guides[slug];
}

export const REPO_URL = "https://github.com/Gustavosilveira23/claude-design-skills";
export { catalog, indexCopy, INSTALL_ALL, type CatalogEntry } from "./catalog";
