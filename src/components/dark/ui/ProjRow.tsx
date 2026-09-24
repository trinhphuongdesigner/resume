"use client";

import { useGlowCard } from "../effects/useGlowCard";
import type { Project } from "@/data/resume";

interface ProjRowProps {
  project: Project;
}

export default function ProjRow({ project }: ProjRowProps) {
  const ref = useGlowCard<HTMLDivElement>();

  return (
    <div ref={ref} className="proj-row glow-card">
      <div>
        <div className="time">{project.time}</div>
      </div>
      <div>
        <div className="name">{project.name}</div>
        <div className="proj-fields">
          <div className="proj-field">
            <span className="f-label">Position</span>
            <span className="f-value highlight">{project.position}</span>
          </div>
          <div className="proj-field">
            <span className="f-label">Description</span>
            <span className="f-value">{project.description}</span>
          </div>
          <div className="proj-field">
            <span className="f-label">Team size</span>
            <span className="f-value">{project.teamSize}</span>
          </div>
        </div>
        <div className="stack">
          {project.tech.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
