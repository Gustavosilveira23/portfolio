"use client";

/**
 * CustomCursor — cursor customizado (só desktop).
 *
 * Dois elementos seguem o mouse com inércia (lerp, o mesmo do dot-grid):
 *  - dot: pequeno, segue rápido (quase colado no cursor)
 *  - ring: anel maior, segue com mais atraso (dá a sensação de "peso")
 * Ao passar sobre links/botões, o anel cresce.
 *
 * Esconde o cursor nativo (classe .cursor-none no <html>). Desativado no
 * touch e quando o usuário pede menos movimento (aí volta o cursor do sistema).
 */

import { useEffect, useRef, useState } from "react";

const DOT_LERP = 0.35; // quão rápido o dot alcança o mouse
const RING_LERP = 0.15; // o anel segue mais devagar (mais inércia)
const HOVER_SCALE = 1.9; // quanto o anel cresce sobre links/botões

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const noReduce = window.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    ).matches;
    setEnabled(fine && noReduce);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("cursor-none");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dot = { ...mouse };
    const ring = { ...mouse };
    let hovering = false;
    let light = false; // sobre uma seção de fundo claro?
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    // Detecta se o cursor está sobre algo interativo e/ou fundo claro
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      hovering = !!t?.closest?.("a, button, [data-cursor-hover]");
      light = !!t?.closest?.(".section-light");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    function loop() {
      dot.x += (mouse.x - dot.x) * DOT_LERP;
      dot.y += (mouse.y - dot.y) * DOT_LERP;
      ring.x += (mouse.x - ring.x) * RING_LERP;
      ring.y += (mouse.y - ring.y) * RING_LERP;

      // Cor inverte conforme o fundo: escuro sobre claro, claro sobre escuro
      const solid = light ? "#171717" : "#f5f5f5";
      const ringColor = light ? "rgba(23,23,23,0.5)" : "rgba(245,245,245,0.4)";
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dot.x}px, ${dot.y}px) translate(-50%, -50%)`;
        dotRef.current.style.backgroundColor = solid;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%) scale(${hovering ? HOVER_SCALE : 1})`;
        ringRef.current.style.borderColor = ringColor;
      }
      raf = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border transition-colors duration-200"
        style={{ willChange: "transform", borderColor: "rgba(245,245,245,0.4)" }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full transition-colors duration-200"
        style={{ willChange: "transform", backgroundColor: "#f5f5f5" }}
      />
    </>
  );
}
