"use client";

import { personal, contact } from "@/data/resume";

interface DarkSidebarProps {
  onDownloadPDF: () => void;
  isGeneratingPDF: boolean;
}

export default function DarkSidebar({ onDownloadPDF, isGeneratingPDF }: DarkSidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-scroll">
        <div className="identity">
          <div className="identity-photo">
            <div className="avatar-wrap">
              <div
                className="avatar"
                style={{ backgroundImage: `url(${personal.avatarSrc})` }}
              />
            </div>
            {/* display:contents on identity-photo/identity-info flattens this
                into plain document flow on screen, where it's hidden and the
                .sidebar-cta copy below is shown instead (kept anchored with
                the download button there). Print needs the photo and contact
                info together in the same column, which the two different DOM
                parents can't do via display:contents alone, so print shows
                this copy next to the photo and hides the .sidebar-cta one. */}
            <div className="contact-block contact-block-print">
              <div className="row">
                <span className="label">→</span> <span className="value">{contact.phone}</span>
              </div>
              <div className="row">
                <span className="label">→</span> <span className="value">{contact.email}</span>
              </div>
              <div className="row">
                <span className="label">→</span> <span className="value">{contact.location}</span>
              </div>
              <div className="row">
                <span className="label">→</span> <span className="value">{contact.birthday}</span>
              </div>
            </div>
          </div>
          <div className="identity-info">
            <div className="name">{personal.name}</div>
            <div className="title">{personal.title}</div>
          </div>
        </div>

        <div className="sidebar-cta">
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
