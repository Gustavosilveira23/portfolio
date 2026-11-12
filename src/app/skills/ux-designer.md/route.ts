import { uxDesignerGuide } from "@/content/skills";
import { markdownResponse } from "@/content/skills/markdown-response";

// Fora do [locale]: o middleware ignora caminhos com ponto, então /skills/ux-designer.md chega aqui direto.
export const dynamic = "force-static";

export function GET() {
  return markdownResponse(uxDesignerGuide, "en");
}
