"use client";

/**
 * EasterEgg — retrato "feito de pontos" que se forma ao passar o mouse na
 * coluna direita do hero. Integrado ao dot-grid de fundo.
 *
 * - Fechado: o próprio dot-grid faz os pontos da zona do rosto pulsarem
 *   (a isca vem de lá, via egg-signal — este componente só reporta a posição).
 * - Ao passar o mouse: a foto se forma do centro pra fora, com a cor real
 *   dos pixels, mais uma seta desenhada à mão e um bilhete manuscrito.
 * - Ao sair: some suave.
 *
 * Só desktop (precisa de mouse) e respeita prefers-reduced-motion.
 */

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Caveat } from "next/font/google";
import { eggSignal } from "@/lib/egg-signal";

const hand = Caveat({ subsets: ["latin"], weight: "600" });

// ── Ajustes (mexa aqui) ─────────────────────────────────────────────
const PHOTO_SRC = "/gustavo_siveira.jpg";
const SIZE = 260; // tamanho do retrato em px
const GRID = 64; // pontos por lado (↑ = mais detalhe, mais pesado)
const STAGGER = 0.55; // espalhamento do "formar do centro pra fora" (0 a 0.9)
const DAMP = 0.09; // suavidade da transição (menor = mais lento e fluido)
// ────────────────────────────────────────────────────────────────────

type Dot = { x: number; y: number; r: number; g: number; b: number; dist: number };

export function EasterEgg() {
  const t = useTranslations("hero");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[] | null>(null);
  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(0);
  const visibleRef = useRef(true);

  const [enabled, setEnabled] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // Desktop-only + preferência de movimento
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    setEnabled(fine && wide);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Amostra a foto e roda o loop de desenho
  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Amostra a foto numa grade circular (fora do círculo é descartado)
    const img = new window.Image();
    img.src = PHOTO_SRC;
    img.onload = () => {
      const off = document.createElement("canvas");
      off.width = GRID;
      off.height = GRID;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.drawImage(img, 0, 0, GRID, GRID);
      const data = octx.getImageData(0, 0, GRID, GRID).data;
      const c = (GRID - 1) / 2;
      const R = GRID / 2;
      const dots: Dot[] = [];
      for (let y = 0; y < GRID; y++) {
        for (let x = 0; x < GRID; x++) {
          const dx = x - c;
          const dy = y - c;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > R) continue;
          const i = (y * GRID + x) * 4;
          // Preto e branco: usa a luminância (cinza) no lugar da cor real
          const lum = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
          dots.push({ x, y, r: lum, g: lum, b: lum, dist: d / R });
        }
      }
      dotsRef.current = dots;
    };

    // Pausa o loop quando o hero sai da tela
    const io = new IntersectionObserver(
      ([e]) => (visibleRef.current = e.isIntersecting),
      { threshold: 0 }
    );
    io.observe(canvas);

    const cell = SIZE / GRID;
    const dotR = cell * 0.46;

    function frame(time: number) {
      // Reporta ao dot-grid onde está o rosto (pra ele fazer a isca)
      const rect = canvas!.getBoundingClientRect();
      eggSignal.hotspot = visibleRef.current
        ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, r: rect.width * 0.62 }
        : null;
      eggSignal.revealed = targetRef.current > 0.5;

      // Avança o progresso rumo ao alvo (0 = escondido, 1 = revelado)
      if (reduced) {
        progressRef.current = targetRef.current;
      } else {
        progressRef.current += (targetRef.current - progressRef.current) * DAMP;
      }
      const p = progressRef.current;

      ctx!.clearRect(0, 0, SIZE, SIZE);

      const dots = dotsRef.current;
      if (dots && p > 0.005 && (visibleRef.current || p > 0.01)) {
        for (let k = 0; k < dots.length; k++) {
          const dot = dots[k];
          // Quanto este ponto já revelou (centro primeiro → borda depois)
          const revealT = reduced
            ? p
            : Math.max(0, Math.min(1, (p - dot.dist * STAGGER) / (1 - STAGGER)));
          if (revealT <= 0.004) continue;

          // Cor: branco → cor real da foto conforme revela
          const mix = revealT;
          const cr = Math.round(255 * (1 - mix) + dot.r * mix);
          const cg = Math.round(255 * (1 - mix) + dot.g * mix);
          const cb = Math.round(255 * (1 - mix) + dot.b * mix);
          const rr = dotR * (0.4 + 0.6 * revealT);

          ctx!.beginPath();
          ctx!.arc(dot.x * cell + cell / 2, dot.y * cell + cell / 2, rr, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${revealT})`;
          ctx!.fill();
        }
      }

      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      io.disconnect();
      eggSignal.hotspot = null;
      eggSignal.revealed = false;
    };
  }, [enabled, reduced]);

  if (!enabled) return null;

  return (
    <div
      className="relative w-full h-full hidden lg:flex items-center justify-center"
      onMouseEnter={() => {
        targetRef.current = 1;
        setRevealed(true);
      }}
      onMouseLeave={() => {
        targetRef.current = 0;
        setRevealed(false);
      }}
    >
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        {/* Retrato em pontos */}
        <canvas ref={canvasRef} className="block" style={{ width: SIZE, height: SIZE }} />

        {/* Seta desenhada à mão + bilhete (aparecem no reveal) — CSS puro.
            O bilhete faz fade + subir; a seta "se desenha" via strokeDashoffset
            (pathLength={1} normaliza o comprimento do traço pra 1). */}
        <div
          className={`absolute top-[74%] -left-[50%] flex items-start gap-2 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            revealed
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
          style={{ transitionDelay: revealed ? "0.2s" : "0s" }}
        >
          <svg
            width="96"
            height="84"
            viewBox="0 0 96 84"
            fill="none"
            className="text-foreground/80 shrink-0 -mt-1"
          >
            <path
              d="M6 78 C 34 68, 60 60, 80 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: revealed ? 0 : 1,
                transition: "stroke-dashoffset 0.5s ease-in-out",
                transitionDelay: revealed ? "0.3s" : "0s",
              }}
            />
            <path
              d="M80 24 L 64 30 M80 24 L 72 41"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: revealed ? 0 : 1,
                transition: "stroke-dashoffset 0.25s ease-out",
                transitionDelay: revealed ? "0.7s" : "0s",
              }}
            />
          </svg>

          <p
            className={`${hand.className} text-2xl leading-tight text-foreground/90 max-w-[170px]`}
          >
            {t("egg")}
          </p>
        </div>
      </div>
    </div>
  );
}
