"use client";

import { useGlowCard } from "../effects/useGlowCard";
import type { ExperienceEntry } from "@/data/resume";

interface ExpCardProps {
  entry: ExperienceEntry;
}

export default function ExpCard({ entry }: ExpCardProps) {
  const ref = useGlowCard<HTMLDivElement>();

  return (
    <div ref={ref} className={`exp-card glow-card${entry.current && entry.badgeLabel === "Current" ? " featured" : ""}`}>
      <div className="inner">
        <div>
          <div className="time">{entry.time}</div>
        </div>
        <div>
          <div className="job-title">
            {entry.title}
            {entry.badgeLabel && <span className="badge-current">{entry.badgeLabel}</span>}
          </div>
          <div className="company">{entry.company}</div>
        </div>
      </div>
    </div>
  );
}
