import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

// A página de contato é client component e não pode exportar metadata: ela vem daqui.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: localeAlternates(locale, "/contact") };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
