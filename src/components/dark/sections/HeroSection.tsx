import StatTile from "../ui/StatTile";
import { personal, statBadges } from "@/data/resume";

export default function HeroSection() {
  return (
    <section className="hero" id="about">
      <div className="hero-kicker">
        <span className="pulse" /> Available for opportunities
      </div>
      <h1>
        Building <span className="grad">fast, scalable</span> frontend experiences since 2019
      </h1>
      <p>{personal.summary}</p>

      <div className="stat-strip">
        {statBadges.map((badge) => (
          <StatTile key={badge.label} years={badge.years} label={badge.label} />
        ))}
      </div>
    </section>
  );
}
