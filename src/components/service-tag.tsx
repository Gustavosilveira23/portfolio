"use client";

import { useState, useRef } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { projects } from "@/content/projects";
import { tagProjectMap } from "@/content/tag-project-map";

interface ServiceTagProps {
  tag: string;
  isDragging: boolean;
}

export function ServiceTag({ tag, isDragging }: ServiceTagProps) {
  const locale = useLocale() as "pt" | "en";
  const [isHovered, setIsHovered] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  const slug = tagProjectMap[tag];
  const project = slug ? projects.find((p) => p.slug === slug) : null;

  // Tag without linked project — plain span
  if (!project) {
    return (
      <span className="px-2.5 py-1 text-[11px] rounded-full border border-border text-muted-foreground">
        {tag}
      </span>
    );
  }

  return (
    <span
      className="relative pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/portfolio/${project.slug}`}
        onClick={(e) => {
          if (isDragging) e.preventDefault();
        }}
        onMouseDown={(e) => {
          dragStartRef.current = { x: e.clientX, y: e.clientY };
        }}
        onMouseUp={(e) => {
          if (dragStartRef.current) {
            const dx = Math.abs(e.clientX - dragStartRef.current.x);
            const dy = Math.abs(e.clientY - dragStartRef.current.y);
            if (dx > 5 || dy > 5) e.preventDefault();
          }
        }}
        className="inline-block px-2.5 py-1 text-[11px] rounded-full border border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground transition-colors"
      >
        {tag}
      </Link>

      {/* Popover */}
      <div
        className="absolute bottom-full left-1/2 mb-2 z-50 pointer-events-none w-[200px]"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered
            ? "translateX(-50%) translateY(0)"
            : "translateX(-50%) translateY(4px)",
          transition: "opacity 0.15s ease, transform 0.15s ease",
        }}
      >
        <div className="bg-surface-2 border border-border rounded-lg p-2 shadow-lg">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title[locale]}
              className="w-full h-[100px] object-cover rounded-md mb-2"
            />
          ) : (
            <div className="w-full h-[100px] rounded-md mb-2 bg-surface-3 flex items-center justify-center">
              <span className="text-3xl font-bold text-foreground/10">
                {project.title[locale].charAt(0)}
              </span>
            </div>
          )}
          <p className="text-xs font-medium text-foreground truncate">
            {project.title[locale]}
          </p>
        </div>
        {/* Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-surface-2 border-r border-b border-border rotate-45 -mt-1" />
      </div>
    </span>
  );
}
