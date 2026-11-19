"use client";

// Lista das skills em /skills: a Editorial com o Metrô vertical fixo ao lado.
// Escolhida em 18/11/2026 depois de três rodadas de /variantes (Linha, Constelação, Compacta,
// Roteiro, Órbitas, Território e Metrô em cima ficaram para trás).
// O texto manda: cada skill é uma linha com a pergunta que ela responde, o resumo, para quem passa
// o trabalho e o link. O Metrô acompanha a leitura: passar por uma linha acende a estação dela e as
// conexões; clicar numa estação leva até a linha. As conexões são as passagens declaradas nos
// SKILL.md (content/skills/map.ts).
// Abaixo de lg (1024px) o Metrô vertical sai e entra a versão horizontal (md) ou a linha de
// estações empilhada (celular), antes da lista: com o Metrô ao lado, a coluna de texto ficaria
// estreita demais para a pergunta grande.

import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Diagram, type Pos } from "./diagram";

export type MapNode = {
  slug: string;
  stage: 1 | 2 | 3 | 4 | "side";
  question: string;
  line: string;
  href: string;
  internal: boolean;
  cta: string;
  handsOff: string[];
};

export type MapLabels = {
  label: string;
  title: string;
  handsOff: string;
  stages: Record<string, string>;
};

type Props = {
  nodes: MapNode[];
  edges: [string, string][];
  handoffs: Record<string, string[]>;
  labels: MapLabels;
};

const metaClass = "text-xs uppercase tracking-[1.8px] text-muted-foreground";

// Metrô horizontal (tablet): linha principal no meio, a dupla de interface acima e abaixo dela,
// a figma-craft num ramal embaixo.
const METRO_POS: Pos = {
  "ux-research": [7, 50],
  "ux-designer": [30, 50],
  "design-system": [58, 22],
  "ui-designer": [58, 78],
  "creative-coding": [91, 50],
  // A figma-craft fica onde o trilho dela até a design-system é uma diagonal pura: em [30,94] ele
  // dividia trecho com o trilho até a ux-designer (design review de 19/11/2026).
  "figma-craft": [30, 86],
};

// O mesmo Metrô girado para a vertical (desktop, ao lado da lista).
// Em [50,28] e [84,28], ux-designer e figma-craft faziam dois trilhos correrem no mesmo trecho
// (design review de 19/11/2026). Estas são as posições sem trecho sobreposto e com os trilhos
// longe dos rótulos, achadas por busca na grade. A figma-craft fica no alto porque o trilho dela
// até a design-system precisa ser uma diagonal pura; em 1024x600 sobram 3px entre as áreas de
// toque dela e da ux-research.
const METRO_VERTICAL_POS: Pos = {
  "ux-research": [50, 7],
  "ux-designer": [50, 21],
  "design-system": [22, 56],
  "ui-designer": [78, 56],
  "creative-coding": [50, 90],
  "figma-craft": [84, 9.5],
};

const rowId = (slug: string) => `skill-${slug}`;
const rowHref = (slug: string) => `#${rowId(slug)}`;

// Esmaecida, a linha fica em 75%: o texto cinza (muted) passa de 4,5:1 a partir de 73% de
// opacidade sobre o fundo (medido em 19/11/2026). Abaixo disso o resumo fica ilegível.
const DIM_ROW = "opacity-75";
const focusRing = "outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-foreground";

/** Escolha fixa (clique) e prévia (ponteiro ou foco). A prévia manda enquanto existe.
 *  A escolha não fica presa: Esc desfaz, e o foco sair da linha escolhida também (SkillRow). */
