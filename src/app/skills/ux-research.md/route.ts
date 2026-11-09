import { markdownResponse } from "@/content/skills/markdown-response";

// Fora do [locale]: o middleware ignora caminhos com ponto, então /skills/ux-research.md chega aqui direto.
export const dynamic = "force-static";

export function GET() {
  return markdownResponse("en");
}
