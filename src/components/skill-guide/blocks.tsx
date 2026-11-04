import { pick, type GuideBlock, type Locale } from "@/content/skills";
import { InlineText } from "./inline";
import { CopyCommand } from "./copy-command";

export type BlockLabels = {
  copy: string;
  copied: string;
  copyAria: string;
  terminal: string;
  shell: string;
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
      );

    case "table":
      return (
        <div className="scrollbar-subtle overflow-x-auto">
          <table className="w-full min-w-lg text-left text-sm">
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
              {block.rows.map((row, r) => (
                <tr key={r} className="border-t border-border">
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className={`py-3 pr-4 align-top leading-relaxed ${
                        c === 0 ? "font-medium text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {pick(cell, locale)}
                    </td>
                  ))}
                </tr>
              ))}
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
        <CopyCommand
          command={block.command}
          labels={{ title: labels.shell, copy: labels.copy, copied: labels.copied, aria: labels.copyAria }}
        />
      );

    case "conversation":
      // F1: a conversa inteira, parada. O replay no scroll entra na F2 por cima deste HTML.
      return (
        <figure className="overflow-hidden rounded-xl border border-border bg-surface-2">
          <figcaption className={`border-b border-border px-4 py-3 ${labelClass}`}>{labels.terminal}</figcaption>
          <div className="space-y-5 p-4 font-mono text-sm leading-relaxed">
            {block.turns.map((turn, i) =>
              turn.role === "user" ? (
                <p key={i} className="whitespace-pre-wrap text-muted-foreground">
                  <span aria-hidden className="select-none">&gt; </span>
                  {pick(turn.text, locale)}
                </p>
              ) : (
                <p key={i} className="whitespace-pre-wrap text-foreground">
                  {pick(turn.text, locale)}
                </p>
              )
            )}
          </div>
        </figure>
      );
  }
}
