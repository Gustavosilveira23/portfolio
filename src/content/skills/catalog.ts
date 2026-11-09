// As 6 skills do repo claude-design-skills, na ordem do pipeline. Texto do índice /skills.
// Só a ux-research tem guia; as outras levam para o SKILL.md no GitHub.

import type { L } from "./types";

export type CatalogEntry = {
  slug: string;
  /** Uma frase: o que a skill faz Claude fazer. Fato, não adjetivo. */
  line: L;
  /** Rota do guia no site, quando existe. */
  guide?: string;
};

export const indexCopy = {
  meta: {
    title: { en: "Claude Code Skills for Product Design", pt: "Skills do Claude Code para design de produto" },
    description: {
      en: "Six open source Claude Code skills for UX research, UX strategy, UI craft, design systems, motion and Figma. MIT licensed, one command to install.",
      pt: "Seis skills open source do Claude Code para pesquisa, estratégia de UX, craft visual, design system, motion e Figma. Licença MIT, um comando para instalar.",
    },
  },
  h1: { en: "Claude Code skills for product design", pt: "Skills do Claude Code para design de produto" },
  lead: {
    en: "Six skills I wrote and use in my own work. Each one gives Claude Code a method for one part of the job: research, UX, visual craft, design systems, motion and Figma. They are free and MIT licensed.",
    pt: "Seis skills que escrevi e uso no meu trabalho. Cada uma dá ao Claude Code um método para uma parte do trabalho: pesquisa, UX, craft visual, design system, motion e Figma. São gratuitas e têm licença MIT.",
  },
  installLabel: { en: "Install all six", pt: "Instalar as seis" },
};

export const INSTALL_ALL = "npx skills add Gustavosilveira23/claude-design-skills --all -g";

export const catalog: CatalogEntry[] = [
  {
    slug: "ux-research",
    guide: "/skills/ux-research",
    line: {
      en: "Starts every study from the decision it has to inform, writes interview scripts, turns findings into atomic evidence and evidence into design specs.",
      pt: "Começa toda pesquisa pela decisão que ela precisa informar, escreve roteiros de entrevista, organiza achados como evidência atômica e escreve a spec de design a partir dela.",
    },
  },
  {
    slug: "ux-designer",
    line: {
      en: "Asks who the user is before building, designs the flow instead of a single screen and audits interfaces with a five-part scorecard.",
      pt: "Pergunta quem é o usuário antes de construir, desenha o fluxo em vez da tela solta e audita interfaces com um scorecard de cinco critérios.",
    },
  },
  {
    slug: "ui-designer",
    line: {
      en: "Spacing on an 8pt grid, a type scale, the 60-30-10 color rule and a seven-point check that runs before any UI goes out.",
      pt: "Espaçamento em grid de 8pt, escala tipográfica, regra de cor 60-30-10 e uma checagem de sete pontos antes de qualquer tela sair.",
    },
  },
  {
    slug: "design-system",
    line: {
      en: "Tokens, components, audits and Figma sync for projects built on shadcn/ui, Tailwind and Next.js.",
      pt: "Tokens, componentes, auditoria e sincronia com o Figma para projetos em shadcn/ui, Tailwind e Next.js.",
    },
  },
  {
    slug: "creative-coding",
    line: {
      en: "Scroll animation, canvas and WebGL. Climbs from CSS to shaders only when the scene needs it, and respects reduced motion.",
      pt: "Animação no scroll, canvas e WebGL. Sobe de CSS para shader só quando a cena pede, e respeita quem desliga animação.",
    },
  },
  {
    slug: "figma-craft",
    line: {
      en: "Writes to Figma through the MCP without breaking auto layout: frame tree first, sizing by role, checks by property instead of screenshot.",
      pt: "Escreve no Figma pelo MCP sem quebrar o auto layout: árvore de frames antes, sizing pelo papel do elemento, conferência por propriedade e não por screenshot.",
    },
  },
];
