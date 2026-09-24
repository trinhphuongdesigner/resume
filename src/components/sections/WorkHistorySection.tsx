import SectionHeader from "../ui/SectionHeader";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { workHistory as workHistoryData } from "@/data/resume";

interface Project {
  name: string;
  time: string;
  company: string;
  companyUrl: string;
  position: string;
  description: string;
  teamSize: number;
  tech: string;
  bg: string;
}

const bgPalette = [
  "bg-[#EEF5FA]",
  "bg-[#F2F4FF]",
  "bg-[#FCF9F2]",
  "bg-[#FFF4F4]",
  "bg-[#FFF1FB]",
];

const projects: Project[] = workHistoryData.flatMap((group) =>
  group.projects.map((project, idx) => ({
    name: project.name,
    time: project.time.replace(/\s—\s/g, " - "),
    company: group.company,
    companyUrl: group.companyUrl,
    position: project.position,
    description: project.description,
    teamSize: project.teamSize,
    tech: project.tech.join(" | "),
    bg: bgPalette[idx % bgPalette.length],
  }))
);

interface ProjectCardProps {
  project: Project;
}

function ProjectCardSimple({ project }: ProjectCardProps) {
  return (
    <div className={`${project.bg} p-3 sm:p-4 rounded-xl`}>
      <p className="font-bold text-xs sm:text-sm md:text-base leading-5 sm:leading-6">{project.name}</p>
      <p className="text-[#FA5252] text-xs sm:text-sm leading-4 sm:leading-5 mb-2">
        {project.time} - <a 
          href={project.companyUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:underline cursor-pointer"
        >
          {project.company}
        </a>
      </p>
      <ul className="text-[#44566C] text-xs sm:text-sm leading-5 sm:leading-6 list-disc pl-4 sm:pl-5 space-y-0.5">
        <li>Position: {project.position}</li>
        <li>Description: {project.description}</li>
        <li>Team size: {project.teamSize}</li>
        <li>Tech: {project.tech}</li>
      </ul>
    </div>
  );
}

function ProjectCardDesktop({ project }: ProjectCardProps) {
  return (
    <div className="hidden md:flex items-stretch relative">
      {/* Left side - Project name & time - 35% */}
      <div className="project-left-side w-[35%] text-right flex flex-col justify-center pr-4">
        <p className="font-bold text-sm lg:text-base leading-5 lg:leading-6">{project.name}</p>
        <p className="text-[#FA5252] text-xs lg:text-sm leading-4 lg:leading-5">
          {project.time} - <a 
            href={project.companyUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline cursor-pointer"
          >
            {project.company}
          </a>
        </p>
      </div>
      
      {/* Spacer for timeline - 10% */}
      <div className="project-spacer w-[10%]" />
      
      {/* Right side - Content - 55% */}
      <div className={`project-right-side w-[55%] ${project.bg} p-3 lg:p-4 rounded-xl`}>
        <div className="project-pdf-header" style={{ display: 'none' }}>
          <p className="font-bold text-sm lg:text-base leading-5 lg:leading-6">{project.name}</p>
          <p className="text-[#FA5252] text-xs lg:text-sm leading-4 lg:leading-5 mb-2">{project.time}</p>
        </div>
        <ul className="text-[#44566C] text-xs lg:text-sm leading-5 lg:leading-6 list-disc pl-4 space-y-0.5">
          <li><span className="font-medium text-gray-700">Position:</span> {project.position}</li>
          <li><span className="font-medium text-gray-700">Description:</span> {project.description}</li>
          <li><span className="font-medium text-gray-700">Team size:</span> {project.teamSize}</li>
          <li><span className="font-medium text-gray-700">Tech:</span> {project.tech}</li>
        </ul>
      </div>
    </div>
  );
}

export default function WorkHistorySection() {
  return (
    <div className="bg-[#F8FBFB]">
      <div className="p-4 sm:p-6 md:p-8">
        <SectionHeader icon={faClockRotateLeft} title="Work history" />

        {/* Desktop Timeline Layout */}
        <div className="workhistory-timeline-desktop relative max-w-4xl mx-auto hidden md:block" id="history">
          <div className="absolute top-0 bottom-0 left-4 md:left-[39%] w-[2px] bg-gradient-to-b from-[#FA5252] to-[#DD2476] opacity-30" />

          {projects.map((project, idx) => (
            <div key={idx} className="relative mb-6 sm:mb-8 last:mb-0">
              <div className="absolute left-4 md:left-[39%] md:-translate-x-1/2 top-3 sm:top-4 w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-gradient-to-r from-[#FA5252] to-[#DD2476] border-2 border-white z-10" />
              <ProjectCardDesktop project={project} />
            </div>
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="workhistory-mobile md:hidden flex flex-col gap-4" id="history-mobile">
          {projects.map((project, idx) => (
            <ProjectCardSimple key={idx} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
