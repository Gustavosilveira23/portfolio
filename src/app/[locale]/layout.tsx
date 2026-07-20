import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Nav } from "@/components/nav";
import { DotGrid } from "@/components/dot-grid";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollSync } from "@/components/scroll-sync";
import { CustomCursor } from "@/components/custom-cursor";

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
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SmoothScroll>
        <ScrollSync />
        <CustomCursor />
        <DotGrid />
        <Nav />
        <main className="relative z-[2] min-h-screen">{children}</main>
      </SmoothScroll>
    </NextIntlClientProvider>
  );
}
