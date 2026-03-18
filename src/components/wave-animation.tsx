"use client";

import { useEffect, useRef } from "react";

const LINE_COUNT = 40;
const POINTS_PER_LINE = 120;

export function WaveAnimation() {
  const svgRef = useRef<SVGSVGElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const ns = "http://www.w3.org/2000/svg";
    const paths: SVGPathElement[] = [];

    for (let i = 0; i < LINE_COUNT; i++) {
      const path = document.createElementNS(ns, "path");
      path.setAttribute("fill", "none");
      const fg = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim();
      path.setAttribute("stroke", `oklch(${fg} / 0.12)`);
      path.setAttribute("stroke-width", "0.8");
      svg.appendChild(path);
      paths.push(path);
    }

    const W = 1400;
    const H = 800;
    let time = 0;

    function animate() {
      time += 0.004;

      for (let i = 0; i < LINE_COUNT; i++) {
        const lineOffset = i / LINE_COUNT;
        const baseY = H * 0.15 + H * 0.7 * lineOffset;
        let d = "";

        for (let j = 0; j <= POINTS_PER_LINE; j++) {
          const t = j / POINTS_PER_LINE;
          const x = t * W;

          // Two hills with a valley — silk ribbon shape
          const hill1 = Math.sin(t * Math.PI * 2) * 0.5 + 0.5;
          const hill2 = Math.sin(t * Math.PI * 2 - 1.8) * 0.5 + 0.5;
          const envelope = hill1 * 0.6 + hill2 * 0.4;

          // Layered wave motion
          const wave1 = Math.sin(t * 6 + time * 1.2 + lineOffset * 2) * 30;
          const wave2 = Math.sin(t * 4 - time * 0.8 + lineOffset * 3) * 20;
          const wave3 = Math.sin(t * 8 + time * 0.5 + lineOffset * 1.5) * 10;

          const y = baseY + (wave1 + wave2 + wave3) * envelope;

          d += j === 0
            ? `M ${x.toFixed(1)} ${y.toFixed(1)}`
            : ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
        }

        paths[i].setAttribute("d", d);
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      paths.forEach((p) => p.remove());
    };
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none md:opacity-100 opacity-40"
      style={{
        filter: "brightness(0.6) contrast(2) invert(0.2)",
        mixBlendMode: "luminosity",
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1400 800"
        preserveAspectRatio="xMidYMid slice"
        className="absolute md:top-[240px] md:-left-[25%] md:w-[130%] md:h-[65%] top-[40%] left-0 w-full h-[50%]"
      />
    </div>
  );
}
