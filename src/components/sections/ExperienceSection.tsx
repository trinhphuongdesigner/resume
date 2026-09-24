import SectionHeader from "../ui/SectionHeader";
import TimelineCard from "../ui/TimelineCard";
import TimelineLine from "../ui/TimelineLine";
import TimelineDot from "../ui/TimelineDot";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { experience as experienceData } from "@/data/resume";

const experienceCardBg = ["bg-[#FCF9F2]", "bg-[#FFF4F4]", "bg-[#EEF5FA]"];

// Roles not already summarized in the "Work Timeline" company card (freelance/part-time/short-term)
const experience = experienceData
  .filter((entry) => ["freelancer", "aptech", "teaching-assistant"].includes(entry.id))
  .map((entry, idx) => ({
    time: entry.time.replace(/\s—\s/g, " - "),
    title: entry.title,
    location: entry.company,
    url: entry.companyUrl,
    bg: experienceCardBg[idx % experienceCardBg.length],
  }));

interface WorkHistoryItem {
  time: string;
  company: string;
  title: string;
  url: string;
}

const workHistory: WorkHistoryItem[] = experienceData
  .filter((entry) => ["madison", "avepoint", "fpt", "wiicamp", "orient"].includes(entry.id))
  .map((entry) => ({
    time: entry.time.replace(/\s—\s/g, " - "),
    company: entry.company,
    title: entry.title,
    url: entry.companyUrl ?? "#",
  }));

export default function ExperienceSection() {
  return (
    <div>
      <div className="p-4 sm:p-6 md:p-8" id="experience">
        <SectionHeader icon={faBriefcase} title="Experience" />
        
        {/* Desktop Timeline Layout */}
        <div className="experience-timeline-desktop relative max-w-3xl mx-auto hidden md:block">
          <TimelineLine direction="vertical" position="center" />
          
          {/* Work Timeline card - Left */}
          <div className="relative flex items-start md:justify-start">
            <TimelineDot position="center" className="top-3 sm:top-4" />
            <div className="bg-[#EEF5FA] p-3 sm:p-4 rounded-xl ml-9 sm:ml-10 md:ml-0 md:w-[45%] md:mr-auto">
              <p className="font-medium text-xs sm:text-sm mb-2 sm:mb-3">Work Timeline</p>
              {workHistory.map((item, idx) => (
                <div key={idx} className="mb-2 sm:mb-3 last:mb-0">
                  <p className="text-[#FA5252] text-[10px] sm:text-xs leading-4 sm:leading-5">{item.time}</p>
                  <p className="text-xs sm:text-sm leading-5 sm:leading-6 font-medium">{item.title}</p>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#44566C] text-xs sm:text-sm leading-5 sm:leading-6 hover:text-[#FA5252] cursor-pointer transition-colors"
                  >
                    {item.company}
                  </a>
                  {idx < workHistory.length - 1 && (
                    <div className="w-[min(30%,80px)] h-[1px] bg-gradient-to-r from-[#FA5252] to-[#DD2476] mt-2 opacity-30" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Items - Right (Freelancer, Lecturer, Teaching Assistant) */}
          {experience.map((item, idx) => (
            <div key={idx} className="relative flex items-center mb-4 sm:mb-6 md:justify-end">
              <TimelineDot position="center" />
              <div className="ml-9 sm:ml-10 md:ml-0 md:w-[45%] md:ml-auto">
                <TimelineCard
                  time={item.time}
                  title={item.title}
                  subtitle={item.location}
                  subtitleUrl={item.url}
                  bg={item.bg}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Layout - Simple list without timeline */}
        <div className="experience-mobile md:hidden flex flex-col gap-4">
          <div className="bg-[#EEF5FA] p-3 sm:p-4 rounded-xl">
            <p className="font-medium text-xs sm:text-sm mb-2 sm:mb-3">Work Timeline</p>
            {workHistory.map((item, idx) => (
              <div key={idx} className="mb-2 sm:mb-3 last:mb-0">
                <p className="text-[#FA5252] text-[10px] sm:text-xs leading-4 sm:leading-5">{item.time}</p>
                <p className="text-xs sm:text-sm leading-5 sm:leading-6 font-medium">{item.title}</p>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#44566C] text-xs sm:text-sm leading-5 sm:leading-6 hover:text-[#FA5252] cursor-pointer transition-colors"
                >
                  {item.company}
                </a>
                {idx < workHistory.length - 1 && (
                  <div className="w-[min(30%,80px)] h-[1px] bg-gradient-to-r from-[#FA5252] to-[#DD2476] mt-2 opacity-30" />
                )}
              </div>
            ))}
          </div>
          
          {experience.map((item, idx) => (
            <TimelineCard 
              key={idx} 
              time={item.time} 
              title={item.title} 
              subtitle={item.location} 
              subtitleUrl={item.url}
              bg={item.bg} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
