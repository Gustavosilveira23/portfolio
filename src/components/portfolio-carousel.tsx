"use client";

/**
 * PortfolioCarousel — carrossel em arco infinito (inspirado no labs.google).
 *
 * Cada card recebe rotação + descida conforme a distância do centro (o arco).
 * É um LOOP: o offset de cada card é calculado pelo caminho circular mais
 * curto, então o último card aparece à esquerda do primeiro. Quando um card
 * "dá a volta", ele teleporta (sem animar o cruzamento) enquanto está
 * invisível na borda — o resto anima suave com GSAP.
 *
 * Só transform é animado. Respeita prefers-reduced-motion.
 */

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { projects } from "@/content/projects";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(useGSAP);

// ── Ajustes do arco (mexa aqui) ─────────────────────────────────────
const CARD_W = 360; // largura do card (px)
const GAP = 440; // distância horizontal entre cards (px)
const TILT = 6; // rotação por posição (graus)
const DROP = 20; // quanto os laterais descem (px, × distância²)
const SCALE_STEP = 0; // 0 = todos os cards do mesmo tamanho
const OPACITY_STEP = 0.28; // laterais desbotam
const VISIBLE = 2.6; // além dessa distância o card some (borda do loop)
// ────────────────────────────────────────────────────────────────────

const categoryLabels: Record<string, { pt: string; en: string }> = {
  product: { pt: "Produto, Design, Pesquisa", en: "Product, Design, Research" },
  research: { pt: "Pesquisa, Dados, Estratégia", en: "Research, Data, Strategy" },
  design: { pt: "Design, Prototipação, Testes", en: "Design, Prototyping, Testing" },
};

const N = projects.length;

// caminho circular mais curto entre o card i e o card ativo
function circularOffset(i: number, active: number) {
  let o = ((i - active) % N + N) % N;
  if (o > N / 2) o -= N;
  return o;
}

export function PortfolioCarousel() {
  const locale = useLocale() as "pt" | "en";
  const t = useTranslations("portfolio");
  const root = useRef<HTMLDivElement>(null);
  const prev = useRef<number[]>([]);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const cards = root.current!.querySelectorAll<HTMLElement>(".arc-card");
      const reduce = !window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

      cards.forEach((card, i) => {
        const offset = circularOffset(i, active);
        const dist = Math.abs(offset);
        const props: gsap.TweenVars = {
          x: offset * GAP,
          y: reduce ? 0 : offset * offset * DROP,
          rotation: reduce ? 0 : offset * TILT,
          scale: reduce ? 1 : Math.max(0.7, 1 - dist * SCALE_STEP),
          opacity: dist > VISIBLE ? 0 : Math.max(0, 1 - dist * OPACITY_STEP),
          zIndex: Math.round(100 - dist),
        };

        const before = prev.current[i];
        // deu a volta (salto grande) OU primeiro render -> teleporta sem animar
        const jumped = before === undefined || Math.abs(offset - before) > N / 2;
        if (jumped) gsap.set(card, props);
        else gsap.to(card, { ...props, duration: 0.6, ease: "power3.out" });
        prev.current[i] = offset;
      });
    },
    { scope: root, dependencies: [active] }
  );

  const go = (dir: -1 | 1) => setActive((a) => (a + dir + N) % N);

  return (
    <div>
      {/* Palco do arco */}
      <div
        ref={root}
        className="relative h-[540px] w-full overflow-x-clip flex justify-center"
      >
        {projects.map((project, i) => (
          <Link
            key={project.slug}
            href={`/portfolio/${project.slug}`}
            onClick={(e) => {
              if (i !== active) {
                e.preventDefault();
                setActive(i);
              }
            }}
            style={{ width: CARD_W, marginLeft: -CARD_W / 2 }}
            className="arc-card group absolute left-1/2 top-0 block overflow-hidden rounded-3xl bg-white text-neutral-900 shadow-[0_14px_38px_-14px_rgba(0,0,0,0.2)] will-change-transform"
          >
            <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.coverImage}
                alt={project.title[locale]}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-7">
              <p className="mb-2 text-[11px] uppercase tracking-[1.5px] text-neutral-400">
                {categoryLabels[project.category]?.[locale] ??
                  project.tags.slice(0, 3).join(", ")}
              </p>
              <h3 className="line-clamp-2 min-h-[3.5rem] text-2xl font-bold leading-tight tracking-tight">
                {project.title[locale]}
              </h3>
              <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-neutral-500">
                {project.description[locale]}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[1.2px] text-neutral-500 transition-colors group-hover:text-neutral-900">
                {t("view_project")}
                <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Setas (loop — sempre ativas) */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          aria-label="Anterior"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 transition-colors hover:border-neutral-900 hover:text-neutral-900"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Próximo"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 transition-colors hover:border-neutral-900 hover:text-neutral-900"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
