import SectionHead from "../ui/SectionHead";
import CompanyCluster from "../ui/CompanyCluster";
import { getMergedTimeline } from "@/data/resume";

const timeline = getMergedTimeline();

export default function ExperienceSection() {
  return (
    <section className="section" id="experience">
      <SectionHead num="01." title="Experience" />
      <div className="timeline">
        {timeline.map((entry) => (
          <CompanyCluster key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}
