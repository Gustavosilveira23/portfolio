"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { Menu, X, Linkedin, Github } from "lucide-react";

export function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const isHome = pathname === "/";

  const sections = [
    { id: "services", label: t("services") },
    { id: "portfolio", label: t("portfolio") },
    { id: "about", label: t("about") },
    { id: "contact", label: t("contact") },
  ];

  const locales = [
    { code: "pt" as const, label: "PT" },
    { code: "en" as const, label: "EN" },
  ];

  function switchLocale(next: "pt" | "en") {
    if (next !== locale) {
      router.replace(pathname as any, { locale: next });
    }
  }

  function handleNavClick(id: string) {
    setMobileOpen(false);
    if (isHome) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${id}` as any);
    }
  }

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60);

      if (!isHome) return;

      // Detect active section
      const sectionIds = sections.map((s) => s.id);
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md"
          : "bg-transparent backdrop-blur-none"
      }`}
    >
      <nav className="flex items-start justify-between px-8 pt-6 pb-4 h-[58px]">
        {/* Logo / Name */}
        <Link
          href="/"
          className="text-xs font-normal text-foreground uppercase tracking-[1.8px] no-underline transition-opacity duration-200 hover:opacity-60"
        >
          Gustavo Silveira
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-[22px]">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavClick(section.id)}
              className={`nav-highlight text-xs font-normal uppercase tracking-[1.8px] no-underline transition-opacity duration-200 text-foreground bg-transparent border-none cursor-pointer p-0 ${
                activeSection === section.id ? "active" : ""
              }`}
            >
              {section.label}
            </button>
          ))}

          {/* Separator */}
          <span className="inline-block w-px h-3 bg-foreground/25" />

          {/* Language switcher */}
          <div className="flex items-center gap-1.5">
            {locales.map((loc) => (
              <button
                key={loc.code}
                onClick={() => switchLocale(loc.code)}
                className={`text-xs font-normal tracking-[1.8px] bg-transparent border-none cursor-pointer transition-opacity duration-200 p-0 text-foreground ${
                  locale === loc.code
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>

          {/* Social icons */}
          <span className="inline-block w-px h-3 bg-foreground/25" />
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/gustavosilveira23/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground opacity-50 hover:opacity-100 transition-opacity duration-200"
            >
              <Linkedin size={14} />
            </a>
            <a
              href="https://github.com/Gustavosilveira23"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground opacity-50 hover:opacity-100 transition-opacity duration-200"
            >
              <Github size={14} />
            </a>
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/in/gustavosilveira23/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground opacity-50 hover:opacity-100 transition-opacity duration-200"
            >
              <Linkedin size={14} />
            </a>
            <a
              href="https://github.com/Gustavosilveira23"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground opacity-50 hover:opacity-100 transition-opacity duration-200"
            >
              <Github size={14} />
            </a>
          </div>
          <span className="inline-block w-px h-3 bg-foreground/25" />
          <div className="flex items-center gap-1.5">
            {locales.map((loc) => (
              <button
                key={loc.code}
                onClick={() => switchLocale(loc.code)}
                className={`text-xs font-normal tracking-[1.8px] bg-transparent border-none cursor-pointer transition-opacity duration-200 p-0 text-foreground ${
                  locale === loc.code
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1 text-foreground"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-8 pb-6 bg-background/90 backdrop-blur-md">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavClick(section.id)}
              className={`block w-full text-left py-2.5 text-xs font-normal text-foreground uppercase tracking-[1.8px] no-underline transition-opacity duration-200 hover:opacity-50 bg-transparent border-none cursor-pointer p-0 ${
                activeSection === section.id ? "opacity-100" : "opacity-70"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
