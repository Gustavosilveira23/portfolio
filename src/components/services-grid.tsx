"use client";

/**
 * ServicesGrid — serviços no formato Jobs To Be Done, com accordion no hover.
 *
 * Duas colunas de altura fixa:
 *  - Esquerda: 2 cards (AI em destaque por padrão + Design to Code)
 *  - Direita: 3 cards
 * Cada card usa flex-grow; no hover ele expande e os vizinhos da mesma coluna
 * retraem, mantendo o grid encaixado. A transição de flex-grow é animada.
 *
 * Frente = a dor do cliente (voz dele). Verso = como resolvo + CTA de agendar.
 * Desktop: revela no hover. Mobile: revela no toque (o card expande), com um
 * "+" que pulsa sugerindo o clique e vira "×" quando aberto.
 */

import { useState } from "react";
import { useLocale } from "next-intl";
import { ArrowUpRight, Plus } from "lucide-react";

const CALENDLY = "https://calendar.app.google/jvDs7YqaRTi9E2Wa8";

type Loc = { pt: string; en: string };
type Job = { service: Loc; pain: Loc; solution: Loc };

const AI: Job = {
  service: { pt: "AI Product Design", en: "AI Product Design" },
  pain: {
    pt: "Quero colocar IA no meu produto, sem assustar quem usa.",
    en: "I want AI in my product, without scaring my users.",
  },
  solution: {
    pt: "Desenho features de IA que parecem naturais: interfaces conversacionais, integração com LLM e os momentos em que o modelo erra ou não sabe. O resultado é uma IA em que o usuário confia e mantém o controle.",
    en: "I design AI features that feel natural: conversational interfaces, LLM integration, and the moments when the model is wrong or unsure. The result is AI your users trust and stay in control of.",
  },
};
const AUDIT: Job = {
  service: { pt: "Product Audit", en: "Product Audit" },
  pain: {
    pt: "Meu produto tá difícil de usar e eu não sei onde.",
    en: "My product is hard to use and I can't tell where.",
  },
  solution: {
    pt: "Reviso seus fluxos principais com heurísticas de usabilidade e dados de comportamento, e mostro onde os usuários travam. Você recebe os problemas priorizados por impacto e esforço: um plano de ação, não um relatório de 40 páginas.",
    en: "I review your core flows with usability heuristics and behavioral data, and show where users get stuck. You get the problems prioritized by impact and effort: an action plan, not a 40-page report.",
  },
};
const E2E: Job = {
  service: { pt: "Product Design, End to End", en: "Product Design, End to End" },
  pain: {
    pt: "Meu produto cresceu e virou um labirinto.",
    en: "My product grew into a maze.",
  },
  solution: {
    pt: "Assumo o ciclo completo: pesquisa, design, protótipo, teste e código em produção (Next + Tailwind, via Claude Code). Deixo o complexo óbvio e entrego funcionando, sem depender de fila de dev.",
    en: "I own the full cycle: research, design, prototype, test, and production code (Next + Tailwind, via Claude Code). I make the complex feel obvious and ship it working, without waiting on a dev queue.",
  },
};
const RESEARCH: Job = {
  service: { pt: "Research & Strategy", en: "Research & Strategy" },
  pain: {
    pt: "Não sei o que meus usuários realmente precisam.",
    en: "I don't know what my users actually need.",
  },
  solution: {
    pt: "Rodo pesquisa qualitativa e quantitativa (entrevistas, testes de usabilidade, análise de dados) e sintetizo em achados claros. Você sai com decisões de produto priorizadas, baseadas em evidência e não em achismo.",
    en: "I run qualitative and quantitative research (interviews, usability tests, data analysis) and synthesize it into clear findings. You leave with prioritized product decisions backed by evidence, not guesswork.",
  },
};
const DS: Job = {
  service: { pt: "Design Systems", en: "Design Systems" },
  pain: {
    pt: "Meu design tá inconsistente e o time reinventa tudo.",
    en: "My design is inconsistent and the team reinvents everything.",
  },
  solution: {
    pt: "Monto o sistema completo: tokens, biblioteca de componentes, documentação e regras de governança. Seu time para de reinventar telas e passa a entregar interface consistente muito mais rápido.",
    en: "I build the full system: tokens, component library, documentation, and governance rules. Your team stops reinventing screens and ships consistent UI far faster.",
  },
};

