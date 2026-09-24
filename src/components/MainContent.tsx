import AboutSection from "./sections/AboutSection";
import EducationSection from "./sections/EducationSection";
import ExperienceSection from "./sections/ExperienceSection";
import WorkHistorySection from "./sections/WorkHistorySection";
import KnowledgeSection from "./sections/KnowledgeSection";
import { footerNote } from "@/data/resume";

export default function MainContent() {
  return (
    <section className="bg-white rounded-[20px] mt-0 xl:mt-[140px]">
      <AboutSection />
      <ExperienceSection />
      <WorkHistorySection />
      <KnowledgeSection />
      <EducationSection />

      <p className="py-3 sm:py-4 text-center text-[#44566C] text-[10px] sm:text-xs md:text-sm leading-5 sm:leading-6">
        {footerNote}
      </p>
    </section>
  );
}
