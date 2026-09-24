import SectionHead from "../ui/SectionHead";
import CompanyCluster from "../ui/CompanyCluster";
import { workHistory } from "@/data/resume";

export default function WorkHistorySection() {
  return (
    <section className="section" id="history">
      <SectionHead num="02." title="Work History" />
      <div className="timeline">
        {workHistory.map((group) => (
          <CompanyCluster key={group.id} group={group} />
        ))}
      </div>
    </section>
  );
}
