import SectionHeader from "../ui/SectionHeader";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

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

const projects: Project[] = [
  {
    name: "Residential Management System",
    time: "10.2025 - Present",
    company: "Madison",
    companyUrl: "https://madison-technologies.com/",
    position: "Full stack developer",
    description: "Real estate management platform for property managers.",
    teamSize: 31,
    tech: "Vue 3 | TypeScript | NestJS | PostgreSQL | TailwindCSS v4",
    bg: "bg-[#EEF5FA]"
  },
  {
    name: "Y Project",
    time: "06.2024 - 09.2025",
    company: "AvePoint",
    companyUrl: "https://www.avepoint.com/",
    position: "Front-end developer",
    description: "Microsoft services data query and reporting platform.",
    teamSize: 18,
    tech: "React 18 | TypeScript | .Net | SQL | TailwindCSS",
    bg: "bg-[#F2F4FF]"
  },
  {
    name: "X Project",
    time: "07.2023 - 05.2024",
    company: "FPT Software",
    companyUrl: "https://fptsoftware.com/",
    position: "Front-end developer",
    description: "Enterprise web application development.",
    teamSize: 19,
    tech: "React 18 | TypeScript | Java Spring Boot | TailwindCSS",
    bg: "bg-[#FCF9F2]"
  },
  {
    name: "Teaching",
    time: "03.2023 - 09.2023",
    company: "Aptech",
    companyUrl: "https://aptechvietnam.com.vn/",
    position: "Instructor of M.E.R.N training course",
    description: "Full-stack web development training program.",
    teamSize: 15,
    tech: "Next.js 14 | React 18 | Node.js | Express | MongoDB | TailwindCSS v4",
    bg: "bg-[#FFF4F4]"
  },
  {
    name: "Bookese Web App",
    time: "11.2022 - 06.2023",
    company: "Wiicamp",
    companyUrl: "https://wiicamp.com/",
    position: "Front-end developer",
    description: "Hotel booking and management platform.",
    teamSize: 7,
    tech: "React JS | Node.js | Socket.IO | MongoDB",
    bg: "bg-[#FFF1FB]"
  },
  {
    name: "Vivumall Web App",
    time: "09.2022 - 06.2023",
    company: "Wiicamp",
    companyUrl: "https://wiicamp.com/",
    position: "Front-end developer",
    description: "E-commerce marketplace platform.",
    teamSize: 14,
    tech: "React JS | Node.js | Socket.IO | MongoDB",
    bg: "bg-[#F2F4FF]"
  },
  {
    name: "Dashment Web App",
    time: "01.2022 - 06.2022",
    company: "Wiicamp",
    companyUrl: "https://wiicamp.com/",
    position: "Front-end & Back-end developer",
    description: "Enterprise organization and branch management portal.",
    teamSize: 5,
    tech: "React JS | Node.js | MongoDB",
    bg: "bg-[#EEF5FA]"
  },
  {
    name: "Wesport Web App",
    time: "11.2021 - 01.2022",
    company: "Wiicamp",
    companyUrl: "https://wiicamp.com/",
    position: "Front-end developer",
    description: "Sports field reservation management platform.",
    teamSize: 7,
    tech: "React JS | Node.js | MongoDB",
    bg: "bg-[#FCF9F2]"
  },
  {
    name: "Chattoken Web App",
    time: "08.2021 - 11.2021",
    company: "Wiicamp",
    companyUrl: "https://wiicamp.com/",
    position: "Full stack developer",
    description: "Chat application on Blockchain platform.",
    teamSize: 5,
    tech: "React JS | Node.js | Smart Contract | Socket.IO | MongoDB",
    bg: "bg-[#FFF4F4]"
  },
  {
    name: "LOM Web App",
    time: "09.2021 - 10.2021",
    company: "Wiicamp",
    companyUrl: "https://wiicamp.com/",
    position: "Designer",
    description: "UI/UX design and resources for dev team.",
    teamSize: 4,
    tech: "Figma | PhotoShop",
    bg: "bg-[#FFF1FB]"
  },
  {
    name: "Rubricshub Web App",
    time: "06.2021 - 09.2021",
    company: "Wiicamp",
    companyUrl: "https://wiicamp.com/",
    position: "Full stack developer",
    description: "Educational platform for Rubric-based assessment.",
    teamSize: 5,
    tech: "Express | Node.js | Socket.IO | MongoDB",
    bg: "bg-[#F2F4FF]"
  },
  {
    name: "Compas Mobile App",
    time: "05.2021 - 08.2021",
    company: "Wiicamp",
    companyUrl: "https://wiicamp.com/",
    position: "Back-end developer",
    description: "Restaurant management mobile application (France).",
    teamSize: 4,
    tech: "React Native | Express | Node.js | Socket.IO | MongoDB",
    bg: "bg-[#EEF5FA]"
  },
  {
    name: "PIT Mobile App",
    time: "05.2021 - 06.2021",
    company: "Wiicamp",
    companyUrl: "https://wiicamp.com/",
    position: "Back-end developer",
    description: "Mobile application backend development.",
    teamSize: 3,
    tech: "Node.js | Express | MongoDB",
    bg: "bg-[#FCF9F2]"
  },
  {
    name: "NeurondAI Landing Page",
    time: "02.2021 - 05.2021",
    company: "Wiicamp",
    companyUrl: "https://wiicamp.com/",
    position: "Designer & Front-end & DevOps",
    description: "Company introduction landing page.",
    teamSize: 5,
    tech: "Gatsby JS | CDN | CloudFlare",
    bg: "bg-[#FFF4F4]"
  },
  {
    name: "BitCastle Reporting",
    time: "10.2020 - 02.2021",
    company: "Orient Software",
    companyUrl: "https://www.orientsoftware.com/",
    position: "Front-end developer",
    description: "Data statistics and reporting application (Japan).",
    teamSize: 5,
    tech: "Vue JS | .Net | SQL",
    bg: "bg-[#FFF1FB]"
  },
  {
    name: "SmartQA",
    time: "06.2020 - 10.2020",
    company: "Orient Software",
    companyUrl: "https://www.orientsoftware.com/",
    position: "Front-end developer",
    description: "Task management with multi-language support (Japan).",
    teamSize: 4,
    tech: "React JS | Django | Firebase | Socket.IO",
    bg: "bg-[#F2F4FF]"
  },
  {
    name: "Skribenta",
    time: "05.2020 - 06.2020",
    company: "Orient Software",
    companyUrl: "https://www.orientsoftware.com/",
    position: "Designer",
    description: "Icon design for toolkit (Sweden - Excosoft).",
    teamSize: 1,
    tech: "PhotoShop | Illustrator",
    bg: "bg-[#EEF5FA]"
  },
  {
    name: "Kona Web App",
    time: "06.2019 - 05.2020",
    company: "Orient Software",
    companyUrl: "https://www.orientsoftware.com/",
    position: "Front-end developer",
    description: "Workspace booking platform with Stripe payment (Japan).",
    teamSize: 4,
    tech: "React JS | Django | Firebase | Socket.IO",
    bg: "bg-[#FCF9F2]"
  },
];

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
