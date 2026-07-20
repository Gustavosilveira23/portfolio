"use client";

/**
 * IntroSection — apresentação logo abaixo do hero, em 3 blocos:
 *  esquerda: saudação grande + intro curta
 *  centro:   foto (retrato)
 *  direita:  descrição + CTA
 *
 * Motion (GSAP + ScrollTrigger):
 *  - Reveal: os 3 blocos entram (fade + subir) em sequência quando a seção
 *    aparece na tela.
 *  - Parallax: a foto se desloca num ritmo diferente conforme você rola,
 *    criando profundidade.
 * O ScrollTrigger é mantido em sincronia com o smooth scroll (Lenis).
 */

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "./magnetic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function IntroSection() {
  const t = useTranslations("intro");
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // matchMedia respeita quem pediu menos movimento: se "reduce",
      // nada aqui roda e o conteúdo fica estático.
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1) REVEAL — anima os 3 blocos DE (from) invisível+abaixo PARA o normal.
        //    stagger = atraso entre cada bloco (o efeito "em cascata").
        //    scrollTrigger.start "top 75%" = dispara quando o topo da seção
        //    chega a 75% da altura da tela (um pouco antes de aparecer inteira).
        gsap.from(".reveal-col", {
          opacity: 0,
          y: 48,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: root.current,
            start: "top 75%",
          },
        });

        // 2) PARALLAX — a foto sobe de leve conforme a seção cruza a tela.
        //    scrub: true = a animação fica "presa" ao scroll (vai e volta com ele).
        //    yPercent negativo = sobe; ajuste esse número pra mais/menos parallax.
        gsap.to(".parallax-photo", {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative z-[2] py-24 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr_1fr] gap-10 lg:gap-14 items-stretch">
          {/* Esquerda — saudação + intro curta */}
          <div className="reveal-col flex flex-col justify-between gap-10">
            <h2 className="text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-none">
              {t("greeting")}
            </h2>
            <p className="text-xl md:text-2xl font-medium text-foreground leading-snug max-w-sm">
              {t("lead")}
            </p>
          </div>

          {/* Centro — foto */}
          <div className="reveal-col flex items-center justify-center">
            <div className="parallax-photo relative w-full max-w-[280px] aspect-[4/5] rounded-3xl overflow-hidden bg-surface-2">
              <Image
                src="/gustavo_siveira.jpg"
                alt="Gustavo Silveira"
                fill
                className="object-cover object-top scale-[1.4] origin-top"
                sizes="(max-width: 1024px) 100vw, 280px"
              />
            </div>
          </div>

          {/* Direita — descrição + CTA */}
          <div className="reveal-col flex flex-col justify-between gap-10">
            <div className="space-y-5">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {t("desc_1")}
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {t("desc_2")}
              </p>
            </div>

            <Magnetic strength={0.5}>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 w-fit text-foreground"
              >
                <span className="text-lg font-medium">{t("cta")}</span>
                <span className="flex items-center justify-center w-9 h-9 rounded-full border border-border transition-colors group-hover:bg-foreground group-hover:text-background">
                  <ArrowUpRight size={16} />
                </span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
