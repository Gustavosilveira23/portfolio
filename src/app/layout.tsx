import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Gustavo Silveira: Senior Product Designer · AI · SaaS · Startups",
    template: "%s | Gustavo Silveira",
  },
  description:
    "Senior Product Designer specializing in AI product design, SaaS interfaces, and early-stage startups. 8+ years of experience. Available for freelance and contract work.",
  metadataBase: new URL("https://gustavosilveira.com"),
  // Canonical e hreflang ficam em cada página (localeAlternates em src/lib/seo.ts).
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "pt_BR",
    siteName: "Gustavo Silveira",
    title: "Gustavo Silveira: Senior Product Designer · AI · SaaS · Startups",
    description:
      "I design AI products people actually understand. Senior Product Designer specializing in AI interfaces, SaaS, and early-stage products.",
    url: "https://gustavosilveira.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gustavo Silveira: Senior Product Designer · AI · SaaS · Startups",
    description:
      "I design AI products people actually understand. Available for freelance and contract work.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  authors: [{ name: "Gustavo Silveira", url: "https://gustavosilveira.com" }],
  creator: "Gustavo Silveira",
  keywords: [
    "AI product designer",
    "AI UX designer",
    "SaaS product designer",
    "startup UX designer",
    "freelance product designer",
    "conversational AI designer",
    "LLM interface design",
    "design systems",
    "Senior Product Designer",
    "Gustavo Silveira",
  ],
};

// O <html> mora em [locale]/layout.tsx, o único que sabe o idioma da página (atributo lang).
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
