"use client";

// Metrô das skills: estações em posição percentual sobre um SVG de trilhos em 45 graus.
// Os trilhos são as passagens declaradas (content/skills/map.ts). Quem usa decide posições e o
// eixo da linha principal (horizontal no tablet, vertical ao lado da lista no desktop).
// Movimento é o acento (DESIGN.md §2): os trilhos se desenham ao entrar na tela e, com uma skill
// escolhida, cada trilho dela até quem ela passa o trabalho deixa de ser reta e vira uma onda que
// corre nesse sentido (flow.tsx). Com prefers-reduced-motion nada anda: o trilho ativo fica reto.

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FlowWave, LIT_WIDTH } from "./flow";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type Pos = Record<string, [number, number]>;
type Pt = [number, number];
type Main = { axis: "x" | "y"; at: number };

export type DiagramProps = {
  slugs: string[];
  edges: [string, string][];
  handoffs: Record<string, string[]>;
  pos: Pos;
  current: string | null;
  near: Set<string>;
  /** Linha principal: `axis: "y"` = horizontal na altura `at` (%); `axis: "x"` = vertical na
   *  posição `at`. A ponta mais perto dela começa pela diagonal, para os trilhos não correrem um
   *  sobre o outro. */
  metroMain: Main;
  onPreview: (slug: string | null) => void;
  onSelect: (slug: string) => void;
  /** Endereço da linha da skill na lista. A estação é um link para ela: é o que ela faz. */
  hrefFor: (slug: string) => string;
  className?: string;
};

const edgeKey = (a: string, b: string) => [a, b].sort().join("|");

/** Pontos de a até b: diagonal saindo da ponta mais perto da linha principal, depois reta
 *  horizontal ou vertical. A ordem devolvida é sempre de a para b. */
function edgePoints(a: Pt, b: Pt, main: Main): Pt[] {
  const i = main.axis === "y" ? 1 : 0;
  const flip = Math.abs(b[i] - main.at) < Math.abs(a[i] - main.at);
  const [p, q] = flip ? [b, a] : [a, b];
  const dx = q[0] - p[0];
  const dy = q[1] - p[1];
  const d = Math.min(Math.abs(dx), Math.abs(dy));
  const mid: Pt = [p[0] + Math.sign(dx) * d, p[1] + Math.sign(dy) * d];
  const pts: Pt[] = [p, mid, q];
  return flip ? pts.reverse() : pts;
}

const toPath = (pts: Pt[]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

export function Diagram({
  slugs,
  edges,
  handoffs,
  pos,
  current,
  near,
  metroMain,
  onPreview,
  onSelect,
  hrefFor,
  className = "",
}: DiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Os trilhos são desenhados em pixels do container (não em viewBox esticado): traço com a mesma
  // espessura em qualquer proporção e tracejado sem distorção.
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const ready = size.w > 0;

  // Skill sem posição (nova no catálogo ou renomeada) fica fora do mapa, com as conexões dela, em
  // vez de derrubar a lista inteira. Em desenvolvimento, um aviso diz quem falta posicionar.
  const placed = (slug: string) => slug in pos;
  const missing = slugs.filter((s) => !placed(s));
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" && missing.length > 0) {
      console.warn(`[skills-map] Sem posição no Metrô, fora do mapa: ${missing.join(", ")}. Acrescente em METRO_POS e METRO_VERTICAL_POS.`);
    }
  }, [missing.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps
  const flowTo = current && placed(current) ? (handoffs[current] ?? []).filter(placed) : [];
  const px = (slug: string): Pt => [(pos[slug][0] / 100) * size.w, (pos[slug][1] / 100) * size.h];
  const mainPx: Main = { axis: metroMain.axis, at: (metroMain.at / 100) * (metroMain.axis === "y" ? size.h : size.w) };
  const path = (a: string, b: string) => toPath(edgePoints(px(a), px(b), mainPx));

  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-edge]", {
          strokeDashoffset: 1,
          duration: 1.1,
          ease: "power2.inOut",
          stagger: 0.06,
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        });
        // Só opacidade: a estação é posicionada pelo translate do Tailwind e não pode ter o
        // transform assumido pelo GSAP. fromTo com destino explícito: um `from` lê a opacidade
        // atual, e a transição CSS pode estar no meio (montagem dupla do React em dev) e dar
        // "0 para 0". clearProps devolve a opacidade à classe, que é quem esmaece as estações.
        gsap.fromTo(
          "[data-node]",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.05,
            clearProps: "opacity",
            scrollTrigger: { trigger: ref.current, start: "top 80%" },
          },
        );
      });
    },
    { scope: ref, dependencies: [ready] },
  );

  return (
    <div ref={ref} className={`relative ${className}`}>
      {ready && (
        <svg aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${size.w} ${size.h}`} fill="none">
          {edges.filter(([a, b]) => placed(a) && placed(b)).map(([a, b]) => {
            const lit = current !== null && (a === current || b === current);
            // Trilho por onde a skill escolhida passa o trabalho: a onda toma o lugar da reta.
            const flowing = lit && flowTo.includes(a === current ? b : a);
            return (
              <path
                key={edgeKey(a, b)}
                data-edge
                d={path(a, b)}
                pathLength={1}
                strokeDasharray="1"
                strokeLinejoin="round"
                strokeLinecap="round"
                className={`transition-[stroke,opacity] duration-150 ${lit ? "stroke-foreground" : "stroke-muted-foreground/40"}`}
                strokeWidth={lit ? LIT_WIDTH : 2}
                style={{ opacity: flowing ? 0 : current === null || lit ? 1 : 0.35 }}
              />
            );
          })}
          {/* Da skill escolhida para cada skill a quem ela passa o trabalho. */}
          {flowTo.map((to) => <FlowWave key={`wave-${current}-${to}`} d={path(current!, to)} />)}
        </svg>
      )}

      {slugs.filter(placed).map((slug) => {
        const [x, y] = pos[slug];
        const isCurrent = slug === current;
        const dim = current !== null && !isCurrent && !near.has(slug);
        // Estação: nome em cima, ponto embaixo. O ponto (12px) fica exatamente na coordenada; a
        // altura mínima de 44px cresce para cima, sem tirar o ponto do lugar. Esmaecida fica em 60%:
        // o rótulo branco passa de 4,5:1 a partir de 47% (medido sobre o fundo em 19/11/2026).
        return (
          <a
            key={slug}
            data-node
            href={hrefFor(slug)}
            onPointerEnter={() => onPreview(slug)}
            onPointerLeave={() => onPreview(null)}
            onFocus={() => onPreview(slug)}
            onBlur={() => onPreview(null)}
            onClick={(e) => {
              e.preventDefault();
              onSelect(slug);
            }}
            style={{ left: `${x}%`, top: `${y}%` }}
            className={`absolute flex min-h-11 -translate-x-1/2 -translate-y-[calc(100%-0.375rem)] flex-col items-center justify-end gap-1.5 rounded outline-none transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-foreground ${
              dim ? "opacity-60" : ""
            }`}
          >
            <span
              className={`whitespace-nowrap rounded bg-background px-1.5 font-mono text-sm text-foreground ${
                isCurrent ? "underline underline-offset-4" : ""
              }`}
            >
              /{slug}
            </span>
            <span
              aria-hidden="true"
              className={`size-3 shrink-0 rounded-full border-2 border-foreground transition-colors ${isCurrent ? "bg-foreground" : "bg-background"}`}
            />
          </a>
        );
      })}
    </div>
  );
}
