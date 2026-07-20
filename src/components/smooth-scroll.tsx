"use client";

/**
 * SmoothScroll — scroll suave (Lenis) aplicado à janela inteira.
 *
 * Parâmetros pra ajustar a SENSAÇÃO (mexa só aqui em cima):
 *  - LERP: o "peso" do scroll. Quanto MENOR, mais pesado/manteiga (ex.: 0.05);
 *          quanto MAIOR, mais responsivo e curto (ex.: 0.15). Padrão do Lenis é 0.1.
 *  - WHEEL_MULTIPLIER: quanto cada giro da roda do mouse avança. >1 rola mais; <1 rola menos.
 *  - TOUCH_MULTIPLIER: o mesmo, no toque (celular/trackpad).
 *
 * Acessibilidade: se o sistema pedir menos animação (prefers-reduced-motion),
 * o Lenis nem liga — o scroll fica o nativo, sem suavização.
 *
 * Convivência com o dot-grid: o Lenis rola o scroll REAL da janela, então
 * window.scrollY continua válido e o dot-grid segue ancorado normalmente.
 */

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

const LERP = 0.09;
const WHEEL_MULTIPLIER = 1;
const TOUCH_MULTIPLIER = 1.4;

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Respeita quem pediu menos movimento: devolve o conteúdo sem o Lenis.
  if (reducedMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: LERP,
        wheelMultiplier: WHEEL_MULTIPLIER,
        touchMultiplier: TOUCH_MULTIPLIER,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
