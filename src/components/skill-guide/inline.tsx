import { Link } from "@/i18n/navigation";

// Marcação inline dos guias: **negrito**, `código` e [texto](href).
// Link que começa com "/" é interno e passa pelo next-intl para manter o idioma.
const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

const linkClass =
  "text-foreground underline underline-offset-4 decoration-foreground/30 transition-colors hover:decoration-foreground";

export function InlineText({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={i} className="font-mono text-sm bg-surface-2 rounded-sm px-1.5 py-0.5">
              {part.slice(1, -1)}
            </code>
          );
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, href] = link;
          if (href.startsWith("/")) {
            return (
              <Link key={i} href={href as never} className={linkClass}>
                {label}
              </Link>
            );
          }
          return (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {label}
            </a>
          );
        }
        return part;
      })}
    </>
  );
}

/** Mesmo texto sem marcação, para JSON-LD e atributos. */
export function stripInline(text: string) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}
