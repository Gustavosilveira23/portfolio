// Gera a versão markdown de um guia a partir do mesmo conteúdo da página.
// Serve em /skills/<slug>.md para IA e agentes que preferem texto puro (llms.txt aponta para cá).

import { BASE_URL } from "@/lib/seo";
import { pick, type GuideBlock, type Locale, type SkillGuide } from "./types";

const labels = {
  en: { by: "By", updated: "Updated", license: "MIT license", faq: "Frequently asked questions", source: "Source", page: "Web version" },
  pt: { by: "Por", updated: "Atualizado em", license: "Licença MIT", faq: "Perguntas frequentes", source: "Código", page: "Versão web" },
};

/** Links internos viram absolutos (com /pt quando for o caso): fora do site, "/contact" não leva a lugar nenhum. */
function absolutize(text: string, locale: Locale) {
  const prefix = locale === "pt" ? "/pt" : "";
  return text.replace(/\]\(\/([^)]*)\)/g, (_, path) => `](${BASE_URL}${prefix}/${path})`);
}

function cell(text: string) {
  return text.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function block(b: GuideBlock, locale: Locale): string {
  switch (b.type) {
    case "p":
      return absolutize(pick(b.text, locale), locale);
    case "code": {
      const label = b.label ? `${pick(b.label, locale)}\n\n` : "";
      return `${label}\`\`\`\n${pick(b.code, locale)}\n\`\`\``;
    }
    case "table": {
      const head = `| ${b.head.map((h) => cell(pick(h, locale))).join(" | ")} |`;
      const sep = `| ${b.head.map(() => "---").join(" | ")} |`;
      const rows = b.rows.map((r, i) => {
        const isTotal = b.total && i === b.rows.length - 1;
        return `| ${r.map((c) => (isTotal ? `**${cell(pick(c, locale))}**` : cell(pick(c, locale)))).join(" | ")} |`;
      });
      return [head, sep, ...rows].join("\n");
    }
    case "list":
      return b.items.map((i) => `- ${absolutize(pick(i, locale), locale)}`).join("\n");
    case "callout":
      return `> **${pick(b.label, locale)}** ${pick(b.text, locale)}`;
    case "install":
      return `\`\`\`bash\n${b.command}\n\`\`\``;
    case "conversation":
      return `\`\`\`text\n${b.turns
        .map((t) => (t.role === "user" ? `> ${pick(t.text, locale)}` : pick(t.text, locale)))
        .join("\n\n")}\n\`\`\``;
  }
}

export function guideToMarkdown(guide: SkillGuide, locale: Locale, repoUrl: string) {
  const l = labels[locale];
  const prefix = locale === "pt" ? "/pt" : "";
  const parts = [
    `# ${pick(guide.h1, locale)}`,
    absolutize(pick(guide.lead, locale), locale),
    [
      `${l.by} Gustavo Silveira (${BASE_URL}) · ${l.updated} ${guide.updated} · ${l.license}`,
      `${l.page}: ${BASE_URL}${prefix}/skills/${guide.slug}`,
      `${l.source}: ${repoUrl}/tree/master/${guide.repoPath}`,
    ].join("  \n"),
  ];

  for (const section of guide.sections) {
    parts.push(`## ${pick(section.title, locale)}`);
    for (const b of section.blocks) parts.push(block(b, locale));
  }

  parts.push(`## ${l.faq}`);
  for (const item of guide.faq) {
    parts.push(`### ${pick(item.q, locale)}`, absolutize(pick(item.a, locale), locale));
  }

  parts.push("---", `**Gustavo Silveira**. ${absolutize(pick(guide.author, locale), locale)}`);
  return parts.join("\n\n") + "\n";
}
