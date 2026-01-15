import KnowledgeTag from "../ui/KnowledgeTag";
import SectionHeader from "../ui/SectionHeader";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

const knowledge = [
  "HTML", "CSS", "JavaScript", "ReactJS", "NextJS", "NodeJS", "Express",
  "MongoDB", "Mongoose", "PhotoShop", "Graphic Design", "Photography",
  "UI/UX Design", "Figma", "AI Prompt", "Midjourney",
  "Embroidery Software", "Wilcom", "Time Management", "Flexibility"
];

export default function KnowledgeSection() {
  return (
    <div className="p-4 sm:p-6 md:p-8" id="knowledge">
      <SectionHeader icon={faLightbulb} title="Knowledge" />
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {knowledge.map((tag, idx) => (
          <KnowledgeTag key={idx} label={tag} />
        ))}
      </div>
    </div>
  );
}
