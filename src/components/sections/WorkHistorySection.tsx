import SectionHeader from "../ui/SectionHeader";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

interface Project {
  name: string;
  time: string;
  position: string;
  description: string;
  teamSize: number;
  tech: string;
  bg: string;
}

const projects: Project[] = [
  {
    name: "Residential Management System",
    time: "10.2025 - Present (Madison)",
    position: "Full stack developer",
    description: "A comprehensive residential management system for a real estate company. The platform enables property managers to efficiently track residents, manage lease agreements, handle maintenance requests, process payments, and generate detailed reports. Features include resident portal, automated notifications, document management, and analytics dashboard.",
    teamSize: 31,
    tech: "Vue JS | NestJS | PostgreSQL",
    bg: "bg-[#EEF5FA]"
  },
  {
    name: "Y project",
    time: "06.2024 - 09.2025 (AvePoint)",
    position: "Front-end developer",
    description: "Users using system to query data and displaying reporting from microsoft service like power BI app, Sharepoint. Bulk operations like creating groups, assigning permissions, and sharing resources with Microsoft services.",
    teamSize: 18,
    tech: "React JS | .Net | SQL",
    bg: "bg-[#F2F4FF]"
  },
  {
    name: "X project",
    time: "07.2023 - 05.2024 (FPT software)",
    position: "Front-end developer",
    description: "Develop - Enhance - Testing for project.",
    teamSize: 19,
    tech: "React JS | Java Spring Boot",
    bg: "bg-[#FCF9F2]"
  },
  {
    name: "Teaching",
    time: "03.2023 - Present (Aptech Da Nang)",
    position: "Instructor of M.E.R.N training course",
    description: "Teaching & supporting students throughout the course. Learn and apply technologies into practice. Analyze business models to propose appropriate technology solutions.",
    teamSize: 15,
    tech: "React JS | Node JS - Express | MongoDB - Mongoose | NextJS",
    bg: "bg-[#FFF4F4]"
  },
  {
    name: "Bookese Web App",
    time: "11.2022 - 06.2023 (Wiicamp)",
    position: "Front-end developer",
    description: "Web application designed in 3 parts: Admin manages the entire system, Business owners create hotels/rooms/booking management, Users search for hotels and book.",
    teamSize: 7,
    tech: "React JS | Node JS | Socket IO | MongoDB",
    bg: "bg-[#FFF1FB]"
  },
  {
    name: "Vivumall Web App",
    time: "09.2022 - 06.2023 (Wiicamp)",
    position: "Front-end developer",
    description: "E-commerce platform with Admin, Business owners shop management, and Users buying/selling features.",
    teamSize: 14,
    tech: "React JS | Node JS | Socket IO | MongoDB",
    bg: "bg-[#F2F4FF]"
  },
];

interface ProjectCardProps {
  project: Project;
}

function ProjectCardSimple({ project }: ProjectCardProps) {
  return (
    <div className={`${project.bg} p-3 sm:p-4 rounded-xl`}>
      <p className="font-bold text-xs sm:text-sm md:text-base leading-5 sm:leading-6">{project.name}</p>
      <p className="text-[#FA5252] text-xs sm:text-sm leading-4 sm:leading-5 mb-2">{project.time}</p>
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
      <div className="project-left-side w-[35%] text-right flex flex-col justify-center">
        <p className="font-bold text-sm lg:text-base leading-5 lg:leading-6">{project.name}</p>
        <p className="text-[#FA5252] text-xs lg:text-sm leading-4 lg:leading-5">{project.time}</p>
      </div>
      
      {/* Spacer for timeline - 10% */}
      <div className="project-spacer w-[10%]" />
      
      {/* Right side - Content - 55% */}
      <div className={`project-right-side w-[55%] ${project.bg} p-3 lg:p-4 rounded-xl`}>
        {/* Hidden header for PDF - will be shown via JS */}
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
    <div>
      <div className="p-4 sm:p-6 md:p-8">
        <SectionHeader icon={faClockRotateLeft} title="Work history" />

        {/* Desktop Timeline Layout */}
        <div className="workhistory-timeline-desktop relative max-w-4xl mx-auto hidden md:block" id="history">
          {/* Timeline line - position at 40% (35% left + half of 10% spacer) */}
          <div className="absolute top-0 bottom-0 left-4 md:left-[39%] w-[2px] bg-gradient-to-b from-[#FA5252] to-[#DD2476] opacity-30" />

          {projects.map((project, idx) => (
            <div key={idx} className="relative mb-6 sm:mb-8 last:mb-0">
              {/* Timeline dot - position at 40% */}
              <div className="absolute left-4 md:left-[39%] md:-translate-x-1/2 top-3 sm:top-4 w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-gradient-to-r from-[#FA5252] to-[#DD2476] border-2 border-white z-10" />
              
              {/* Desktop layout */}
              <ProjectCardDesktop project={project} />
            </div>
          ))}
        </div>

        {/* Mobile Layout - Simple list without timeline */}
        <div className="workhistory-mobile md:hidden flex flex-col gap-4" id="history-mobile">
          {projects.map((project, idx) => (
            <ProjectCardSimple key={idx} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
