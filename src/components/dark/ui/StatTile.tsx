"use client";

import { useGlowCard } from "../effects/useGlowCard";

interface StatTileProps {
  years: string;
  label: string;
}

export default function StatTile({ years, label }: StatTileProps) {
  const ref = useGlowCard<HTMLDivElement>();

  return (
    <div ref={ref} className="stat glow-card">
      <span className="dash" />
      <div className="num">{years}</div>
      <div className="lbl">{label}</div>
    </div>
  );
}
