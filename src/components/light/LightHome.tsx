"use client";

import { useState, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import MainContent from "@/components/MainContent";
import { getResumeFilename } from "@/data/resume";

export default function LightHome() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = useCallback(async () => {
    if (isGeneratingPDF) return;

    setIsGeneratingPDF(true);

    try {
      const response = await fetch("/api/generate-pdf");
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
    <div className="max-w-[1240px] mx-auto px-4 md:px-8 lg:px-12 xl:px-8 pb-[60px] print:max-w-full print:px-0 print:pb-0">
      <div
        className="flex flex-col xl:flex-row mt-[100px] md:mt-[60px] xl:mt-[140px] relative gap-6 max-w-[900px] lg:max-w-[1000px] xl:max-w-none mx-auto print:flex-col print:mt-0 print:gap-0 print:max-w-full"
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
