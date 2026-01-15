import SectionHeader from "../ui/SectionHeader";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const aboutItems = [
  "6+ years working experience as a Front-end developer (ReactJS – NextJS).",
  "1+ years working experience as a back-end developer (NodeJS).",
  "4+ years of experience in graphic design.",
  "Proficient in embroidery software, embroidery design, UI-UX design, and 3D modeling tools.",
  "2+ years of experience teaching and training new employees.",
];

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

        <ul className="text-[#44566C] text-xs sm:text-sm leading-5 sm:leading-6 list-disc pl-4 sm:pl-5 space-y-1">
          {aboutItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
