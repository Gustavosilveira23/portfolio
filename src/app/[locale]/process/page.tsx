import { useTranslations } from "next-intl";
import { Search, Target, Palette, Users, Code } from "lucide-react";

export default function ProcessPage() {
  const t = useTranslations("process");

  const steps = [
    { icon: Search, title: t("step1_title"), desc: t("step1_desc"), num: "01" },
    { icon: Target, title: t("step2_title"), desc: t("step2_desc"), num: "02" },
    { icon: Palette, title: t("step3_title"), desc: t("step3_desc"), num: "03" },
    { icon: Users, title: t("step4_title"), desc: t("step4_desc"), num: "04" },
    { icon: Code, title: t("step5_title"), desc: t("step5_desc"), num: "05" },
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            {t("subtitle")}
          </p>
        </div>

        <div className="space-y-1">
          {steps.map(({ icon: Icon, title, desc, num }, i) => (
            <div key={num} className="relative flex gap-6 pb-12">
              {/* Line */}
              {i < steps.length - 1 && (
                <div className="absolute left-[23px] top-12 bottom-0 w-px bg-border" />
              )}

              {/* Icon */}
              <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full border border-border bg-background flex items-center justify-center">
                <Icon size={20} className="text-muted-foreground" />
              </div>

              {/* Content */}
              <div className="pt-1.5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-muted-foreground">{num}</span>
                  <h3 className="text-lg font-semibold">{title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
