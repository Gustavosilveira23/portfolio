"use client";

import { useEffect, useState } from "react";

export function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY < 50);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
        visible ? "opacity-60" : "opacity-0"
      }`}
    >
      <svg
        width="24"
        height="38"
        viewBox="0 0 24 38"
        fill="none"
        className="text-foreground"
      >
        <rect
          x="1"
          y="1"
          width="22"
          height="36"
          rx="11"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="10" r="2.5" fill="currentColor">
          <animate
            attributeName="cy"
            values="10;18;10"
            dur="2s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
          />
          <animate
            attributeName="opacity"
            values="1;0.4;1"
            dur="2s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
          />
        </circle>
      </svg>
    </div>
  );
}
