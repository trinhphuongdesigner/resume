"use client";

import { useState } from "react";
import ProjRow from "./ProjRow";
import type { CompanyGroup } from "@/data/resume";

interface CompanyClusterProps {
  group: CompanyGroup;
}

export default function CompanyCluster({ group }: CompanyClusterProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = typeof group.visibleCount === "number" && group.visibleCount < group.projects.length;
  const visible = hasMore ? group.projects.slice(0, group.visibleCount) : group.projects;
  const hidden = hasMore ? group.projects.slice(group.visibleCount) : [];

  return (
    <div className="company-cluster" data-expanded={expanded}>
      <div className="company-header">
        <h3>{group.company}</h3>
        <span className="count">
          {group.projects.length} project{group.projects.length !== 1 ? "s" : ""}
        </span>
      </div>

      {visible.map((project) => (
        <ProjRow key={project.id} project={project} />
      ))}

      {hasMore && (
        <>
          {expanded && (
            <div className="extra-projects" style={{ display: "block" }}>
              {hidden.map((project) => (
                <ProjRow key={project.id} project={project} />
              ))}
            </div>
          )}
          <div className="more-toggle" onClick={() => setExpanded((v) => !v)}>
            <span className="chev">▾</span>
            <span className="toggle-label">
              {expanded ? "Show less" : `Show ${hidden.length} more projects`}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
