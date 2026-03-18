"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { projects } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ArrowRight } from "lucide-react";

type Filter = "all" | "product" | "research" | "design";

const categoryLabels: Record<string, { pt: string; en: string }> = {
  product: { pt: "Produto, Design, Pesquisa", en: "Product, Design, Research" },
  research: { pt: "Pesquisa, Dados, Estrategia", en: "Research, Data, Strategy" },
  design: { pt: "Design, Prototipacao, Testes", en: "Design, Prototyping, Testing" },
};

export default function PortfolioPage() {
  const t = useTranslations("portfolio");
  const locale = useLocale() as "pt" | "en";
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t("filter_all") },
    { key: "product", label: t("filter_product") },
    { key: "research", label: t("filter_research") },
    { key: "design", label: t("filter_design") },
  ];

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Left column — sticky sidebar */}
          <div className="lg:col-span-5 mb-12 lg:mb-0">
            <div className="lg:fixed lg:w-[calc(41.666%-3rem)] lg:max-w-[480px] lg:top-1/2 lg:-translate-y-1/2">
              <ScrollReveal>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground">
                  {t("title")}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-md mb-8">
                  {t("subtitle")}
                </p>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                  {filters.map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setFilter(key)}
                      className={`px-4 py-2 rounded-full text-xs uppercase tracking-[1.2px] font-medium transition-all duration-200 ${
                        filter === key
                          ? "bg-foreground text-background"
                          : "bg-border text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Right column — scrollable cards */}
          <div className="lg:col-span-7">
            <div className="space-y-16">
              {filtered.map((project, i) => (
                <ScrollReveal key={project.slug} delay={i * 0.1}>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="group block"
                  >
                    <div className="bg-surface-2 rounded-[20px] p-8 md:p-12 overflow-visible transition-colors duration-300 hover:bg-surface-3">
                      <div className="flex flex-col md:flex-row gap-8 items-center">
                        {/* Blob image */}
                        <div className="shrink-0">
                          <div
                            className="w-[200px] h-[200px] md:w-[240px] md:h-[240px] bg-muted/50 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
                            style={{
                              borderRadius: "47% 49% 47% 57% / 56% 43% 53% 49%",
                              backgroundBlendMode: "multiply",
                            }}
                          >
                            <span className="text-5xl font-bold text-foreground/10">
                              {project.title[locale].charAt(0)}
                            </span>
                          </div>
                        </div>

                        {/* Card info */}
                        <div className="flex-1 text-center md:text-left">
                          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2 group-hover:text-foreground/80 transition-colors">
                            {project.title[locale]}
                          </h3>
                          <p className="text-xs uppercase tracking-[1.5px] text-muted-foreground mb-4">
                            {categoryLabels[project.category]?.[locale] ??
                              project.tags.slice(0, 3).join(", ")}
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-md">
                            {project.description[locale]}
                          </p>
                          <div className="flex items-center justify-center md:justify-between">
                            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[1.2px] text-foreground/50 group-hover:text-foreground/80 transition-colors">
                              {locale === "pt" ? "Ver projeto" : "View project"}
                              <ArrowRight
                                size={12}
                                className="group-hover:translate-x-1 transition-transform"
                              />
                            </span>
                            <span className="hidden md:block text-xs text-muted-foreground/50 tracking-wide">
                              {project.year}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
