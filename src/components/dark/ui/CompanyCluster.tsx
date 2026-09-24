"use client";

import { useState } from "react";
import ProjRow from "./ProjRow";
import type { MergedTimelineEntry } from "@/data/resume";

interface CompanyClusterProps {
  entry: MergedTimelineEntry;
}

export default function CompanyCluster({ entry }: CompanyClusterProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = typeof entry.visibleCount === "number" && entry.visibleCount < entry.projects.length;
  const visible = hasMore ? entry.projects.slice(0, entry.visibleCount) : entry.projects;
  const hidden = hasMore ? entry.projects.slice(entry.visibleCount) : [];

  return (
    <div className="company-cluster" data-expanded={expanded}>
      <div className="company-header">
        <div className="header-main">
          <div className="cluster-time">{entry.time}</div>
          <h3>
            {entry.title}
            {entry.badgeLabel && <span className="badge-current">{entry.badgeLabel}</span>}
          </h3>
          {entry.companyUrl ? (
            <a className="co-link" href={entry.companyUrl} target="_blank" rel="noopener noreferrer">
              {entry.company}
            </a>
          ) : (
            <span className="co-link">{entry.company}</span>
          )}
        </div>
        {entry.projects.length > 0 && (
          <span className="count">
            {entry.projects.length} project{entry.projects.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {visible.map((project) => (
        <ProjRow key={project.id} project={project} />
      ))}

      {hasMore && (
        <>
          {/* Kept in the DOM (not conditionally rendered) so the
              server-side print/PDF route — which has no JS to click
              "show more" — always renders every project via the
              `print` override in dark-theme.css. */}
          <div className="extra-projects" style={{ display: expanded ? "block" : "none" }}>
            {hidden.map((project) => (
              <ProjRow key={project.id} project={project} />
            ))}
          </div>
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
