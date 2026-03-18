"use client";

import { useRef, useEffect, useState, useCallback, type ReactNode } from "react";

interface HorizontalScrollProps {
  children: ReactNode;
  header?: ReactNode;
  className?: string;
}

export function HorizontalScroll({ children, header, className = "" }: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(0);
  const [sectionHeight, setSectionHeight] = useState("auto");
  const [isDesktop, setIsDesktop] = useState(false);

  const measure = useCallback(() => {
    const desktop = window.innerWidth >= 1024;
    setIsDesktop(desktop);

    if (desktop && trackRef.current) {
      const totalW = trackRef.current.scrollWidth;
      const viewW = window.innerWidth;
      const ov = Math.max(0, totalW - viewW + 120);
      setOverflow(ov);
      setSectionHeight(`${ov + window.innerHeight}px`);
    } else {
      setOverflow(0);
      setSectionHeight("auto");
    }
  }, []);

  // Measure after mount and on resize
  useEffect(() => {
    // Double rAF to ensure layout is settled
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        measure();
      });
    });

    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, children]);

  // Scroll-driven horizontal translation
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || !isDesktop || overflow <= 0) return;

    function onScroll() {
      const rect = section!.getBoundingClientRect();
      const sectionH = section!.offsetHeight;
      const vh = window.innerHeight;
      const scrollable = sectionH - vh;
      if (scrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      track!.style.transform = `translateX(${-progress * overflow}px)`;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isDesktop, overflow]);

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{ height: sectionHeight }}
    >
      {/* Desktop: sticky container */}
      <div className={`
        px-8 md:px-12
        ${isDesktop
          ? "sticky top-0 h-screen flex flex-col justify-center overflow-hidden"
          : "py-24"
        }
      `}>
        {header}
        <div
          ref={trackRef}
          className={
            isDesktop
              ? "flex gap-8 will-change-transform"
              : "flex flex-col gap-8"
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}
