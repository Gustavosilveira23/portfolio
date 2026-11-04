"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

// Botão na barra de título, não ao lado do comando: assim o comando tem a largura toda e cabe
// numa linha no desktop. No celular ele quebra nos espaços em vez de rolar.
export function CopyCommand({
  command,
  labels,
}: {
  command: string;
  labels: { title: string; copy: string; copied: string; aria: string };
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Sem permissão de clipboard: o comando continua visível e selecionável.
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface-2">
      <div className="flex items-center justify-between border-b border-border py-1.5 pl-4 pr-1.5">
        <span className="text-xs uppercase tracking-[1.8px] text-muted-foreground">{labels.title}</span>
        <button
          type="button"
          onClick={copy}
          aria-label={labels.aria}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-foreground transition-colors hover:bg-surface-3"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span aria-live="polite">{copied ? labels.copied : labels.copy}</span>
        </button>
      </div>
      <pre className="whitespace-pre-wrap p-4 font-mono text-sm leading-relaxed text-foreground">
        <span className="select-none text-muted-foreground">$ </span>
        {command}
      </pre>
    </div>
  );
}
