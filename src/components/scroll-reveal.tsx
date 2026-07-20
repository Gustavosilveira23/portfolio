"use client";

/**
 * ScrollReveal — revela o conteúdo (fade + subir) quando ele entra na tela.
 *
 * Mesma API de antes (children, delay, className), mas agora movido pro GSAP
 * ScrollTrigger — a mesma engine da intro e dos project cards. Assim o site
 * inteiro usa um sistema só de animação de scroll, sincronizado com o Lenis
 * (via <ScrollSync /> no layout).
 *
 * Respeita prefers-reduced-motion: sem movimento, o conteúdo fica estático.
 */

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    },
    { scope: ref, dependencies: [delay] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
