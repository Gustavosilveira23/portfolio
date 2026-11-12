// Modelo de conteúdo dos guias de skill. Ver .docs/Spec.md, "Modelo de conteúdo".

export type Locale = "en" | "pt";

/** Texto nas duas línguas. `pt` é obrigatório: o tipo cobra a tradução de todo campo novo. */
export type L = { en: string; pt: string };

export type GuideBlock =
  | { type: "p"; text: L }
  /** `wrap`: texto corrido (um prompt) quebra a linha; saída com colunas alinhadas rola no celular. */
  | { type: "code"; label?: L; code: L; wrap?: boolean }
  /** `total`: a última linha soma as de cima (ganha borda de fechamento, não uma cor nova). */
  | { type: "table"; head: L[]; rows: L[][]; total?: boolean }
  | { type: "list"; items: L[] }
  | { type: "callout"; label: L; text: L }
  | { type: "install"; command: string }
  | { type: "conversation"; turns: { role: "user" | "skill"; text: L }[] };

/** `nav` é o rótulo curto do sumário lateral; o título do H2 é longo demais para lá. */
export type GuideSection = { id: string; nav: L; title: L; blocks: GuideBlock[] };

export type SkillGuide = {
  slug: string;
  /** Pasta da skill no repo claude-design-skills. */
  repoPath: string;
  published: string;
  updated: string;
  meta: { title: L; description: L };
  breadcrumb: L;
  h1: L;
  lead: L;
  sections: GuideSection[];
  faq: { q: L; a: L }[];
  /** Uma ou duas frases no cartão de autor do fim. Quem é já está na home; aqui é só o sinal. */
  author: L;
};

export function pick(text: L, locale: Locale) {
  return (locale === "pt" && text.pt) || text.en;
}

/** Texto corrido do guia, sem marcação. Serve para contar palavras. */
function plainText(guide: SkillGuide, locale: Locale) {
  const parts: string[] = [pick(guide.h1, locale), pick(guide.lead, locale)];
  for (const section of guide.sections) {
    parts.push(pick(section.title, locale));
    for (const block of section.blocks) {
      if (block.type === "p") parts.push(pick(block.text, locale));
      if (block.type === "code") parts.push(pick(block.code, locale));
      if (block.type === "callout") parts.push(pick(block.text, locale));
      if (block.type === "list") parts.push(...block.items.map((i) => pick(i, locale)));
      if (block.type === "table") parts.push(...block.rows.flat().map((c) => pick(c, locale)));
      if (block.type === "conversation") parts.push(...block.turns.map((t) => pick(t.text, locale)));
    }
  }
  for (const item of guide.faq) parts.push(pick(item.q, locale), pick(item.a, locale));
  return parts.join(" ");
}

export function readingMinutes(guide: SkillGuide, locale: Locale) {
  const words = plainText(guide, locale).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}
