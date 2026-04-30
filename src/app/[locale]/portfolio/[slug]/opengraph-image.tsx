import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/content/projects";

export const alt = "Case study by Gustavo Silveira";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const categoryLabels: Record<string, string> = {
  product: "Product · Design · Research",
  research: "Research · Data · Strategy",
  design: "Design · Prototyping · Testing",
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale: localeParam } = await params;
  const project = getProjectBySlug(slug);
  const locale = (localeParam === "pt" ? "pt" : "en") as "pt" | "en";

  const title = project?.title[locale] ?? "Case study";
  const description = project?.description[locale] ?? "";
  const category = project ? categoryLabels[project.category] ?? "" : "";
  const year = project?.year ?? "";

  const truncatedDescription =
    description.length > 180 ? description.slice(0, 180) + "..." : description;

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
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#999",
            letterSpacing: 3,
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: 32, height: 1, background: "#666" }} />
            Gustavo Silveira
          </div>
          {year && <span style={{ color: "#666" }}>{year}</span>}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {category && (
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
              {category}
            </div>
          )}
          <div
            style={{
              fontSize: title.length > 50 ? 64 : 80,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#fff",
              marginBottom: 24,
            }}
          >
            {title}
          </div>
          {truncatedDescription && (
            <div
              style={{
                fontSize: 26,
                color: "#aaa",
                fontWeight: 400,
                letterSpacing: -0.5,
                lineHeight: 1.4,
                maxWidth: 1000,
              }}
            >
              {truncatedDescription}
            </div>
          )}
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
          <span>gustavosilveira.com/portfolio/{slug}</span>
          <span style={{ color: "#888" }}>Senior Product Designer</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
