"use client";

import { useState, useCallback } from "react";
import DarkSidebar from "./DarkSidebar";
import DarkNav from "./DarkNav";
import CursorGlow from "./effects/CursorGlow";
import ClickRipple from "./effects/ClickRipple";
import HeroSection from "./sections/HeroSection";
import ExperienceSection from "./sections/ExperienceSection";
import KnowledgeSection from "./sections/KnowledgeSection";
import EducationSection from "./sections/EducationSection";
import { footerNote, getResumeFilename } from "@/data/resume";

export default function DarkHome() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = useCallback(async () => {
    if (isGeneratingPDF) return;
    setIsGeneratingPDF(true);
    try {
      const response = await fetch("/api/generate-pdf?theme=dark");
      if (!response.ok) {
        throw new Error(`PDF generation failed with status ${response.status}`);
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = getResumeFilename();
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  }, [isGeneratingPDF]);

  return (
    <div className="dark-root">
      <CursorGlow />
      <ClickRipple />
      <DarkNav />
      <div className="layout">
        <DarkSidebar onDownloadPDF={handleDownloadPDF} isGeneratingPDF={isGeneratingPDF} />
        <main className="main">
          <HeroSection />
          <ExperienceSection />
          <KnowledgeSection />
          <EducationSection />
          <p className="footer-note">{footerNote}</p>
        </main>
      </div>
    </div>
  );
}
