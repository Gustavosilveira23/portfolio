"use client";

import { useTranslations } from "next-intl";
import { WaveAnimation } from "./wave-animation";
import { Typewriter } from "./typewriter";
import { ScrollIndicator } from "./scroll-indicator";
import { useEffect, useState } from "react";

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

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Wave background */}
      <WaveAnimation />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-20">
        {/* Line 1 — greeting + name */}
        <div
          className={`transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <h1 className="text-[32px] sm:text-[48px] md:text-[72px] font-medium leading-none tracking-[-1.5px] sm:tracking-[-2.5px] md:tracking-[-3.36px]">
            <span className="text-muted-foreground">{t("greeting_prefix")}</span>
            <span className="text-foreground">{t("name")}</span>
            <span className="text-muted-foreground">.</span>
          </h1>
        </div>

        {/* Line 2 — typewriter */}
        <div
          className={`mt-3 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-100 ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-[24px] sm:text-[36px] md:text-[56px] font-medium leading-none tracking-[-1px] sm:tracking-[-1.8px] md:tracking-[-2.5px]">
            {mounted && (
              <Typewriter
                prefix={t("tw_prefix")}
                words={typewriterWords}
              />
            )}
          </p>
        </div>

        {/* Subtitle */}
        <div
          className={`mt-8 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-200 ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-lg md:text-xl font-normal text-foreground/60 max-w-[400px] leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}
