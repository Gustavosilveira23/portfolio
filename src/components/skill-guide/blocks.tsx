import Image from "next/image";
import { pick, type GuideBlock, type Locale } from "@/content/skills";
import { InlineText } from "./inline";
import { CopyCommand } from "./copy-command";
import { ConversationReplay } from "./conversation-replay";
import { ScrollReveal } from "@/components/scroll-reveal";

export type BlockLabels = {
  copy: string;
  copied: string;
  copyAria: string;
  terminal: string;
  shell: string;
  fullSize: string;
};

const labelClass = "text-xs uppercase tracking-[1.8px] text-muted-foreground";

export function Block({
  block,
  locale,
  labels,
}: {
  block: GuideBlock;
  locale: Locale;
  labels: BlockLabels;
}) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-base leading-relaxed text-foreground">
          <InlineText text={pick(block.text, locale)} />
        </p>
      );

    case "code":
      return (
        <ScrollReveal>
          <figure className="space-y-2">
            {block.label && <figcaption className={labelClass}>{pick(block.label, locale)}</figcaption>}
            <pre
              className={`rounded-xl border border-border bg-surface-2 p-4 font-mono text-sm leading-relaxed text-foreground ${
                block.wrap ? "whitespace-pre-wrap" : "scrollbar-subtle overflow-x-auto"
              }`}
            >
              {pick(block.code, locale)}
            </pre>
          </figure>
        </ScrollReveal>
      );

    case "table":
      return (
        <div className="scrollbar-subtle overflow-x-auto">
          {/* No celular a tabela cabe na coluna e o texto quebra; a largura mínima só a partir de sm. */}
          <table className="w-full text-left text-sm sm:min-w-lg">
            <thead>
              <tr>
                {block.head.map((cell, i) => (
                  <th key={i} scope="col" className={`pb-3 pr-4 font-normal ${labelClass}`}>
                    {pick(cell, locale)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => {
                const isTotal = block.total && r === block.rows.length - 1;
                return (
                  <tr key={r} className={`border-t ${isTotal ? "border-foreground" : "border-border"}`}>
                    {row.map((cell, c) =>
                      c === 0 ? (
                        <th
                          key={c}
                          scope="row"
                          className="py-3 pr-4 align-top font-medium leading-relaxed text-foreground"
                        >
                          {pick(cell, locale)}
                        </th>
                      ) : (
                        <td
                          key={c}
                          className={`py-3 pr-4 align-top leading-relaxed ${
                            isTotal ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {pick(cell, locale)}
                        </td>
                      ),
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );

    case "list":
      return (
        <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground">
          {block.items.map((item, i) => (
            <li key={i} className="pl-1 text-base leading-relaxed text-foreground">
              <InlineText text={pick(item, locale)} />
            </li>
          ))}
        </ul>
      );

    case "callout":
      return (
        <aside className="border-l-2 border-foreground pl-5">
          <p className={`mb-2 ${labelClass}`}>{pick(block.label, locale)}</p>
          <p className="text-lg leading-relaxed text-foreground">{pick(block.text, locale)}</p>
        </aside>
      );

    case "install":
      return (
        <ScrollReveal>
          <CopyCommand
            command={block.command}
            labels={{ title: labels.shell, copy: labels.copy, copied: labels.copied, aria: labels.copyAria }}
          />
        </ScrollReveal>
      );

    case "conversation":
      return (
        <ConversationReplay
          title={labels.terminal}
          labelClass={labelClass}
          turns={block.turns.map((turn) => ({ role: turn.role, text: pick(turn.text, locale) }))}
        />
      );

    case "figure":
      return (
        <ScrollReveal>
          {/* space-y-6: a legenda vale para o par; no celular ela fica mais longe da última imagem
              do que as imagens ficam entre si (gap-4). */}
          <figure className="space-y-6">
            {/* Duas imagens ficam lado a lado a partir de sm; no celular empilham. */}
            <div className={`grid gap-4 ${block.images.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {block.images.map((image) => (
                // Na coluna a imagem sai a ~23% do arquivo e o texto da tela não se lê: o item
                // inteiro abre o PNG original. Rótulo, dica e imagem formam um link só (um foco).
                <a
                  key={image.src}
                  href={image.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block space-y-2"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className={labelClass}>{pick(image.label, locale)}</span>
                    <span
                      aria-hidden="true"
                      className="text-xs text-muted-foreground underline underline-offset-4 transition-colors group-hover:text-foreground"
                    >
                      {labels.fullSize}
                    </span>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-border transition-colors group-hover:border-muted-foreground">
                    <Image
                      src={image.src}
                      width={image.width}
                      height={image.height}
                      alt={pick(image.alt, locale)}
                      // A coluna do artigo tem no máximo 672px: lado a lado, cada imagem ocupa ~330px.
                      sizes="(min-width: 640px) 336px, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                </a>
              ))}
            </div>
            <figcaption className="text-sm leading-relaxed text-muted-foreground">
              {pick(block.caption, locale)}
            </figcaption>
          </figure>
        </ScrollReveal>
      );
  }
}
