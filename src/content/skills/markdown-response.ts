import { BASE_URL } from "@/lib/seo";
import { guideToMarkdown } from "./to-markdown";
import { REPO_URL } from "./index";
import type { Locale, SkillGuide } from "./types";

// Uma pasta de rota por guia (src/app/skills/<slug>.md): o Next não aceita segmento "[slug].md".
export function markdownResponse(guide: SkillGuide, locale: Locale) {
  const body = guideToMarkdown(guide, locale, REPO_URL);
  const canonical = `${BASE_URL}${locale === "pt" ? "/pt" : ""}/skills/${guide.slug}`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      // A versão HTML é a canônica. Sem noindex: buscador de IA pode querer justamente este texto.
      Link: `<${canonical}>; rel="canonical"`,
    },
  });
}
