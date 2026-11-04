import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { pick, readingMinutes, type Locale, type SkillGuide } from "@/content/skills";
import { Block, type BlockLabels } from "./blocks";
import { InlineText } from "./inline";
import { Toc } from "./toc";

const metaClass = "text-xs uppercase tracking-[1.8px] text-muted-foreground";

export async function SkillGuideArticle({ guide, locale }: { guide: SkillGuide; locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "skills" });

  const blockLabels: BlockLabels = {
    copy: t("copy"),
    copied: t("copied"),
    copyAria: t("copy_aria"),
    terminal: t("terminal"),
    shell: t("shell"),
  };

  const updated = new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
    dateStyle: "medium",
  }).format(new Date(`${guide.updated}T12:00:00`));

  const tocItems = [
    ...guide.sections.map((s) => ({ id: s.id, label: pick(s.nav, locale) })),
    { id: "faq", label: t("faq_nav") },
  ];

  return (
    <article className="px-6 pb-32 pt-32 md:px-12 md:pt-40">
      <div className="mx-auto max-w-5xl">
        {/* ─── Cabeçalho: a resposta direta fica na primeira dobra ─── */}
        <header className="max-w-3xl">
          <nav aria-label="Breadcrumb">
            <ol className={`flex flex-wrap items-center gap-2 ${metaClass}`}>
              <li>
                <Link href="/skills" className="transition-colors hover:text-foreground">
                  {t("breadcrumb_root")}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-foreground">
                {pick(guide.breadcrumb, locale)}
              </li>
            </ol>
          </nav>

          <h1 className="mt-6 text-4xl font-medium leading-none tracking-tight text-foreground md:text-6xl">
            {pick(guide.h1, locale)}
          </h1>

          <p className="mt-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
            <InlineText text={pick(guide.lead, locale)} />
          </p>

          <p className={`mt-8 ${metaClass}`}>
            {t("by")}{" "}
            <Link href="/" rel="author" className="text-foreground transition-opacity hover:opacity-60">
              Gustavo Silveira
            </Link>
            {" · "}
            <time dateTime={guide.updated}>
              {t("updated")} {updated}
            </time>
            {" · "}
            {t("min_read", { n: readingMinutes(guide, locale) })}
            {" · "}
            {t("license")}
          </p>
        </header>

        {/* ─── Corpo + sumário ─── */}
        <div className="mt-20 md:mt-28 lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-16">
          <div className="min-w-0 max-w-2xl">
            {guide.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28 pb-20">
                <h2 className="mb-6 text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                  {pick(section.title, locale)}
                </h2>
                <div className="space-y-6">
                  {section.blocks.map((block, i) => (
                    <Block key={i} block={block} locale={locale} labels={blockLabels} />
                  ))}
                </div>
              </section>
            ))}

            <section id="faq" className="scroll-mt-28">
              <h2 className="mb-8 text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                {t("faq_title")}
              </h2>
              <div className="space-y-8">
                {guide.faq.map((item, i) => (
                  <div key={i}>
                    <h3 className="mb-2 text-base font-semibold text-foreground">{pick(item.q, locale)}</h3>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      <InlineText text={pick(item.a, locale)} />
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ─── Autor: só o sinal de quem escreveu. A apresentação completa mora na home. ─── */}
            <footer className="mt-24 flex items-start gap-4 border-t border-border pt-10">
              <Image
                src="/gustavo_siveira.jpg"
                alt="Gustavo Silveira"
                width={56}
                height={56}
                className="size-14 shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="text-base font-medium text-foreground">Gustavo Silveira</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  <InlineText text={pick(guide.author, locale)} />
                </p>
              </div>
            </footer>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <Toc title={t("on_this_page")} items={tocItems} />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
