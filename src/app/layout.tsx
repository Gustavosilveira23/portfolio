import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Gustavo Silveira — UX Designer & Product Builder",
    template: "%s | Gustavo Silveira",
  },
  description:
    "Portfolio de UX Design, UX Research e Product Building. Do research ao deploy. Construo produtos digitais com foco em experiência e dados.",
  metadataBase: new URL("https://gustavosilveira.com"),
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
      "en": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
    siteName: "Gustavo Silveira",
    title: "Gustavo Silveira — UX Designer & Product Builder",
    description:
      "Portfolio de UX Design, UX Research e Product Building. Do research ao deploy.",
    url: "https://gustavosilveira.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gustavo Silveira — UX Designer & Product Builder",
    description:
      "Portfolio de UX Design, UX Research e Product Building. Do research ao deploy.",
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
    "UX Designer",
    "UX Researcher",
    "Product Builder",
    "Product Design",
    "Design System",
    "Portfolio",
    "Gustavo Silveira",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gustavo Silveira",
    url: "https://gustavosilveira.com",
    jobTitle: "UX Designer & Product Builder",
    description:
      "UX Designer, UX Researcher e Product Builder. Do research ao deploy.",
    sameAs: [
      "https://www.linkedin.com/in/gustavosilveira23/",
      "https://github.com/Gustavosilveira23",
    ],
    knowsAbout: [
      "UX Design",
      "UX Research",
      "Product Design",
      "Design Systems",
      "Frontend Development",
      "AI-Enhanced Workflows",
    ],
  };

  return (
    <html className="dark scroll-smooth bg-background">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
