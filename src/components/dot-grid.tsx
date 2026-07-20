"use client";

import { useEffect, useRef } from "react";
import { eggSignal } from "@/lib/egg-signal";

/* ────────────────────────────────────────────────────────────────
   AJUSTES — mexa só aqui em cima pra calibrar a sensação.
   ──────────────────────────────────────────────────────────────── */

// Grade de pontos
const DOT_SPACING = 28; // distância entre os pontos (px)
const DOT_RADIUS = 1.2; // tamanho de cada ponto (px)

// Visibilidade (suba se quiser os pontos mais presentes)
const BASE_ALPHA = 0.14; // brilho de repouso dos pontos (antes era 0.03) — agora o campo aparece o tempo todo
const GLOW_RADIUS = 200; // raio de influência do mouse (px)
const GLOW_STRENGTH = 0.22; // brilho extra máximo bem perto do cursor
const EGG_BAIT_STRENGTH = 0.65; // brilho pulsante da isca do easter egg (pontos do rosto)
const EGG_BAIT_GROWTH = 2.4; // quanto os pontos da isca crescem no pico (px)

// Onda de ruído — a "respiração" do campo
// (valores propositalmente FORTES pra dar pra perceber — depois a gente calibra pra baixo)
const WAVE_SPEED = 0.0003; // velocidade que a onda percorre o campo (↑ = mais rápido)
const WAVE_SCALE = 0.004; // tamanho das ondas (↓ = ondas maiores e mais suaves)
const WAVE_AMPLITUDE = 8; // quanto os pontos se deslocam na onda (px)
const WAVE_GLOW = 0.18; // quanto as cristas da onda acendem os pontos

/* ────────────────────────────────────────────────────────────────
   Ruído Perlin 2D (implementação clássica, sem biblioteca).
   Você não precisa entender o miolo — é só a fonte do movimento
   orgânico. Retorna um valor suave entre -1 e 1 pra cada posição.
   ──────────────────────────────────────────────────────────────── */

// Tabela de permutação padrão do Perlin (fixa, não é aleatória)
const PERM = [
  151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,
  36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234,
  75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237,
  149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48,
  27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105,
  92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73,
  209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86,
  164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38,
  147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189,
  28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101,
  155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232,
  178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12,
  191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31,
  181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
  138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215,
  61, 156, 180,
];
const P = [...PERM, ...PERM]; // duplicada pra evitar checagem de limite

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}
function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a);
}
function grad(hash: number, x: number, y: number): number {
  const h = hash & 7;
  const u = h < 4 ? x : y;
  const v = h < 4 ? y : x;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}
function perlin2(x: number, y: number): number {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  x -= Math.floor(x);
  y -= Math.floor(y);
  const u = fade(x);
  const v = fade(y);
  const A = P[X] + Y;
  const B = P[X + 1] + Y;
  const n = lerp(
    lerp(grad(P[A], x, y), grad(P[B], x - 1, y), u),
    lerp(grad(P[A + 1], x, y - 1), grad(P[B + 1], x - 1, y - 1), u),
    v
  );
  // mantém dentro de [-1, 1] pra amplitude ficar previsível em px
  return Math.max(-1, Math.min(1, n));
}

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Acessibilidade: se o sistema pede menos movimento, congela a onda.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = mq.matches;
    const onMQ = (e: MediaQueryListEvent) => (reduced = e.matches);
    mq.addEventListener("change", onMQ);

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    function handleMouse(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener("mousemove", handleMouse, { passive: true });

    function draw(time: number) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Tempo da onda (0 quando o movimento está reduzido)
      const t = reduced ? 0 : time * WAVE_SPEED;
      const amp = reduced ? 0 : WAVE_AMPLITUDE;
      const waveGlow = reduced ? 0 : WAVE_GLOW;

      ctx!.clearRect(0, 0, w, h);

      // Desloca os pontos com o scroll pra parecerem ancorados à página
      const offsetY = -(window.scrollY % DOT_SPACING);
      const offsetX = 0;

      const cols = Math.ceil(w / DOT_SPACING) + 1;
      const rows = Math.ceil(h / DOT_SPACING) + 1;

      for (let row = 0; row <= rows; row++) {
        const baseY = row * DOT_SPACING + offsetY;
        for (let col = 0; col <= cols; col++) {
          const baseX = col * DOT_SPACING + offsetX;

          // Onda: dois toques de ruído dão um leve balanço em x e y,
          // e a crista (valor positivo) acende um pouco o ponto.
          let nx = 0;
          let ny = 0;
          let crest = 0;
          if (!reduced) {
            nx = perlin2(baseX * WAVE_SCALE, baseY * WAVE_SCALE + t);
            ny = perlin2(baseX * WAVE_SCALE + 100, baseY * WAVE_SCALE + t + 100);
            crest = Math.max(0, nx);
          }

          const x = baseX + nx * amp;
          const y = baseY + ny * amp;

          // Brilho = repouso + crista da onda + glow do mouse
          let alpha = BASE_ALPHA + crest * waveGlow;

          const dx = baseX - mx;
          const dy = baseY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < GLOW_RADIUS) {
            const intensity = 1 - dist / GLOW_RADIUS;
            alpha += intensity * intensity * GLOW_STRENGTH;
          }

          // Isca do easter egg: os pontos da zona do rosto crescem e pulsam quando fechado
          let dotRadius = DOT_RADIUS;
          const hs = eggSignal.hotspot;
          if (hs && !eggSignal.revealed) {
            const ex = baseX - hs.x;
            const ey = baseY - hs.y;
            const edist = Math.sqrt(ex * ex + ey * ey);
            if (edist < hs.r) {
              const falloff = 1 - edist / hs.r;
              const pulse = reduced ? 0.6 : 0.45 + 0.55 * Math.sin(time * 0.0028);
              const strength = falloff * falloff * pulse;
              alpha += EGG_BAIT_STRENGTH * strength;
              dotRadius = DOT_RADIUS + strength * EGG_BAIT_GROWTH;
            }
          }

          ctx!.beginPath();
          ctx!.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx!.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      mq.removeEventListener("change", onMQ);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  );
}
