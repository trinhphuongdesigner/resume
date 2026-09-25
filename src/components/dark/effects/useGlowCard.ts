"use client";

import { useEffect, useRef } from "react";

/**
 * Tracks the cursor position relative to the element and writes it as
 * --lx/--ly CSS custom properties, driving the .glow-card local spotlight
 * effect defined in dark-theme.css. Writes directly to the DOM via
 * style.setProperty instead of React state to avoid re-rendering on every
 * mousemove tick.
 */
export function useGlowCard<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--lx", `${x}%`);
      el.style.setProperty("--ly", `${y}%`);
    };

    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return ref;
}
