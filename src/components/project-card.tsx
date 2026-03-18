"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  const locale = useLocale() as "pt" | "en";
  const t = useTranslations("home");

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-xl bg-muted aspect-[16/10] mb-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
          <span className="text-4xl font-bold text-primary/20">
            {project.title[locale].charAt(0)}
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div>
        <h3 className="text-lg font-semibold group-hover:text-primary/80 transition-colors">
          {project.title[locale]}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.description[locale]}
        </p>
        <div className="flex items-center gap-1 text-sm font-medium text-primary/70 group-hover:text-primary transition-colors pt-1">
          {t("view_case")}
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
