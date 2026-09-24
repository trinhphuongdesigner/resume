import SectionHead from "../ui/SectionHead";
import KnowledgeTag from "../ui/KnowledgeTag";
import { knowledge } from "@/data/resume";

export default function KnowledgeSection() {
  return (
    <section className="section" id="knowledge">
      <SectionHead num="03." title="Knowledge" />
      <div className="know-groups">
        {knowledge.map((group) => (
          <div key={group.id} className="know-group">
            <h4>{group.label}</h4>
            <div className="tags">
              {group.items.map((item) => (
                <KnowledgeTag key={item} label={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
