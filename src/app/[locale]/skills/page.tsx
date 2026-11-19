import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { CopyCommand } from "@/components/skill-guide/copy-command";
import { SkillsMap, type MapNode } from "@/components/skills-map/skills-map";
import { handoffs, mapCopy, mapEdges, mapSkills } from "@/content/skills/map";
import { catalog, indexCopy, INSTALL_ALL, pick, REPO_URL, type Locale } from "@/content/skills";
import { BASE_URL, localeAlternates } from "@/lib/seo";

const PATH = "/skills";
const metaClass = "text-xs uppercase tracking-[1.8px] text-muted-foreground";

function toLocale(locale: string): Locale {
  return locale === "pt" ? "pt" : "en";
}

const sourceUrl = (slug: string) => `${REPO_URL}/blob/master/skills/${slug}/SKILL.md`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return {
    title: pick(indexCopy.meta.title, locale),
    description: pick(indexCopy.meta.description, locale),
    alternates: localeAlternates(locale, PATH),
  };
}

export default async function SkillsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "skills" });

  const prefix = locale === "pt" ? "/pt" : "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pick(indexCopy.h1, locale),
    description: pick(indexCopy.meta.description, locale),
    url: `${BASE_URL}${prefix}${PATH}`,
    inLanguage: locale === "pt" ? "pt-BR" : "en",
    author: { "@type": "Person", name: "Gustavo Silveira", url: BASE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: catalog.map((skill, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: skill.guide ? `${BASE_URL}${prefix}${skill.guide}` : sourceUrl(skill.slug),
        name: skill.slug,
      })),
    },
  };

  // Lista das skills com o Metrô ao lado (escolhida em 18/11/2026). Texto resolvido aqui, no servidor.
  const mapNodes: MapNode[] = mapSkills.map((m) => {
    const entry = catalog.find((c) => c.slug === m.slug)!;
    return {
      slug: m.slug,
      stage: m.stage,
      question: pick(m.question, locale),
      line: pick(entry.line, locale),
      href: entry.guide ?? sourceUrl(m.slug),
      internal: Boolean(entry.guide),
      cta: entry.guide ? t("index_guide") : t("index_source"),
      handsOff: handoffs[m.slug] ?? [],
    };
  });
  const mapLabels = {
    label: pick(mapCopy.label, locale),
    title: pick(mapCopy.title, locale),
    handsOff: pick(mapCopy.handsOff, locale),
    stages: Object.fromEntries(Object.entries(mapCopy.stages).map(([k, v]) => [k, pick(v, locale)])),
  };

  return (
    <article className="px-6 pb-32 pt-32 md:px-12 md:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-5xl">
        <header className="max-w-3xl">
          <p className={metaClass}>{t("breadcrumb_root")}</p>
          <h1 className="mt-6 text-4xl font-medium leading-none tracking-tight text-foreground md:text-6xl">
            {pick(indexCopy.h1, locale)}
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
            {pick(indexCopy.lead, locale)}
          </p>
          <div className="mt-10 max-w-2xl">
            <CopyCommand
              command={INSTALL_ALL}
              labels={{
                title: pick(indexCopy.installLabel, locale),
                copy: t("copy"),
                copied: t("copied"),
                aria: t("copy_all_aria"),
              }}
            />
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-foreground transition-opacity hover:opacity-60"
            >
              {t("index_repo")}
              <ArrowUpRight size={14} />
            </a>
          </div>
        </header>

        <SkillsMap nodes={mapNodes} edges={mapEdges} handoffs={handoffs} labels={mapLabels} />
      </div>
    </article>
  );
}
