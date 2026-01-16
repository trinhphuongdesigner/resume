import SectionHeader from "../ui/SectionHeader";
import TimelineCard from "../ui/TimelineCard";
import TimelineLine from "../ui/TimelineLine";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

const education = [
  { time: "08.2015 - 06.2019", title: "Management Information System", location: "The University of Danang - University of Economics", bg: "bg-[#FFF4F4]" },
  { time: "11.2017 - 01.2018", title: "MCSA certificate", location: "DNICT Danang", bg: "bg-[#EEF5FA]" },
  { time: "04.2021 - 05.2021", title: "NodeJS", location: "JavaScript & Node Express in Wiicamp", bg: "bg-[#FCF4FF]" },
];

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
