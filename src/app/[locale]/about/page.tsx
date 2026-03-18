import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Palette,
  Bot,
  Hammer,
  GraduationCap,
  Award,
} from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("about");

  const pillars = [
    { icon: Palette, title: t("pillar_design"), desc: t("pillar_design_desc"), pct: "35%" },
    { icon: Search, title: t("pillar_research"), desc: t("pillar_research_desc"), pct: "25%" },
    { icon: Bot, title: t("pillar_ai"), desc: t("pillar_ai_desc"), pct: "25%" },
    { icon: Hammer, title: t("pillar_building"), desc: t("pillar_building_desc"), pct: "15%" },
  ];

  const skills = [
    { title: t("skills_research"), tools: t("skills_research_tools") },
    { title: t("skills_design"), tools: t("skills_design_tools") },
    { title: t("skills_dev"), tools: t("skills_dev_tools") },
    { title: t("skills_collab"), tools: t("skills_collab_tools") },
  ];

  const certs = [t("cert_ai"), t("cert_psych"), t("cert_gama")];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Bio */}
        <section className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
            {t("title")}
          </h1>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
            <p>{t("bio_1")}</p>
            <p>{t("bio_2")}</p>
            <p>{t("bio_3")}</p>
          </div>
        </section>

        <Separator className="mb-16" />

        {/* Pillars */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-8">
            {t("pillars_title")}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {pillars.map(({ icon: Icon, title, desc, pct }) => (
              <div key={title} className="p-6 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Icon size={20} className="text-muted-foreground" />
                  <h3 className="font-semibold">{title}</h3>
                  <span className="ml-auto text-xs text-muted-foreground font-mono">
                    {pct}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator className="mb-16" />

        {/* Skills */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-8">
            {t("skills_title")}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {skills.map(({ title, tools }) => (
              <div key={title} className="space-y-2">
                <h3 className="font-semibold text-sm">{title}</h3>
                <p className="text-sm text-muted-foreground">{tools}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator className="mb-16" />

        {/* Education & Certs */}
        <section className="grid sm:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap size={18} className="text-muted-foreground" />
              <h2 className="text-xl font-bold tracking-tight">
                {t("education_title")}
              </h2>
            </div>
            <p className="font-medium">{t("education_ufmg")}</p>
            <p className="text-sm text-muted-foreground">{t("education_period")}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award size={18} className="text-muted-foreground" />
              <h2 className="text-xl font-bold tracking-tight">
                {t("certs_title")}
              </h2>
            </div>
            <ul className="space-y-2">
              {certs.map((cert) => (
                <li key={cert} className="text-sm text-muted-foreground">
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
