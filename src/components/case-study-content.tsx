"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import type { Project } from "@/content/projects";

function parseFindingsFromDecisions(
  decisions: string
): { title: string; body: string }[] {
  return decisions
    .split(/\d+\.\s+/)
    .filter(Boolean)
    .map((block) => {
      const match = block.match(/\*\*(.*?)\*\*[:\s]*([\s\S]*)/);
      if (match) {
        return {
          title: match[1].trim(),
          body: match[2].trim().replace(/\*\*/g, ""),
        };
      }
      const lines = block.trim().split("\n");
      return {
        title: lines[0].replace(/\*\*/g, "").trim(),
        body: lines.slice(1).join(" ").trim(),
      };
    });
}

function isVideo(src: string) {
  return /\.(mp4|webm|mov)$/i.test(src);
}

function Media({ src, alt, className }: { src: string; alt?: string; className?: string }) {
  if (isVideo(src)) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={className}
      />
    );
  }
  return <img src={src} alt={alt || ""} className={className} />;
}

function ContentBlock({
  label,
  content,
}: {
  label: string;
  content: string;
}) {
  return (
    <div className="grid md:grid-cols-[20%_1fr] gap-6">
      <p className="text-base text-muted-foreground">{label}</p>
      <div className="text-base text-foreground leading-relaxed">
        {content.split("\n\n").map((p, i) => (
          <p key={i} className="mb-4 last:mb-0">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

export function CaseStudyContent({
  project,
  prev,
  next,
}: {
  project: Project;
  prev: Project | null | undefined;
  next: Project | null | undefined;
}) {
  const t = useTranslations("case");
  const locale = useLocale() as "pt" | "en";

  const findings = parseFindingsFromDecisions(project.decisions[locale]);

  return (
    <div className="bg-surface-1">
      {/* ─── 1. Hero ─── */}
      <section
        id="case-top"
        className="relative h-screen flex flex-col justify-center px-8 md:px-20"
      >
        {/* Back nav */}
        <div className="absolute top-20 left-8 md:left-20 z-10">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-base text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
            {locale === "pt" ? "Voltar" : "Back"}
          </Link>
        </div>

        <ScrollReveal>
          <h1 className="text-[28px] sm:text-[40px] md:text-[56px] font-medium leading-none tracking-[-1.5px] sm:tracking-[-2.5px] md:tracking-[-4.32px] text-foreground max-w-3xl">
            {project.title[locale]}
          </h1>
        </ScrollReveal>

        <ScrollIndicator />
      </section>

      {/* ─── 2. Metadata Row ─── */}
      <section className="px-8 md:px-20 pb-16">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div>
              <p className="text-lg text-muted-foreground mb-1">
                {locale === "pt" ? "Cliente" : "Client"}
              </p>
              <p className="text-lg text-foreground">
                {locale === "pt" ? "Projeto Pessoal" : "Personal Project"}
              </p>
            </div>
            <div>
              <p className="text-lg text-muted-foreground mb-1">
                {locale === "pt" ? "Ano" : "Year"}
              </p>
              <p className="text-lg text-foreground">{project.year}</p>
            </div>
            <div>
              <p className="text-lg text-muted-foreground mb-1">
                {locale === "pt" ? "Serviços" : "Services"}
              </p>
              <div className="flex flex-col">
                {project.tags.map((tag) => (
                  <p key={tag} className="text-lg text-foreground">
                    {tag}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── 3. Cover Image ─── */}
      <section className="px-8 md:px-20 py-20">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto aspect-[16/9] rounded-2xl bg-surface-2 overflow-hidden">
            {project.images.length > 0 ? (
              <Media
                src={project.images[0]}
                alt={project.title[locale]}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-7xl md:text-9xl font-bold text-foreground/[0.04] select-none">
                  {project.title[locale]}
                </span>
              </div>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* ─── 4. Content Blocks ─── */}
      <section className="px-8 md:px-20 py-20">
        <div className="max-w-5xl mx-auto space-y-20">
          <ScrollReveal>
            <ContentBlock
              label={t("context")}
              content={project.context[locale]}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <ContentBlock
              label={t("role")}
              content={project.role[locale]}
            />
          </ScrollReveal>

          {/* Image after role — post details / analysis */}
          {project.images.length > 1 && (
            <ScrollReveal>
              <div className="max-w-3xl mx-auto rounded-2xl bg-surface-2 overflow-hidden">
                <Media
                  src={project.images[1]}
                  className="w-full h-auto"
                />
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.1}>
            <ContentBlock
              label={t("process")}
              content={project.process[locale]}
            />
          </ScrollReveal>

          {/* Image after process — labs / AI */}
          {project.images.length > 3 && (
            <ScrollReveal>
              <div className="max-w-3xl mx-auto rounded-2xl bg-surface-2 overflow-hidden">
                <Media
                  src={project.images[3]}
                  className="w-full h-auto"
                />
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ─── 5. Key Findings ─── */}
      {findings.length > 0 && (
        <section className="px-8 md:px-20 py-20">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-[28px] sm:text-[40px] md:text-[56px] font-medium leading-none tracking-[-1.5px] sm:tracking-[-2.5px] md:tracking-[-4.32px] text-foreground mb-16">
                {t("decisions")}
              </h2>
            </ScrollReveal>

            <div>
              {findings.map((finding, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div
                    className={`py-8 ${
                      i > 0 ? "border-t border-border" : ""
                    }`}
                  >
                    <p className="text-base text-muted-foreground mb-3">
                      {finding.title}
                    </p>
                    <p className="text-base text-foreground leading-relaxed max-w-2xl">
                      {finding.body}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Design System images after decisions */}
            {project.images.length > 2 && (
              <ScrollReveal>
                <div className="mt-16 max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                  <div className="rounded-2xl bg-surface-2 overflow-hidden">
                    <Media
                      src={project.images[2]}
                      className="w-full h-auto"
                    />
                  </div>
                  {project.images.length > 4 && (
                    <div className="rounded-2xl bg-surface-2 overflow-hidden">
                      <Media
                        src={project.images[4]}
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>
      )}

      {/* ─── 6. Results ─── */}
      <section className="px-8 md:px-20 py-20">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-[28px] sm:text-[40px] md:text-[56px] font-medium leading-none tracking-[-1.5px] sm:tracking-[-2.5px] md:tracking-[-4.32px] text-foreground mb-16">
              {t("results")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="grid md:grid-cols-[20%_1fr] gap-6">
              <div />
              <div className="text-base text-foreground leading-relaxed">
                {project.results[locale].split("\n").map((line, i) => {
                  const clean = line.replace(/^-\s*/, "").trim();
                  if (!clean) return null;
                  return (
                    <p
                      key={i}
                      className="mb-3 pl-4 border-l border-border"
                    >
                      {clean}
                    </p>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── 8. Prev / Next ─── */}
      <section className="px-8 md:px-20 py-20 border-t border-border">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          {prev ? (
            <Link
              href={`/portfolio/${prev.slug}`}
              className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <div>
                <p className="text-xs uppercase tracking-[1.5px] text-muted-foreground mb-1">
                  {t("prev_case")}
                </p>
                <p className="text-lg">{prev.title[locale]}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/portfolio/${next.slug}`}
              className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-right"
            >
              <div>
                <p className="text-xs uppercase tracking-[1.5px] text-muted-foreground mb-1">
                  {t("next_case")}
                </p>
                <p className="text-lg">{next.title[locale]}</p>
              </div>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      {/* ─── 9. Footer ─── */}
      <footer className="bg-primary-foreground text-primary px-8 md:px-20 py-16 rounded-t-[40px]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div>
              <p className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-none mb-6">
                G.S.
              </p>
              <div className="flex gap-6 text-sm text-primary/60">
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
                <Link
                  href="/portfolio"
                  className="hover:text-primary transition-colors"
                >
                  Portfolio
                </Link>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  {locale === "pt" ? "Sobre" : "About"}
                </Link>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  {locale === "pt" ? "Contato" : "Contact"}
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4">
              <a
                href="#case-top"
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors"
              >
                <ArrowUp size={16} className="text-primary-foreground" />
              </a>
              <p className="text-sm text-primary/40">
                &copy; G.S. &middot; 2026
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
