"use client";

import { useTranslations } from "next-intl";
import { Linkedin, Github, Mail } from "lucide-react";
import { Magnetic } from "./magnetic";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Gustavo Silveira</span>
            {" · "}
            {t("built_with")}
          </div>

          <div className="flex items-center gap-4">
            <Magnetic strength={0.6}>
              <a
                href="https://www.linkedin.com/in/gustavosilveira23/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </Magnetic>
            <Magnetic strength={0.6}>
              <a
                href="https://github.com/Gustavosilveira23"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </Magnetic>
            <Magnetic strength={0.6}>
              <a
                href="mailto:gustavosilveira232@gmail.com"
                className="block text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Gustavo Silveira. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
