"use client";

import { useEffect, useState } from "react";

export function Toc({ title, items }: { title: string; items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    // A seção ativa é a que cruza a faixa entre 30% e 40% da altura da tela.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  function go(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <nav aria-label={title}>
      <p className="mb-4 text-xs uppercase tracking-[1.8px] text-muted-foreground">{title}</p>
      <ol className="space-y-1 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => go(e, item.id)}
              aria-current={active === item.id ? "location" : undefined}
              className={`-ml-px block border-l py-1.5 pl-4 text-sm transition-colors ${
                active === item.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
