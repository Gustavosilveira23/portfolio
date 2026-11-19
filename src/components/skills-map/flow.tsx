"use client";

// Energia no trilho da skill escolhida até quem ela passa o trabalho (decisão de 19/11/2026,
// explorada numa página de laboratório já apagada): o trilho ativo deixa de ser reta e vira uma onda com a mesma
// espessura e a mesma cor do fio (branco, sem vazamento). Com prefers-reduced-motion a onda não
// anda: fica a reta.

import { useEffect, useRef } from "react";

/* ---- Parâmetros ajustáveis ------------------------------------------------------------------ */
/** Espessura do fio aceso. A onda usa a mesma, para a troca reta -> onda não mudar o peso. */
export const LIT_WIDTH = 2.5;

export const WAVE = {
  amplitude: 3, // px de cada lado do eixo do fio no meio do trecho (nas pontas vai a zero)
  wavelength: 26, // px entre duas cristas
  period: 1.1, // segundos para uma crista andar um comprimento de onda (menor = mais rápido)
  step: 3, // px entre amostras ao longo do fio (menor = curva mais lisa, mais custo)
};
/* --------------------------------------------------------------------------------------------- */

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** O trilho ativo desenhado como onda. As cristas andam no sentido do caminho (de quem passa
 *  para quem recebe) e a amplitude cai a zero nas pontas, para a onda nascer e morrer na estação.
 *  Começa como reta (o `d` do próprio trilho) e só ondula depois do primeiro quadro. */
export function FlowWave({ d }: { d: string }) {
  const wave = useRef<SVGPathElement>(null);

  useEffect(() => {
    const out = wave.current;
    if (!out) return;
    // Volta para a reta antes de medir: o quadro anterior pode ter deixado uma onda no `d`.
    out.setAttribute("d", d);
    if (reduced()) return;
    const L = out.getTotalLength();
    if (L < 2) return;

    // Amostras fixas da reta: posição, normal e envelope. Só a fase muda a cada quadro.
    const n = Math.max(8, Math.ceil(L / WAVE.step));
    const pts = Array.from({ length: n + 1 }, (_, i) => {
      const s = (L * i) / n;
      const p = out.getPointAtLength(s);
      const a = out.getPointAtLength(Math.max(0, s - 1));
      const b = out.getPointAtLength(Math.min(L, s + 1));
      const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
      return { s, x: p.x, y: p.y, nx: -(b.y - a.y) / len, ny: (b.x - a.x) / len, env: Math.sin((Math.PI * i) / n) };
    });

    let raf = 0;
    let visible = true;
    const start = performance.now();
    const frame = (now: number) => {
      const t = (now - start) / 1000;
      let path = "";
      for (let i = 0; i < pts.length; i++) {
        const q = pts[i];
        const off = WAVE.amplitude * q.env * Math.sin(2 * Math.PI * (q.s / WAVE.wavelength - t / WAVE.period));
        path += `${i ? "L" : "M"}${(q.x + q.nx * off).toFixed(1)} ${(q.y + q.ny * off).toFixed(1)}`;
      }
      out.setAttribute("d", path);
      if (visible) raf = requestAnimationFrame(frame);
    };
    // Pausa fora da tela: nada de laço gastando bateria com o mapa escondido.
    const svg = out.ownerSVGElement;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });
    if (svg) io.observe(svg);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [d]);

  return <path ref={wave} d={d} fill="none" className="stroke-foreground" strokeWidth={LIT_WIDTH} strokeLinecap="round" strokeLinejoin="round" />;
}
