import SectionHead from "../ui/SectionHead";
import ExpCard from "../ui/ExpCard";
import { experience } from "@/data/resume";

export default function ExperienceSection() {
  return (
    <section className="section" id="experience">
      <SectionHead num="01." title="Experience" />
      <div className="exp-grid">
        {experience.map((entry) => (
          <ExpCard key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}
