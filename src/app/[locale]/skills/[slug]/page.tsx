import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { SkillGuideArticle } from "@/components/skill-guide/skill-guide";
import { stripInline } from "@/components/skill-guide/inline";
import { getGuide, guides, pick, REPO_URL, type Locale } from "@/content/skills";
import { BASE_URL, localeAlternates } from "@/lib/seo";

// Uma rota para todos os guias. Só os slugs do registro existem; o resto é 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(guides).flatMap((slug) => [
    { locale: "en", slug },
    { locale: "pt", slug },
  ]);
}

type Params = Promise<{ locale: string; slug: string }>;

function toLocale(locale: string): Locale {
  return locale === "pt" ? "pt" : "en";
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = toLocale(raw);
  const guide = getGuide(slug);
  if (!guide) return {};
  const PATH = `/skills/${guide.slug}`;
  const title = pick(guide.meta.title, locale);
  const description = pick(guide.meta.description, locale);
  const url = locale === "pt" ? `/pt${PATH}` : PATH;

  return {
    title,
    description,
    alternates: localeAlternates(locale, PATH),
    openGraph: {
      type: "article",
      title: `${title} | Gustavo Silveira`,
      description,
      url,
      locale: locale === "pt" ? "pt_BR" : "en_US",
      siteName: "Gustavo Silveira",
      publishedTime: guide.published,
      modifiedTime: guide.updated,
      authors: [BASE_URL],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Gustavo Silveira`,
      description,
    },
  };
}

export default async function SkillGuidePage({ params }: { params: Params }) {
  const { locale: raw, slug } = await params;
  const locale = toLocale(raw);
  setRequestLocale(locale);
  const guide = getGuide(slug);
  if (!guide) notFound();
  const PATH = `/skills/${guide.slug}`;

  const prefix = locale === "pt" ? "/pt" : "";
  const pageUrl = `${BASE_URL}${prefix}${PATH}`;
  const author = {
    "@type": "Person",
    name: "Gustavo Silveira",
    url: BASE_URL,
    jobTitle: "Senior Product Designer",
    sameAs: ["https://www.linkedin.com/in/gustavosilveira23/", "https://github.com/Gustavosilveira23"],
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: pick(guide.h1, locale),
      description: pick(guide.meta.description, locale),
      inLanguage: locale === "pt" ? "pt-BR" : "en",
      url: pageUrl,
      mainEntityOfPage: pageUrl,
      // A mesma imagem da OG; o Google recomenda image no Article.
      image: `${BASE_URL}/${locale}${PATH}/opengraph-image`,
      // Data com hora e fuso: o Rich Results Test acusa "datetime sem fuso" na data pura.
      datePublished: `${guide.published}T12:00:00-03:00`,
      dateModified: `${guide.updated}T12:00:00-03:00`,
      author,
      publisher: author,
      about: {
        "@type": "SoftwareSourceCode",
        name: guide.slug,
        description: stripInline(pick(guide.lead, locale)),
        codeRepository: `${REPO_URL}/tree/master/${guide.repoPath}`,
        license: "https://opensource.org/licenses/MIT",
        author,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "AI Skills", item: `${BASE_URL}${prefix}/skills` },
        { "@type": "ListItem", position: 2, name: pick(guide.breadcrumb, locale), item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faq.map((item) => ({
        "@type": "Question",
        name: pick(item.q, locale),
        acceptedAnswer: { "@type": "Answer", text: stripInline(pick(item.a, locale)) },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SkillGuideArticle guide={guide} locale={locale} />
    </>
  );
}
