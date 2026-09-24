"use client";

import { useRef, useState, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import MainContent from "@/components/MainContent";
import { personal, getResumeFilename } from "@/data/resume";

export default function LightHome() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = useCallback(async () => {
    if (!contentRef.current || isGeneratingPDF) return;

    setIsGeneratingPDF(true);

    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const jsPDF = (await import("jspdf")).default;

      const element = contentRef.current;

      // Hide navbar and scroll button during capture
      const navbar = document.querySelector('[class*="xl:hidden fixed"]') as HTMLElement;
      const scrollBtn = document.querySelector('[class*="fixed bottom-6"]') as HTMLElement;
      const desktopNavbar = document.querySelector('[class*="xl:flex items-center absolute"]') as HTMLElement;
      if (navbar) navbar.style.display = "none";
      if (scrollBtn) scrollBtn.style.display = "none";
      if (desktopNavbar) desktopNavbar.style.display = "none";

      // Wait for every image in the capture area to fully decode first.
      // next/image can still be mid-stream on a progressive JPEG (loading a
      // higher-res srcset candidate for the scale: 2 capture) when
      // html2canvas grabs the frame, producing a torn/banded avatar in the
      // exported image.
      const images = Array.from(element.querySelectorAll("img"));
      await Promise.all(
        images.map((img) =>
          img.complete ? img.decode().catch(() => undefined) : new Promise((resolve) => {
            img.addEventListener("load", () => img.decode().catch(() => undefined).then(resolve), { once: true });
            img.addEventListener("error", () => resolve(undefined), { once: true });
          })
        )
      );

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#f0f0f0",
        logging: false,
        windowWidth: 1400,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.body.querySelector('[class*="flex flex-col xl:flex-row"]');
          if (clonedElement) {
            (clonedElement as HTMLElement).style.marginTop = "60px";
            (clonedElement as HTMLElement).style.marginBottom = "60px";
          }

          // Force the outer layout into a single stacked column (Sidebar on
          // top, main content below) for the PDF regardless of the capture
          // viewport width — windowWidth: 1400 would otherwise keep the
          // xl:flex-row 2-column page layout active. The Sidebar itself
          // keeps its own internal md:flex-row split (avatar on the left,
          // name/contact on the right), which is the layout being asked
          // for here — only the *outer* page split needs flattening.
          const styleTag = clonedDoc.createElement("style");
          styleTag.textContent = `
            [class*="flex flex-col xl:flex-row"] { flex-direction: column !important; }
            [class*="xl:w-[420px]"] { width: 100% !important; min-width: 0 !important; }
          `;
          clonedDoc.head.appendChild(styleTag);

          // The Sidebar's avatar/info split only switches to its 2-column
          // md:flex-row layout at the md breakpoint — force those same
          // computed styles directly so the split shows up in the capture
          // even if the clone's rendered width falls outside that range.
          const sidebarEl = clonedDoc.querySelector("section.relative.bg-white") as HTMLElement;
          if (sidebarEl) {
            sidebarEl.style.flexDirection = "row";
            sidebarEl.style.alignItems = "flex-start";
            const avatarImg = sidebarEl.querySelector("img");
            if (avatarImg) {
              const avatarParent = avatarImg.parentElement as HTMLElement;
              avatarImg.style.position = "relative";
              avatarImg.style.top = "0";
              avatarImg.style.left = "0";
              avatarImg.style.transform = "none";
              avatarImg.style.marginRight = "24px";
              if (avatarParent) avatarParent.style.flexShrink = "0";
            }
            const infoBlock = sidebarEl.querySelector(":scope > div:last-child") as HTMLElement;
            if (infoBlock) {
              infoBlock.style.paddingTop = "0";
              infoBlock.style.marginLeft = "0";
              infoBlock.style.textAlign = "left";
              infoBlock.querySelectorAll("[class*='text-center']").forEach((el) => {
                (el as HTMLElement).style.textAlign = "left";
              });
              infoBlock.querySelectorAll("[class*='justify-center']").forEach((el) => {
                (el as HTMLElement).style.justifyContent = "flex-start";
              });
            }
          }

          // Hide desktop timeline layouts
          const experienceDesktop = clonedDoc.querySelector(".experience-timeline-desktop") as HTMLElement;
          const workhistoryDesktop = clonedDoc.querySelector(".workhistory-timeline-desktop") as HTMLElement;
          if (experienceDesktop) experienceDesktop.style.display = "none";
          if (workhistoryDesktop) workhistoryDesktop.style.display = "none";

          // Show mobile layouts (simple list without timeline)
          const experienceMobile = clonedDoc.querySelector(".experience-mobile") as HTMLElement;
          const workhistoryMobile = clonedDoc.querySelector(".workhistory-mobile") as HTMLElement;
          if (experienceMobile) experienceMobile.style.display = "flex";
          if (workhistoryMobile) workhistoryMobile.style.display = "flex";

          // The click that triggered this download flips the button to a
          // spinner + "Generating..." — that's mid-capture UI state, not
          // something that belongs baked into the exported document. Find
          // it by its known class (not the first <button> on the page,
          // which is actually a contact-copy button rendered earlier in
          // the DOM) so the reset reliably hits the right element.
          const downloadBtn = Array.from(clonedDoc.querySelectorAll("button")).find((btn) =>
            btn.textContent?.includes("Download Resume") || btn.textContent?.includes("Generating")
          ) as HTMLButtonElement | undefined;
          if (downloadBtn) {
            const downloadLabel = downloadBtn.querySelector("span");
            if (downloadLabel) downloadLabel.textContent = "Download Resume";
            // The spinner is a separate <svg> only rendered while
            // isGeneratingPDF is true — there's no download-icon markup to
            // swap it for in the clone, so just drop it instead of leaving
            // a frozen spinner baked into the exported document.
            downloadBtn.querySelector("svg")?.remove();
            downloadBtn.disabled = false;
            downloadBtn.style.opacity = "1";
          }
        },
      });

      // Restore navbar and scroll button
      if (navbar) navbar.style.display = "";
      if (scrollBtn) scrollBtn.style.display = "";
      if (desktopNavbar) desktopNavbar.style.display = "";

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
        // Paint opaque bands behind the header/footer text first so the
        // sliced content image (which can bleed a hair into the margin at
        // page boundaries) never shows through and overlaps the text.
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, imgWidth, marginTop, "F");
        pdf.rect(0, pageHeight - marginBottom, imgWidth, marginBottom, "F");

        pdf.setFontSize(10);
        pdf.setTextColor(68, 86, 108);
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
    <div className="max-w-[1240px] mx-auto px-4 md:px-8 lg:px-12 xl:px-8 pb-[60px]">
      <div
        ref={contentRef}
        className="flex flex-col xl:flex-row mt-[100px] md:mt-[60px] xl:mt-[140px] relative gap-6 max-w-[900px] lg:max-w-[1000px] xl:max-w-none mx-auto"
      >
        <Sidebar onDownloadPDF={handleDownloadPDF} isGeneratingPDF={isGeneratingPDF} />
        <div className="relative flex-1 min-w-0">
          <Navbar />
          <MainContent />
        </div>
      </div>
    </div>
  );
}
