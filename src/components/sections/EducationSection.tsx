import SectionHeader from "../ui/SectionHeader";
import TimelineCard from "../ui/TimelineCard";
import TimelineLine from "../ui/TimelineLine";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { education as educationData } from "@/data/resume";

const educationBg = ["bg-[#FFF4F4]", "bg-[#EEF5FA]", "bg-[#FCF4FF]"];

const education = educationData.map((entry, idx) => ({
  time: entry.time.replace(/\s—\s/g, " - "),
  title: entry.title,
  location: entry.location,
  bg: educationBg[idx % educationBg.length],
}));

export default function EducationSection() {
  return (
    <div className="bg-[#F8FBFB] p-4 sm:p-6 md:p-8" id="education">
      <SectionHeader icon={faGraduationCap} title="Education" />
      
      <div className="relative">
        <TimelineLine direction="horizontal" />
        
        <div className="flex flex-col md:flex-row md:justify-between gap-3 sm:gap-4 md:gap-6">
          {education.map((item, idx) => (
            <div key={idx} className="flex-1 relative">
              {/* Timeline dot */}
              <div className="hidden md:block absolute top-[18px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-[#FA5252] to-[#DD2476] z-10" />
              
              <div className="md:mt-10">
                <TimelineCard
                  time={item.time}
                  title={item.title}
                  subtitle={item.location}
                  bg={item.bg}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
