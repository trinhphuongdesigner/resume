"use client";

import { personal, contact } from "@/data/resume";

// Drawn as SVG rather than the "→" character: JetBrains Mono's latin
// subset has no U+2192 glyph, so the PDF fell back to a system font that
// iOS Quick Look rendered blank.
function ArrowLabel() {
  return (
    <svg className="label" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M1 6h9M6.5 2.5 10 6l-3.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
              {/* A real <img>, not a CSS background-image: Chromium writes
                  backgrounds into the PDF as tiling patterns, which iOS
                  Quick Look/PDFKit scales wrongly (shows a zoomed-in crop). */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="avatar" src={personal.avatarSrc} alt={personal.name} />
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
                <ArrowLabel /> <span className="value">{contact.phone}</span>
              </div>
              <div className="row">
                <ArrowLabel /> <span className="value">{contact.email}</span>
              </div>
              <div className="row">
                <ArrowLabel /> <span className="value">{contact.location}</span>
              </div>
              <div className="row">
                <ArrowLabel /> <span className="value">{contact.birthday}</span>
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
              <ArrowLabel /> {contact.phone}
            </div>
            <div className="row">
              <ArrowLabel /> {contact.email}
            </div>
            <div className="row">
              <ArrowLabel /> {contact.location}
            </div>
            <div className="row">
              <ArrowLabel /> {contact.birthday}
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
