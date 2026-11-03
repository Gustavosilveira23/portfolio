import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { htmlLang } from "@/lib/seo";
import { Nav } from "@/components/nav";
import { DotGrid } from "@/components/dot-grid";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollSync } from "@/components/scroll-sync";
import { CustomCursor } from "@/components/custom-cursor";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={htmlLang(locale)} className="dark scroll-smooth bg-background">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SmoothScroll>
            <ScrollSync />
            <CustomCursor />
            <DotGrid />
            <Nav />
            <main className="relative z-[2] min-h-screen">{children}</main>
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId="G-EXZMV47S4W" />
    </html>
  );
}
