"use client";

import { useRef, useState, useCallback } from "react";
import DarkSidebar from "./DarkSidebar";
import DarkNav from "./DarkNav";
import CursorGlow from "./effects/CursorGlow";
import ClickRipple from "./effects/ClickRipple";
import HeroSection from "./sections/HeroSection";
import ExperienceSection from "./sections/ExperienceSection";
import WorkHistorySection from "./sections/WorkHistorySection";
import KnowledgeSection from "./sections/KnowledgeSection";
import EducationSection from "./sections/EducationSection";
import { footerNote, personal, getResumeFilename } from "@/data/resume";

export default function DarkHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = useCallback(async () => {
    if (!rootRef.current || isGeneratingPDF) return;

    setIsGeneratingPDF(true);

    try {
      // Expand every collapsed "Show more" company cluster so the capture
      // includes all projects, not just the first couple visible by default.
      const collapsedToggles = Array.from(
        rootRef.current.querySelectorAll('.company-cluster[data-expanded="false"] .more-toggle')
      ) as HTMLElement[];
      collapsedToggles.forEach((el) => el.click());
      if (collapsedToggles.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const html2canvas = (await import("html2canvas-pro")).default;
      const jsPDF = (await import("jspdf")).default;

      const element = rootRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#0A192F",
        logging: false,
        windowWidth: 1400,
        onclone: (clonedDoc) => {
          // Hide interactive-only decorations that don't make sense in a
          // static capture: the dot nav, the theme toggle, the cursor-follow
          // spotlight (its position freezes wherever the mouse last was),
          // and the avatar's glow ring / per-card hover glows — html2canvas
          // renders blurred conic-gradients and fixed-position overlays
          // unreliably, producing stray glow artifacts.
          const dotNav = clonedDoc.querySelector(".dot-nav") as HTMLElement;
          const themeToggle = clonedDoc.querySelector("button[aria-label*='mode']") as HTMLElement;
          const cursorGlow = clonedDoc.querySelector(".cursor-glow") as HTMLElement;
          if (dotNav) dotNav.style.display = "none";
          if (themeToggle) themeToggle.style.display = "none";
          if (cursorGlow) cursorGlow.style.display = "none";

          // The click that triggered this very download spawns a .ripple/
          // .click-ring burst (from useClickBurst) right at the button —
          // html2canvas can snapshot mid-animation, freezing it as a large
          // stray glow blob. It's irrelevant to a static document either way.
          clonedDoc.querySelectorAll(".ripple, .click-ring").forEach((el) => {
            (el as HTMLElement).style.display = "none";
          });


          // background-attachment: fixed only paints correctly relative to
          // the viewport; on an element many times taller than the viewport
          // (the whole page), html2canvas renders it once at the top instead
          // of scrolling with the content, producing a stray glow blob.
          // Switching to `scroll` for the capture makes the gradient paint
          // per-element as intended.
          // .main::after reserves a viewport-tall block of empty space at
          // the bottom of the page so the dot-nav can always scroll the
          // last section to the top of the screen (see DarkNav.tsx). That
          // scroll affordance is meaningless in a static PDF and would just
          // print as a large blank gap — drop it for the capture.
          // The hero's 72px top padding reads as a huge empty gap once the
          // page is squeezed into A4 width — tighten it just for the PDF
          // snapshot without touching the live site's spacing.
          const styleTag = clonedDoc.createElement("style");
          styleTag.textContent = `
            .avatar-wrap::before, .glow-card::before { display: none !important; }
            .dark-root { background-attachment: scroll !important; }
            .main::after { content: none !important; display: none !important; height: 0 !important; }
            .hero { padding-top: 16px !important; }
          `;
          clonedDoc.head.appendChild(styleTag);

          // The click that triggered this download flips the button to
          // "Generating..." — that's mid-capture UI state, not something
          // that belongs baked into the exported document.
          const downloadBtn = clonedDoc.querySelector(".btn-download") as HTMLElement;
          if (downloadBtn) downloadBtn.textContent = "⬇ Download Resume";
        },
      });

      // Re-collapse the clusters we force-expanded, restoring normal UI state.
      collapsedToggles.forEach((el) => el.click());

      const imgData = canvas.toDataURL("image/jpeg", 0.92);
      const imgWidth = 210;
      const pageHeight = 297;
      const marginTop = 15;
      const marginBottom = 15;
      const contentHeight = pageHeight - marginTop - marginBottom;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
      });

      const addHeaderFooter = () => {
        // Paint opaque bands OVER the sliced content image — drawn last, on
        // top, after addImage() for this page — so accumulated rounding
        // error in the per-page slice position (position = marginTop -
        // pageNum * contentHeight, compounding across pages) can never let
        // the image bleed through and overlap the header/footer text.
        pdf.setFillColor(10, 25, 47);
        pdf.rect(0, 0, imgWidth, marginTop, "F");
        pdf.rect(0, pageHeight - marginBottom, imgWidth, marginBottom, "F");

        pdf.setFontSize(10);
        pdf.setTextColor(100, 255, 218);
        pdf.text(`Mr. Trinh Phuong - ${personal.title}`, 200, 8, { align: "right" });
        pdf.text(`Last updated at ${new Date().toLocaleDateString("en-GB")}`, 200, 290, { align: "right" });
      };

      let heightLeft = imgHeight;
      let position = marginTop;
      let pageNum = 1;

      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      addHeaderFooter();
      heightLeft -= contentHeight;

      while (heightLeft > 0) {
        position = marginTop - pageNum * contentHeight;
        pdf.addPage();
        pageNum++;
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        addHeaderFooter();
        heightLeft -= contentHeight;
      }

      pdf.save(getResumeFilename());
    } catch (error) {
      console.error("Error generating PDF:", error);
      window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  }, [isGeneratingPDF]);

  return (
    <div className="dark-root" ref={rootRef}>
      <CursorGlow />
      <ClickRipple />
      <DarkNav />
      <div className="layout">
        <DarkSidebar onDownloadPDF={handleDownloadPDF} isGeneratingPDF={isGeneratingPDF} />
        <main className="main">
          <HeroSection />
          <ExperienceSection />
          <WorkHistorySection />
          <KnowledgeSection />
          <EducationSection />
          <p className="footer-note">{footerNote}</p>
        </main>
      </div>
    </div>
  );
}
