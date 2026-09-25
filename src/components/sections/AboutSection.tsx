import SectionHeader from "../ui/SectionHeader";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { personal, statBadges } from "@/data/resume";

const badgeColors = [
  "bg-[#FFF4F4] text-[#FA5252]",
  "bg-[#F2F4FF] text-[#6366F1]",
  "bg-[#FCF9F2] text-[#F59E0B]",
  "bg-[#EEF5FA] text-[#0EA5E9]",
];

const experienceBadges = statBadges.map((badge, idx) => ({
  years: badge.years,
  label: badge.label.replace(/^Yrs?\s*/i, "").replace(/^Yr\s*/i, ""),
  color: badgeColors[idx % badgeColors.length],
}));

export default function AboutSection() {
  return (
    <div className="bg-[#F8FBFB] rounded-t-[20px]" id="about">
      <div className="p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
          <p className="font-[var(--font-roboto-slab)] font-bold text-xl sm:text-2xl md:text-[2rem] leading-tight mr-0 sm:mr-6 mb-2 sm:mb-0">
            Resume
          </p>
          <div className="w-[100px] sm:w-[120px] md:w-[150px] h-[3px] rounded bg-gradient-to-r from-[#FA5252] to-[#DD2476]" />
        </div>

        <SectionHeader icon={faUser} title="About" />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start">
          {/* Introduction */}
          <div className="text-[#44566C] text-xs sm:text-sm leading-6 sm:leading-7">
            <p>{personal.summary}</p>
          </div>

          {/* Experience badges */}
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {experienceBadges.map((badge, idx) => (
              <div 
                key={idx} 
                className={`${badge.color} px-3 py-2 rounded-lg text-center`}
              >
                <p className="font-bold text-base sm:text-lg leading-tight">{badge.years}</p>
                <p className="text-[10px] sm:text-xs opacity-80">{badge.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
