"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Linkedin, Github, Mail } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <form
          action="https://formspree.io/f/placeholder"
          method="POST"
          className="space-y-6 mb-16"
        >
          <div className="space-y-2">
            <Label htmlFor="name">{t("name")}</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{t("message")}</Label>
            <Textarea id="message" name="message" rows={5} required />
          </div>
          <Button type="submit" className="w-full">
            {t("send")}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">{t("or")}</p>
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://www.linkedin.com/in/gustavosilveira23/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
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
      </div>
    </div>
  );
}
