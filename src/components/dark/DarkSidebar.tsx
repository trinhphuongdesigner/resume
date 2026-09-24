"use client";

import { useGlowCard } from "./effects/useGlowCard";
import { personal, contact } from "@/data/resume";

interface DarkSidebarProps {
  onDownloadPDF: () => void;
  isGeneratingPDF: boolean;
}

export default function DarkSidebar({ onDownloadPDF, isGeneratingPDF }: DarkSidebarProps) {
  const ref = useGlowCard<HTMLElement>();

  return (
    <aside ref={ref} className="sidebar glow-card">
      <div className="sidebar-scroll">
        <div>
          <div className="avatar-wrap">
            <div
              className="avatar"
              style={{ backgroundImage: `url(${personal.avatarSrc})` }}
            />
          </div>
          <div className="name">{personal.name}</div>
          <div className="title">{personal.title}</div>
          <p className="desc">{personal.summary}</p>
        </div>

        <div>
          <div className="contact-block">
            <div className="row">
              <span className="label">→</span> {contact.phone}
            </div>
            <div className="row">
              <span className="label">→</span> {contact.email}
            </div>
            <div className="row">
              <span className="label">→</span> {contact.location}
            </div>
            <div className="row">
              <span className="label">→</span> {contact.birthday}
            </div>
          </div>
          <button className="btn-download" onClick={onDownloadPDF} disabled={isGeneratingPDF}>
            {isGeneratingPDF ? "Generating..." : "⬇ Download Resume"}
          </button>
        </div>
      </div>
    </aside>
  );
}
