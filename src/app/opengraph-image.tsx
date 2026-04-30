import { ImageResponse } from "next/og";

export const alt = "Gustavo Silveira — Senior Product Designer · AI · SaaS · Startups";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
            fontSize: 22,
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
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -3,
              color: "#fff",
            }}
          >
            Senior Product Designer
          </div>
          <div
            style={{
              fontSize: 40,
              color: "#999",
              marginTop: 24,
              fontWeight: 400,
              letterSpacing: -1,
            }}
          >
            AI · SaaS · Startups · 8+ years
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#666",
            letterSpacing: 1,
          }}
        >
          <span>gustavosilveira.com</span>
          <span style={{ color: "#999" }}>Available for freelance & contract</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
