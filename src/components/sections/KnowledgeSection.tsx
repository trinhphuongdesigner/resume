import KnowledgeTag from "../ui/KnowledgeTag";
import SectionHeader from "../ui/SectionHeader";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { knowledge as knowledgeGroups } from "@/data/resume";

const knowledge = knowledgeGroups.flatMap((group) => group.items);

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
