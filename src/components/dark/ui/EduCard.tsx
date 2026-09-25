import type { EducationEntry } from "@/data/resume";

interface EduCardProps {
  entry: EducationEntry;
}

export default function EduCard({ entry }: EduCardProps) {
  return (
    <div className="edu-card">
      <div className="inner">
        <div className="time">{entry.time}</div>
        <div className="t">{entry.title}</div>
        <div className="s">{entry.location}</div>
      </div>
    </div>
  );
}
