import SectionHead from "../ui/SectionHead";
import EduCard from "../ui/EduCard";
import { education } from "@/data/resume";

export default function EducationSection() {
  return (
    <section className="section" id="education">
      <SectionHead num="03." title="Education" />
      <div className="edu-grid">
        {education.map((entry) => (
          <EduCard key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}
