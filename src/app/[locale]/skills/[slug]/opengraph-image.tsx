import { ImageResponse } from "next/og";
import { getGuide, pick } from "@/content/skills";

// Mesmo desenho da imagem de case. Arquivo próprio porque a página define `openGraph` na
// metadata, e isso substitui o bloco do pai, imagem incluída.
// alt fixo: o export não recebe o slug, e generateImageMetadata mudaria a URL da imagem.
export const alt = "Guide to a Claude Code skill, by Gustavo Silveira";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  const locale = raw === "pt" ? "pt" : "en";
  const guide = getGuide(slug);
  if (!guide) return new Response("Not found", { status: 404 });
  const title = pick(guide.h1, locale);
  const description = pick(guide.meta.description, locale);
  const prefix = locale === "pt" ? "/pt" : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
          color: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: 20,
            color: "#999",
            letterSpacing: 3,
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          <div style={{ width: 32, height: 1, background: "#666" }} />
          Gustavo Silveira
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              color: "#888",
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 24,
              fontWeight: 500,
            }}
          >
            AI Skills
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#fff",
              marginBottom: 24,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 26, color: "#aaa", lineHeight: 1.4, maxWidth: 1000 }}>{description}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#666",
            letterSpacing: 1,
          }}
        >
          <span>gustavosilveira.com{prefix}/skills/{guide.slug}</span>
          <span style={{ color: "#888", fontFamily: "monospace" }}>/{guide.slug}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
