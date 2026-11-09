import { BASE_URL } from "@/lib/seo";
import { guideToMarkdown } from "./to-markdown";
import { REPO_URL, uxResearchGuide } from "./index";
import type { Locale } from "./types";

export function markdownResponse(locale: Locale) {
  const body = guideToMarkdown(uxResearchGuide, locale, REPO_URL);
  const canonical = `${BASE_URL}${locale === "pt" ? "/pt" : ""}/skills/${uxResearchGuide.slug}`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      // A versão HTML é a canônica. Sem noindex: buscador de IA pode querer justamente este texto.
      Link: `<${canonical}>; rel="canonical"`,
    },
  });
}
