import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CopyCommand } from "@/components/skill-guide/copy-command";
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

  const [featured, ...rest] = catalog;

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

        <section aria-label={t("index_list")} className="mt-20 md:mt-28">
          {/* Uma lista só com as seis: a única com guia abre com mais peso, as outras são linhas
              de referência. Nome de skill é h2 para o leitor de tela navegar por título. */}
          <ol>
            <li>
              <Link
                href={featured.guide!}
                className="group block border-t border-foreground py-10 transition-opacity hover:opacity-80"
              >
                <h2 className="font-mono text-sm font-normal text-muted-foreground">/{featured.slug}</h2>
                <p className="mt-4 max-w-3xl text-2xl font-medium leading-snug tracking-tight text-foreground md:text-3xl">
                  {pick(featured.line, locale)}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  {t("index_guide")}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
            {rest.map((skill) => (
              <li
                key={skill.slug}
                className="grid gap-2 border-t border-border py-6 md:grid-cols-[12rem_minmax(0,1fr)_auto] md:items-baseline md:gap-8"
              >
                <h2 className="font-mono text-sm font-normal text-foreground">/{skill.slug}</h2>
                <p className="text-base leading-relaxed text-muted-foreground">{pick(skill.line, locale)}</p>
                <a
                  href={sourceUrl(skill.slug)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t("index_source")}: ${skill.slug}`}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm text-foreground transition-opacity hover:opacity-60"
                >
                  {t("index_source")}
                  <ArrowUpRight size={14} />
                </a>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  );
}
