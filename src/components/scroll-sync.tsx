"use client";

/**
 * ScrollSync — ponte única entre o smooth scroll (Lenis) e o GSAP ScrollTrigger.
 *
 * Toda animação de scroll do site (ScrollReveal, reveals de seção, parallax)
 * usa ScrollTrigger. Ele precisa recalcular a cada movimento do Lenis — e isso
 * deve acontecer UMA vez só, globalmente. Este componente vive no layout,
 * dentro do provider do Lenis, e faz exatamente isso.
 */

import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollSync() {
  useLenis(() => ScrollTrigger.update());
  return null;
}
