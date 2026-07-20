"use client";

/**
 * Magnetic — envolve um elemento e faz ele "puxar" em direção ao cursor
 * quando o mouse passa por cima, voltando ao lugar ao sair.
 *
 * Usa gsap.quickTo (movimento suave e contínuo). A força (strength) é a
 * fração da distância do centro ao mouse que o elemento acompanha.
 * Desativado no touch e no prefers-reduced-motion.
 */

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

export function Magnetic({
  children,
  strength = 0.4,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const noReduce = window.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    ).matches;
    if (!fine || !noReduce) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const relX = e.clientX - (r.left + r.width / 2);
      const relY = e.clientY - (r.top + r.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength]);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
