"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { projects } from "@/content/projects";
import { Hero } from "@/components/hero";
import { ScrollReveal } from "@/components/scroll-reveal";
import { HorizontalScroll } from "@/components/horizontal-scroll";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Linkedin, Github, Mail } from "lucide-react";

type Filter = "all" | "product" | "research" | "design";

const categoryLabels: Record<string, { pt: string; en: string }> = {
  product: { pt: "Produto, Design, Pesquisa", en: "Product, Design, Research" },
  research: { pt: "Pesquisa, Dados, Estrategia", en: "Research, Data, Strategy" },
  design: { pt: "Design, Prototipacao, Testes", en: "Design, Prototyping, Testing" },
};

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale() as "pt" | "en";
  const [filter, setFilter] = useState<Filter>("all");

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t("portfolio.filter_all") },
    { key: "product", label: t("portfolio.filter_product") },
    { key: "research", label: t("portfolio.filter_research") },
    { key: "design", label: t("portfolio.filter_design") },
  ];

  const services = [
    { title: t("services.uxui_title"), desc: t("services.uxui_desc"), tags: t("services.uxui_tags").split(", ") },
    { title: t("services.research_title"), desc: t("services.research_desc"), tags: t("services.research_tags").split(", ") },
    { title: t("services.ds_title"), desc: t("services.ds_desc"), tags: t("services.ds_tags").split(", ") },
    { title: t("services.ai_title"), desc: t("services.ai_desc"), tags: t("services.ai_tags").split(", ") },
    { title: t("services.d2c_title"), desc: t("services.d2c_desc"), tags: t("services.d2c_tags").split(", ") },
  ];



  return (
    <>
      {/* ─── Hero ─── */}
      <Hero />

      {/* ─── Services ─── */}
      <section id="services">
        <HorizontalScroll
          header={
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[2px] text-muted-foreground mb-4 flex items-center gap-3">
                <span className="inline-block w-6 h-px bg-muted-foreground" />
                {t("services.label")}
              </p>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
                {t("services.title")}
              </h2>
            </div>
          }
        >
          {services.map((service) => (
            <div
              key={service.title}
              className="min-w-[85vw] lg:min-w-[600px] lg:max-w-[600px] shrink-0"
            >
              <div className="bg-surface-2 rounded-[20px] p-8 md:p-10 h-full hover:bg-surface-3 transition-colors duration-300">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {service.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[11px] rounded-full border border-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </HorizontalScroll>
      </section>

      {/* ─── Portfolio ─── */}
      <section id="portfolio" className="py-24 px-6 md:px-12 ">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Left column — sticky sidebar */}
            <div className="lg:col-span-5 mb-12 lg:mb-0">
              <div className="lg:sticky lg:top-24">
                <ScrollReveal>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground">
                    {t("portfolio.title")}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-md mb-8">
                    {t("portfolio.subtitle")}
                  </p>
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
              <ScrollReveal key={project.slug} delay={i * 0.08}>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group block"
                >
                  <div className="bg-surface-2 rounded-[20px] p-8 md:p-12 overflow-visible transition-colors duration-300 hover:bg-surface-3">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      {/* Blob image */}
                      <div className="shrink-0">
                        <div
                          className="w-[200px] h-[200px] md:w-[240px] md:h-[240px] overflow-hidden transition-transform duration-500 group-hover:scale-105"
                          style={{
                            borderRadius: "47% 49% 47% 57% / 56% 43% 53% 49%",
                          }}
                        >
                          {project.coverImage ? (
                            <img
                              src={project.coverImage}
                              alt={project.title[locale]}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                              <span className="text-5xl font-bold text-foreground/10">
                                {project.title[locale].charAt(0)}
                              </span>
                            </div>
                          )}
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
                            {t("portfolio.view_project")}
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
      </section>

      {/* ─── About ─── */}
      <section id="about" className="py-24 px-6 md:px-12 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Left column — sticky title */}
            <div className="lg:col-span-5 mb-12 lg:mb-0">
              <div className="lg:sticky lg:top-24">
                <ScrollReveal>
                  <p className="text-xs uppercase tracking-[2px] text-muted-foreground mb-4 flex items-center gap-3">
                    <span className="inline-block w-6 h-px bg-muted-foreground" />
                    {t("about.label")}
                  </p>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground">
                    {t("about.title")}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                    {t("about.subtitle")}
                  </p>
                </ScrollReveal>
              </div>
            </div>

            {/* Right column — content */}
            <div className="lg:col-span-7 space-y-16">
              {/* Bio */}
              <ScrollReveal>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>{t("about.bio_1")}</p>
                  <p>{t("about.bio_2")}</p>
                </div>
              </ScrollReveal>

              {/* Fact sheet */}
              <ScrollReveal delay={0.1}>
                <div>
                  {[
                    { label: t("about.based_in_label"), value: t("about.based_in") },
                    { label: t("about.languages_label"), value: t("about.languages") },
                    { label: t("about.studies_label"), value: t("about.studies") },
                    { label: t("about.off_the_clock_label"), value: t("about.off_the_clock") },
                    { label: t("about.current_obsession_label"), value: t("about.current_obsession") },
                  ].map((fact) => (
                    <div key={fact.label} className="grid grid-cols-[140px_1fr] gap-4 py-5 border-t border-border">
                      <span className="text-xs uppercase tracking-[1.5px] text-muted-foreground font-medium">
                        {fact.label}
                      </span>
                      <span className="text-sm text-foreground">
                        {fact.value}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Experience table */}
              <div>
                <ScrollReveal>
                  <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-12">
                    {t("about.experience_title")}
                    <sup className="text-lg text-muted-foreground ml-1">({t("about.experience_count")})</sup>
                  </h3>
                </ScrollReveal>

                <div className="border-t border-foreground">
                  {[
                    { company: "Raio X Creator", role: "Foundation Team & Product Builder", period: "01/25 - " + (locale === "pt" ? "Atual" : "Current"), location: "Remoto" },
                    { company: "Duo AI", role: "Foundation Team & Product Builder", period: "03/25 - " + (locale === "pt" ? "Atual" : "Current"), location: "Remoto" },
                    { company: "Hotmart", role: "UX Designer & Researcher", period: "01/23 - 12/24", location: "Belo Horizonte" },
                    { company: locale === "pt" ? "Consultoria" : "Consulting", role: "UX/UI Designer & UX Researcher", period: "2015 - " + (locale === "pt" ? "Atual" : "Current"), location: "Remoto" },
                  ].map((exp, i) => (
                    <ScrollReveal key={exp.company} delay={i * 0.05}>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-5 border-b border-border items-baseline">
                        <span className="text-base font-medium text-foreground">{exp.company}</span>
                        <span className="text-sm text-muted-foreground">{exp.role}</span>
                        <span className="text-sm text-muted-foreground">{exp.period}</span>
                        <span className="text-sm text-muted-foreground text-right">{exp.location}</span>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Creations ─── */}
      <section id="creations" className="py-24 px-6 md:px-12 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Left column — sticky title */}
            <div className="lg:col-span-5 mb-12 lg:mb-0">
              <div className="lg:sticky lg:top-24">
                <ScrollReveal>
                  <p className="text-xs uppercase tracking-[2px] text-muted-foreground mb-4 flex items-center gap-3">
                    <span className="inline-block w-6 h-px bg-muted-foreground" />
                    {t("creations.label")}
                  </p>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground">
                    {t("creations.title")}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                    {t("creations.subtitle")}
                  </p>
                </ScrollReveal>
              </div>
            </div>

            {/* Right column — cards */}
            <div className="lg:col-span-7 space-y-6">
              {[
                {
                  title: t("creations.item1_title"),
                  type: t("creations.item1_type"),
                  desc: t("creations.item1_desc"),
                  url: "https://github.com/Gustavosilveira23/claude-design-skills",
                },
                {
                  title: t("creations.item2_title"),
                  type: t("creations.item2_type"),
                  desc: t("creations.item2_desc"),
                  url: "https://www.linkedin.com/feed/update/urn:li:activity:7333927776787353600/",
                },
                {
                  title: t("creations.item3_title"),
                  type: t("creations.item3_type"),
                  desc: t("creations.item3_desc"),
                  url: "https://www.linkedin.com/feed/update/urn:li:activity:7355953891198271488/",
                },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 0.08}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="bg-surface-2 rounded-[20px] p-8 md:p-10 hover:bg-surface-3 transition-colors duration-300">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <span className="inline-block px-2.5 py-1 text-[11px] rounded-full border border-border text-muted-foreground mb-3">
                            {item.type}
                          </span>
                          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">
                            {item.title}
                          </h3>
                        </div>
                        <ArrowUpRight
                          size={20}
                          className="text-muted-foreground shrink-0 mt-1 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                        {item.desc}
                      </p>
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section id="contact" className="py-24 px-6 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {t("contact.title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              {t("contact.subtitle")}
            </p>
            <a
              href="https://www.linkedin.com/in/gustavosilveira23/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full text-sm font-medium uppercase tracking-[1.2px] hover:opacity-90 transition-opacity"
            >
              <Linkedin size={18} />
              {t("contact.cta_linkedin")}
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="mt-12 flex items-center justify-center gap-6">
                <a
                  href="https://github.com/Gustavosilveira23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github size={16} />
                  GitHub
                </a>
                <a
                  href="mailto:gustavosilveira232@gmail.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail size={16} />
                  Email
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
