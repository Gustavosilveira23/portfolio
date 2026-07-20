"use client";

import { useTranslations } from "next-intl";
import { WaveAnimation } from "./wave-animation";
import { Typewriter } from "./typewriter";
import { ScrollIndicator } from "./scroll-indicator";
import { EasterEgg } from "./easter-egg";
import { useEffect, useState, useRef, Fragment } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const t = useTranslations("hero");
  const [mounted, setMounted] = useState(false);

  const typewriterWords = [
    t("tw_designer"),
    t("tw_researcher"),
    t("tw_builder"),
    t("tw_curious"),
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Split text: revela o headline palavra por palavra na entrada.
  // Cada palavra é um <span>; o GSAP anima todos com stagger (cascata).
  const headlineRef = useRef<HTMLHeadingElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(headlineRef.current!.querySelectorAll(".word"), {
          opacity: 0,
          yPercent: 100, // começa deslocada 1x a própria altura, e sobe
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.06, // atraso entre palavras = a cascata
          delay: 0.35, // entra logo depois do typewriter
        });
      });
    },
    { scope: headlineRef }
  );

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Wave background */}
      <WaveAnimation />

      {/* Content — duas colunas: texto | foto */}
      <div className="relative z-10 h-full px-8 md:px-20 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center">
        {/* Coluna esquerda — texto */}
        <div className="flex flex-col justify-center">
        {/* Typewriter — above headline */}
        <div
          className={`mb-4 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-sm sm:text-base md:text-lg font-medium uppercase tracking-[2px] text-muted-foreground">
            {mounted && (
              <Typewriter
                prefix={t("tw_prefix")}
                words={typewriterWords}
              />
            )}
          </p>
        </div>

        {/* Headline — split text: cada palavra num span, animada com stagger */}
        <h1
          ref={headlineRef}
          className="text-[40px] sm:text-[54px] md:text-[72px] font-medium leading-none tracking-[-1.5px] sm:tracking-[-2.5px] md:tracking-[-3.36px] text-foreground"
        >
          {t("headline")
            .split(" ")
            .map((word, i, arr) => (
              <Fragment key={i}>
                <span className="word inline-block will-change-transform">
                  {word}
                </span>
                {i < arr.length - 1 ? " " : ""}
              </Fragment>
            ))}
        </h1>
        </div>

        {/* Coluna direita — foto (easter egg) */}
        <div className="relative h-full">
          <EasterEgg />
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}
