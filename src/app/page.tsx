"use client";

import { useRef, useState, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import MainContent from "@/components/MainContent";

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = useCallback(async () => {
    if (!contentRef.current || isGeneratingPDF) return;

    setIsGeneratingPDF(true);

    try {
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;

      const element = contentRef.current;
      
      // Hide navbar and scroll button during capture
      const navbar = document.querySelector('[class*="xl:hidden fixed"]') as HTMLElement;
      const scrollBtn = document.querySelector('[class*="fixed bottom-6"]') as HTMLElement;
      const desktopNavbar = document.querySelector('[class*="xl:flex items-center absolute"]') as HTMLElement;
      if (navbar) navbar.style.display = 'none';
      if (scrollBtn) scrollBtn.style.display = 'none';
      if (desktopNavbar) desktopNavbar.style.display = 'none';

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
            (clonedElement as HTMLElement).style.marginTop = '60px';
            (clonedElement as HTMLElement).style.marginBottom = '60px';
          }
          
          // Hide desktop timeline layouts
          const experienceDesktop = clonedDoc.querySelector('.experience-timeline-desktop') as HTMLElement;
          const workhistoryDesktop = clonedDoc.querySelector('.workhistory-timeline-desktop') as HTMLElement;
          if (experienceDesktop) experienceDesktop.style.display = 'none';
          if (workhistoryDesktop) workhistoryDesktop.style.display = 'none';
          
          // Show mobile layouts (simple list without timeline)
          const experienceMobile = clonedDoc.querySelector('.experience-mobile') as HTMLElement;
          const workhistoryMobile = clonedDoc.querySelector('.workhistory-mobile') as HTMLElement;
          if (experienceMobile) experienceMobile.style.display = 'flex';
          if (workhistoryMobile) workhistoryMobile.style.display = 'flex';
        }
      });

      // Restore navbar and scroll button
      if (navbar) navbar.style.display = '';
      if (scrollBtn) scrollBtn.style.display = '';
      if (desktopNavbar) desktopNavbar.style.display = '';

      const imgData = canvas.toDataURL("image/png");
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

      // Custom header/footer for each page
      const addHeaderFooter = (pageNum: number, totalPages: number) => {
        // Header - right aligned
        pdf.setFontSize(10);
        pdf.setTextColor(68, 86, 108);
        pdf.text("Mr. Trinh Phuong - Full-stack Developer", 200, 8, { align: "right" });
        
        // Footer - right aligned with last updated
        pdf.text("Last updated at 15/1/2026", 200, 290, { align: "right" });
      };

      let heightLeft = imgHeight;
      let position = marginTop;
      let pageNum = 1;
      const totalPages = Math.ceil(imgHeight / contentHeight);

      // First page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      addHeaderFooter(pageNum, totalPages);
      heightLeft -= contentHeight;

      while (heightLeft > 0) {
        position = marginTop - (pageNum * contentHeight);
        pdf.addPage();
        pageNum++;
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        addHeaderFooter(pageNum, totalPages);
        heightLeft -= contentHeight;
      }

      pdf.save("Trinh_Phuong_Resume.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Fallback: open print dialog
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