function Card({
  job,
  grow,
  locale,
  helpLabel,
  ctaLabel,
  dark = false,
}: {
  job: Job;
  grow: string;
  locale: "pt" | "en";
  helpLabel: string;
  ctaLabel: string;
  dark?: boolean;
}) {
  // Âncora escura (IA) vs. cards claros — iguais aos do Portfólio (bege/branco + sombra leve)
  const surface = dark
    ? "bg-neutral-900 text-white"
    : "bg-white text-neutral-900 ring-1 ring-black/[0.05] shadow-[0_6px_18px_-12px_rgba(0,0,0,0.1)]";
  const label = dark ? "text-white/45" : "text-neutral-400";

  // Mobile: toque abre/fecha (não existe hover). Desktop: hover controla, e o
  // estado `open` é ignorado (as classes md: sobrepõem as sem prefixo).
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen((o) => !o)}
      className={`group relative overflow-hidden rounded-3xl cursor-pointer transition-[flex-grow,min-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:cursor-default md:min-h-0 ${
        open ? "min-h-[320px]" : "min-h-[150px]"
      } ${surface} ${grow}`}
    >
      {/* Frente — a dor do cliente */}
      <div className="flex h-full flex-col justify-between p-6">
        <div className="flex items-start justify-between gap-3">
          <span className={`text-xs uppercase tracking-[1.5px] ${label}`}>
            {job.service[locale]}
          </span>
          {/* Affordance de toque (só mobile): pulsa fechado, vira × ao abrir */}
          <span
            aria-hidden
            className={`shrink-0 transition-transform duration-300 md:hidden ${
              dark ? "text-white/40" : "text-neutral-400"
            } ${open ? "rotate-45" : "animate-pulse"}`}
          >
            <Plus size={18} />
          </span>
        </div>
        <p className="max-w-md text-xl font-medium leading-snug md:text-2xl">
          {"“" + job.pain[locale] + "”"}
        </p>
      </div>

      {/* Verso — solução + CTA. Desktop: revela no hover. Mobile: revela com `open`. */}
      <div
        className={`absolute inset-0 flex flex-col justify-between bg-neutral-900 p-6 text-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-3 opacity-0 pointer-events-none"
        } md:translate-y-3 md:opacity-0 md:pointer-events-none md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-hover:pointer-events-auto`}
      >
        <div>
          <span className="text-xs uppercase tracking-[1.5px] text-white/45">
            {helpLabel}
          </span>
          <p className="mt-3 text-sm leading-relaxed text-white/85 md:text-base">
            {job.solution[locale]}
          </p>
        </div>
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex w-fit items-center gap-2 text-sm font-medium"
        >
          {ctaLabel}
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30">
            <ArrowUpRight size={15} />
          </span>
        </a>
      </div>
    </div>
  );
}

export function ServicesGrid() {
  const locale = useLocale() as "pt" | "en";
  const ctaLabel = locale === "pt" ? "Agendar conversa" : "Book a call";
  const helpLabel = locale === "pt" ? "Como eu ajudo" : "How I help";
  const shared = { locale, helpLabel, ctaLabel };

  return (
    <div className="grid grid-cols-1 gap-4 md:h-[560px] md:grid-cols-2">
      {/* Coluna esquerda — 2 cards, accordion vertical (AI em destaque) */}
      <div className="flex flex-col gap-4">
        <Card job={AI} grow="md:flex-[1.7] md:hover:flex-[2.6]" {...shared} />
        <Card job={AUDIT} grow="md:flex-[1] md:hover:flex-[2.6]" {...shared} />
      </div>

      {/* Coluna direita — 3 cards, accordion vertical */}
      <div className="flex flex-col gap-4">
        <Card job={E2E} grow="md:flex-1 md:hover:flex-[2.2]" {...shared} />
        <Card job={RESEARCH} grow="md:flex-1 md:hover:flex-[2.2]" {...shared} />
        <Card job={DS} grow="md:flex-1 md:hover:flex-[2.2]" {...shared} />
      </div>
    </div>
  );
}
