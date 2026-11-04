"use client";

/**
 * ConversationReplay: a conversa do `/ux-research` vazio tocando como terminal.
 *
 * O texto inteiro sai no HTML do servidor (buscador e IA leem tudo). A animação só
 * esconde e revela por cima, fala por fala, quando cada uma entra na tela:
 * - fala do usuário: digitada caractere a caractere, no máximo 0,8s;
 * - fala da skill: linhas entram em sequência, como saída de terminal.
 *
 * Cada fala anima uma vez e em menos de 1,2s. Rolar rápido não deixa nada escondido.
 * Com prefers-reduced-motion, nada se mexe e tudo fica visível.
 */

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export type ReplayTurn = { role: "user" | "skill"; text: string };

const TYPE_MAX = 0.8; // segundos para digitar a fala mais longa
const CHAR_STEP = 0.022; // ritmo de uma fala curta

export function ConversationReplay({
  turns,
  title,
  labelClass,
}: {
  turns: ReplayTurn[];
  title: string;
  labelClass: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const splits: SplitText[] = [];

        root.querySelectorAll<HTMLElement>("[data-turn]").forEach((turn) => {
          const trigger = { trigger: turn, start: "top 88%", once: true };

          if (turn.dataset.turn === "user") {
            const target = turn.querySelector<HTMLElement>("[data-typed]");
            if (!target) return;
            // "words" junto: sem ele a palavra quebra no meio e a fala muda de altura ao reverter.
            const split = SplitText.create(target, { type: "words,chars" });
            splits.push(split);
            const step = Math.min(CHAR_STEP, TYPE_MAX / split.chars.length);
            gsap.from(split.chars, {
              opacity: 0,
              duration: 0.01,
              stagger: step,
              ease: "none",
              scrollTrigger: trigger,
              // Devolve o DOM original: copiar e colar e leitor de tela voltam ao normal.
              onComplete: () => split.revert(),
            });
          } else {
            gsap.from(turn.querySelectorAll("[data-line]"), {
              autoAlpha: 0,
              y: 6,
              duration: 0.35,
              stagger: 0.06,
              delay: 0.2, // a pausa de quem pensa antes de responder
              ease: "power2.out",
              scrollTrigger: trigger,
            });
          }
        });

        return () => splits.forEach((s) => s.revert());
      });
    },
    { scope: ref }
  );

  return (
    <figure ref={ref} className="overflow-hidden rounded-xl border border-border bg-surface-2">
      <figcaption className={`border-b border-border px-4 py-3 ${labelClass}`}>{title}</figcaption>
      <div className="space-y-5 p-4 font-mono text-sm leading-relaxed">
        {turns.map((turn, i) =>
          turn.role === "user" ? (
            <p key={i} data-turn="user" className="whitespace-pre-wrap text-muted-foreground">
              <span aria-hidden className="select-none">
                &gt;{" "}
              </span>
              <span data-typed>{turn.text}</span>
            </p>
          ) : (
            <p key={i} data-turn="skill" className="text-foreground">
              {turn.text.split("\n").map((line, j) => (
                <span key={j} data-line className="block whitespace-pre-wrap">
                  {line || " "}
                </span>
              ))}
            </p>
          )
        )}
      </div>
    </figure>
  );
}
