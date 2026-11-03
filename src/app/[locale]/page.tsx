import type { Metadata } from "next";
import { HomeContent } from "@/components/home-content";
import { localeAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: localeAlternates(locale, "") };
}

export default function HomePage() {
  return <HomeContent />;
}
