"use client";

import { useCallback, useEffect, useState } from "react";

export interface Burst {
  id: number;
  x: number;
  y: number;
}

let burstIdCounter = 0;

/**
 * Tracks page-wide click positions to drive the ripple + expanding-ring
 * click effect. Each click adds a burst; callers remove it once its CSS
 * animation finishes (onAnimationEnd), replacing the mockup's manual
 * document.createElement/remove DOM lifecycle with React state.
 */
export function useClickBurst() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      burstIdCounter += 1;
      setBursts((prev) => [...prev, { id: burstIdCounter, x: e.clientX, y: e.clientY }]);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const remove = useCallback((id: number) => {
    setBursts((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return { bursts, remove };
}
