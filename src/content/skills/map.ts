// Dado da lista das skills em /skills (Editorial com o Metrô ao lado, components/skills-map).
// As conexões são as passagens que cada SKILL.md declara (repo claude-design-skills, 18/11/2026):
// "Hands off to ..." no frontmatter e, na figma-craft, a seção "Fronteiras". Nada de conexão
// inventada para fechar o desenho. frontend-design (Anthropic) fica fora: não é skill do repo.
// design-system e ui-designer dividem a mesma etapa, sem ordem entre elas (decisão de 18/11).

import type { L } from "./types";

export type MapSkill = {
  slug: string;
  /** Etapa no processo. A figma-craft fica fora da sequência: é a ponte para o Figma. */
  stage: 1 | 2 | 3 | 4 | "side";
  /** A pergunta que a skill responde. Curta: cabe no painel em 390px. */
  question: L;
};

export const mapSkills: MapSkill[] = [
  {
    slug: "ux-research",
    stage: 1,
    question: { en: "What should we build, and what is the evidence?", pt: "O que construir, e qual é a evidência?" },
  },
  {
    slug: "ux-designer",
    stage: 2,
    question: { en: "How should this experience work?", pt: "Como essa experiência deve funcionar?" },
  },
  {
    slug: "design-system",
    stage: 3,
    question: { en: "Is every screen using the same tokens?", pt: "Toda tela usa os mesmos tokens?" },
  },
  {
    slug: "ui-designer",
    stage: 3,
    question: { en: "Does the screen hold up once rendered?", pt: "A tela se sustenta depois de renderizada?" },
  },
  {
    slug: "creative-coding",
    stage: 4,
    question: { en: "Should this move, and how?", pt: "Isso deve se mover, e como?" },
  },
  {
    slug: "figma-craft",
    stage: "side",
    question: { en: "Will the Figma file keep its auto layout?", pt: "O arquivo do Figma mantém o auto layout?" },
  },
];

/** Passagens declaradas: de quem passa para quem. */
export const handoffs: Record<string, string[]> = {
  "ux-research": ["ux-designer"],
  "ux-designer": ["design-system", "ui-designer", "ux-research"],
  "design-system": ["ui-designer", "ux-designer"],
  "ui-designer": ["design-system", "ux-designer"],
  "creative-coding": ["design-system", "ui-designer", "ux-designer"],
  "figma-craft": ["ui-designer", "design-system", "ux-designer"],
};

/** Pares sem direção, sem repetir (a-b e b-a viram uma linha só). */
export const mapEdges: [string, string][] = (() => {
  const seen = new Set<string>();
  const out: [string, string][] = [];
  for (const [from, tos] of Object.entries(handoffs)) {
    for (const to of tos) {
      const key = [from, to].sort().join("|");
      if (!seen.has(key)) {
        seen.add(key);
        out.push([from, to]);
      }
    }
  }
  return out;
})();

export const mapCopy = {
  label: { en: "How the skills connect", pt: "Como as skills se conectam" },
  title: { en: "Each skill knows when to pass the work on.", pt: "Cada skill sabe quando passar o trabalho adiante." },
  handsOff: { en: "Hands off to", pt: "Passa para" },
  stages: {
    1: { en: "Evidence", pt: "Evidência" },
    2: { en: "Experience", pt: "Experiência" },
    3: { en: "Interface", pt: "Interface" },
    4: { en: "Motion", pt: "Movimento" },
    side: { en: "In Figma", pt: "No Figma" },
  },
};
