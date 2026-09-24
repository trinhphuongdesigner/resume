import SectionHeader from "../ui/SectionHeader";
import TimelineLine from "../ui/TimelineLine";
import TimelineDot from "../ui/TimelineDot";
import CompanyEntry from "../ui/CompanyEntry";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { getMergedTimeline } from "@/data/resume";

const bgPalette = ["bg-[#EEF5FA]", "bg-[#F2F4FF]", "bg-[#FCF9F2]", "bg-[#FFF4F4]", "bg-[#FFF1FB]"];

const timeline = getMergedTimeline().map((entry, idx) => ({
  ...entry,
  time: entry.time.replace(/\s—\s/g, " - "),
  projects: entry.projects.map((project) => ({
    ...project,
    time: project.time.replace(/\s—\s/g, " - "),
  })),
  bg: bgPalette[idx % bgPalette.length],
}));

export default function ExperienceSection() {
  return (
    <div className="p-4 sm:p-6 md:p-8" id="experience">
      <SectionHeader icon={faBriefcase} title="Experience" />

      <div className="relative">
        <TimelineLine direction="vertical" position="left" />
        {timeline.map((entry) => (
          <div key={entry.id} className="relative mb-6 sm:mb-8 last:mb-0">
            <TimelineDot position="left" className="top-1" />
            <div className="ml-9 sm:ml-10">
              <CompanyEntry entry={entry} bg={entry.bg} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