function useCurrent(handoffs: Record<string, string[]>) {
  const [selected, setSelected] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      // A linha escolhida segue com foco (e o foco acende a prévia): Esc apaga as duas.
      if (e.key === "Escape") {
        setSelected(null);
        setPreview(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);
  const current = preview ?? selected;
  const near = new Set<string>();
  if (current) {
    for (const to of handoffs[current] ?? []) near.add(to);
    for (const [from, tos] of Object.entries(handoffs)) if (tos.includes(current)) near.add(from);
  }
  return { current, near, setPreview, setSelected };
}

/** Leva até a skill na lista, com a linha no centro da janela. Conta na mão em vez de
 *  scrollIntoView: o scroll-mt da linha (que serve ao salto pelo endereço, sem JS) desviava o
 *  centro em 64px. Sem animação quando a pessoa pediu movimento reduzido. */
function goToRow(slug: string) {
  const el = document.getElementById(rowId(slug));
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const r = el.getBoundingClientRect();
  window.scrollTo({ top: window.scrollY + r.top - (window.innerHeight - r.height) / 2, behavior: reduce ? "auto" : "smooth" });
  // O foco vai junto, para quem navega por teclado continuar dali.
  el.focus({ preventScroll: true });
}

export function SkillsMap({ nodes, edges, handoffs, labels }: Props) {
  const { current, near, setPreview, setSelected } = useCurrent(handoffs);
  const slugs = nodes.map((n) => n.slug);
  const pick = (slug: string) => {
    setSelected(slug);
    goToRow(slug);
  };
  const clear = () => setSelected(null);
  const diagram = { slugs, edges, handoffs, current, near, onPreview: setPreview, onSelect: pick, hrefFor: rowHref };

  return (
    <section aria-labelledby="skills-map-title" className="mt-20 md:mt-28">
      <p className={metaClass}>{labels.label}</p>
      <h2 id="skills-map-title" className="mt-4 max-w-2xl text-2xl font-medium leading-snug tracking-tight text-foreground md:text-3xl">
        {labels.title}
      </h2>

      <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-16">
        <div>
          <div className="mb-12 hidden md:block lg:hidden">
            <Diagram {...diagram} pos={METRO_POS} metroMain={{ axis: "y", at: 50 }} className="mt-8 aspect-[16/7]" />
          </div>
          <div className="mb-12 md:hidden">
            <StageStack nodes={nodes} labels={labels} current={current} near={near} onSelect={pick} />
          </div>
          <ol>
            {nodes.map((n) => (
              <SkillRow key={n.slug} node={n} labels={labels} current={current} near={near} setPreview={setPreview} onLeave={clear} />
            ))}
          </ol>
        </div>
        <div className="hidden lg:block">
          {/* O Metrô inteiro cabe numa dobra: a altura acompanha a janela (topo fixo de 7rem mais
              uma margem embaixo) e para em 32rem; a largura segue a proporção 3:4. */}
          <div className="sticky top-24 pt-4">
            <Diagram
              {...diagram}
              pos={METRO_VERTICAL_POS}
              metroMain={{ axis: "x", at: 50 }}
              className="mx-auto aspect-[3/4] h-[min(32rem,calc(100svh-9rem))] max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillRow({
  node,
  labels,
  current,
  near,
  setPreview,
  onLeave,
}: {
  node: MapNode;
  labels: MapLabels;
  current: string | null;
  near: Set<string>;
  setPreview: (slug: string | null) => void;
  /** O foco saiu da linha (clique fora, Tab adiante): a escolha fixa se desfaz. */
  onLeave: () => void;
}) {
  const isCurrent = node.slug === current;
  const dim = current !== null && !isCurrent && !near.has(node.slug);
  // 44px de alvo; o sublinhado continua só no texto.
  const ctaCls = `group mt-3 inline-flex min-h-11 items-center gap-2 rounded text-sm font-medium text-foreground underline-offset-4 hover:underline ${focusRing}`;
  return (
    <li
      id={rowId(node.slug)}
      tabIndex={-1}
      onPointerEnter={() => setPreview(node.slug)}
      onPointerLeave={() => setPreview(null)}
      onFocusCapture={() => setPreview(node.slug)}
      onBlurCapture={(e) => {
        if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
        setPreview(null);
        onLeave();
      }}
      // Sem anel de foco na linha (ela só recebe foco pelo salto do mapa): o destaque é a borda
      // clara e o fim do esmaecimento, que acontecem no mesmo instante.
      className={`scroll-mt-32 border-t py-10 outline-none transition-[border-color,opacity] duration-150 ${
        isCurrent ? "border-foreground" : "border-border"
      } ${dim ? DIM_ROW : ""}`}
    >
      <p className={metaClass}>
        {labels.stages[String(node.stage)]} · <span className="font-mono normal-case tracking-normal">/{node.slug}</span>
      </p>
      {/* O nome da skill entra no título para quem navega por títulos com leitor de tela. */}
      <h3 className="mt-4 max-w-2xl text-2xl font-medium leading-snug tracking-tight text-foreground md:text-3xl">
        <span className="sr-only">/{node.slug}: </span>
        {node.question}
      </h3>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{node.line}</p>
      {/* Skill que não passa o trabalho para ninguém não mostra a linha vazia. */}
      {node.handsOff.length > 0 && (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {labels.handsOff}: <span className="font-mono">{node.handsOff.map((s) => `/${s}`).join(", ")}</span>
        </p>
      )}
      {node.internal ? (
        <Link href={node.href} aria-label={`${node.cta}: ${node.slug}`} className={ctaCls}>
          {node.cta}
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <a href={node.href} target="_blank" rel="noopener noreferrer" aria-label={`${node.cta}: ${node.slug}`} className={ctaCls}>
          {node.cta}
          <ArrowUpRight size={14} />
        </a>
      )}
    </li>
  );
}

/** Celular: as estações empilhadas numa linha vertical, agrupadas por etapa. */
function StageStack({
  nodes,
  labels,
  current,
  near,
  onSelect,
}: {
  nodes: MapNode[];
  labels: MapLabels;
  current: string | null;
  near: Set<string>;
  onSelect: (slug: string) => void;
}) {
  const stages = [1, 2, 3, 4, "side"] as const;
  return (
    <ol>
      {stages.map((s) => (
        <li key={s} className={`relative pb-8 pl-7 ${s === "side" ? "mt-2 border-t border-border pl-0 pt-8" : ""}`}>
          {s !== "side" && s !== 4 && <span aria-hidden="true" className="absolute bottom-0 left-1 top-2 w-0.5 bg-muted-foreground/40" />}
          {s !== "side" && <span aria-hidden="true" className="absolute left-0 top-1 size-2.5 rounded-full border-2 border-foreground bg-background" />}
          <p className={metaClass}>{s === "side" ? labels.stages.side : `${String(s).padStart(2, "0")} ${labels.stages[s]}`}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {nodes
              .filter((n) => n.stage === s)
              .map((n) => {
                const isCurrent = n.slug === current;
                const dim = current !== null && !isCurrent && !near.has(n.slug);
                return (
                  <a
                    key={n.slug}
                    href={rowHref(n.slug)}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelect(n.slug);
                    }}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 font-mono text-sm transition-[border-color,opacity] duration-150 ${focusRing} ${
                      isCurrent ? "border-foreground text-foreground" : "border-border text-foreground"
                    } ${dim ? "opacity-60" : ""}`}
                  >
                    <span aria-hidden="true" className={`size-2 rounded-full border border-foreground ${isCurrent ? "bg-foreground" : ""}`} />/
                    {n.slug}
                  </a>
                );
              })}
          </div>
        </li>
      ))}
    </ol>
  );
}
