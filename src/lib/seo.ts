import type { Metadata } from "next";

export const BASE_URL = "https://gustavosilveira.com";

/**
 * Canonical e hreflang de uma página. `path` é a rota sem o prefixo de idioma:
 * "" para a home, "/about", "/skills/ux-research".
 *
 * Toda página indexável chama isto no próprio generateMetadata. O layout não
 * define canonical de propósito: se definisse, página que esquecesse de
 * sobrescrever apontaria para a home e sumiria do Google.
 */
export function localeAlternates(locale: string, path: string): Metadata["alternates"] {
  const en = path || "/";
  const pt = `/pt${path}`;
  return {
    canonical: locale === "pt" ? pt : en,
    languages: { en, "pt-BR": pt, "x-default": en },
  };
}

/** Valor do atributo `lang` do <html>. */
export function htmlLang(locale: string) {
  return locale === "pt" ? "pt-BR" : "en";
}
