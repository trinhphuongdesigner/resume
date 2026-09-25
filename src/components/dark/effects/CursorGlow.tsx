"use client";

import { useEffect } from "react";

/**
 * Full-viewport spotlight that follows the cursor. Writes --mx/--my
 * directly on document.documentElement via style.setProperty (not React
 * state) since this fires on every mousemove and setState here would cause
 * excessive re-renders for a purely visual, non-layout effect.
 */
export default function CursorGlow() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div className="cursor-glow" />;
}
