import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
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
    default: "Gustavo Silveira — Senior Product Designer · AI · SaaS · Startups",
    template: "%s | Gustavo Silveira",
  },
  description:
    "Senior Product Designer specializing in AI product design, SaaS interfaces, and early-stage startups. 8+ years of experience. Available for freelance and contract work.",
  metadataBase: new URL("https://gustavosilveira.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "pt-BR": "/pt",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "pt_BR",
    siteName: "Gustavo Silveira",
    title: "Gustavo Silveira — Senior Product Designer · AI · SaaS · Startups",
    description:
      "I design AI products people actually understand. Senior Product Designer specializing in AI interfaces, SaaS, and early-stage products.",
    url: "https://gustavosilveira.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gustavo Silveira — Senior Product Designer · AI · SaaS · Startups",
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
    jobTitle: "Senior Product Designer",
    description:
      "Senior Product Designer specializing in AI product design, SaaS interfaces, and early-stage startups.",
    sameAs: [
      "https://www.linkedin.com/in/gustavosilveira23/",
      "https://github.com/Gustavosilveira23",
    ],
    knowsAbout: [
      "AI Product Design",
      "UX Design",
      "SaaS Design",
      "Design Systems",
      "User Research",
      "Conversational AI",
    ],
    worksFor: [
      { "@type": "Organization", name: "Duo AI" },
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Product Design Consulting",
          serviceType: "AI Product Design, SaaS UX, Design Systems, User Research",
        },
        availability: "https://schema.org/InStock",
        areaServed: "Global",
      },
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "UFMG",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Uberlandia",
      addressRegion: "MG",
      addressCountry: "BR",
    },
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
      <GoogleAnalytics gaId="G-NDLMFR0BNC" />
    </html>
  );
}
