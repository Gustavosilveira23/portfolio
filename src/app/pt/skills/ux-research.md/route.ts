import { markdownResponse } from "@/content/skills/markdown-response";

export const dynamic = "force-static";

export function GET() {
  return markdownResponse("pt");
}
