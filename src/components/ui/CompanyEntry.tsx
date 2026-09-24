"use client";

import { useState } from "react";
import type { MergedTimelineEntry } from "@/data/resume";

interface CompanyEntryProject {
  id: string;
  name: string;
  time: string;
  position: string;
  description: string;
  teamSize: number;
  tech: string[];
}

interface CompanyEntryProps {
  entry: Omit<MergedTimelineEntry, "projects"> & { projects: CompanyEntryProject[] };
  bg: string;
}

function ProjectBlock({ project }: { project: CompanyEntryProject }) {
  return (
    <div className="border-b border-black/5 last:border-b-0 pb-3 last:pb-0 print:break-inside-avoid">
      <p className="font-bold text-xs sm:text-sm md:text-base leading-5 sm:leading-6">{project.name}</p>
      <p className="text-[#FA5252] text-xs sm:text-sm leading-4 sm:leading-5 mb-1">{project.time}</p>
      <ul className="text-[#44566C] text-xs sm:text-sm leading-5 sm:leading-6 list-disc pl-4 sm:pl-5 space-y-0.5">
        <li>Position: {project.position}</li>
        <li>Description: {project.description}</li>
        <li>Team size: {project.teamSize}</li>
        <li>Tech: {project.tech.join(" | ")}</li>
      </ul>
    </div>
  );
}

export default function CompanyEntry({ entry, bg }: CompanyEntryProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = typeof entry.visibleCount === "number" && entry.visibleCount < entry.projects.length;
  const visible = hasMore ? entry.projects.slice(0, entry.visibleCount) : entry.projects;
  const hidden = hasMore ? entry.projects.slice(entry.visibleCount) : [];

  return (
    <div className="print:break-inside-avoid">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-2">
        <span className="text-[#FA5252] text-xs sm:text-sm font-medium">{entry.time}</span>
        <span className="text-xs sm:text-sm md:text-base font-bold">{entry.title}</span>
        {entry.badgeLabel && (
          <span className="text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full bg-[#FFF4F4] text-[#FA5252] uppercase tracking-wide">
            {entry.badgeLabel}
          </span>
        )}
        {entry.companyUrl ? (
          <a
            href={entry.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#44566C] text-xs sm:text-sm hover:text-[#FA5252] transition-colors"
          >
            {entry.company}
          </a>
        ) : (
          <span className="text-[#44566C] text-xs sm:text-sm">{entry.company}</span>
        )}
      </div>

      {entry.projects.length > 0 && (
        <div className={`${bg} rounded-xl p-3 sm:p-4 flex flex-col gap-3`}>
          {visible.map((project) => (
            <ProjectBlock key={project.id} project={project} />
          ))}

          {hasMore && (
            <>
              {/* Kept in the DOM (not conditionally rendered) so the
                  server-side print/PDF route — which has no JS to click
                  "show more" — always renders every project via print:flex. */}
              <div className={`${expanded ? "flex" : "hidden"} print:flex flex-col gap-3`}>
                {hidden.map((project) => (
                  <ProjectBlock key={project.id} project={project} />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="self-start text-xs sm:text-sm text-[#44566C] hover:text-[#FA5252] transition-colors font-medium print:hidden"
              >
                {expanded ? "Show less" : `Show ${hidden.length} more projects`}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
