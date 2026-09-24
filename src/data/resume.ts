export const personal = {
  name: "Trinh Phuong",
  fullName: "Mr. Trinh Phuong",
  title: "Middle Frontend Developer",
  summary:
    "Middle Frontend Developer specializing in React and Next.js, with experience in Vue and TypeScript. Built and scaled products across e-commerce, restaurant management, and SaaS platforms serving millions of users. Focused on frontend architecture, performance optimization, and user-centric design.",
  avatarSrc: "/img/brand/ava-min.jpg",
};

export const contact = {
  phone: "+84 386 592 529",
  email: "trinhphuong.dev@gmail.com",
  location: "Da Nang, Viet Nam",
  birthday: "July 09, 1996",
};

export interface SocialLink {
  platform: "linkedin" | "github";
  href: string;
}

export const socialLinks: SocialLink[] = [
  { platform: "linkedin", href: "https://www.linkedin.com/in/trinh-phuong-392051130" },
  { platform: "github", href: "https://github.com/trinhphuongdesigner" },
];

export interface StatBadge {
  years: string;
  label: string;
}

export const statBadges: StatBadge[] = [
  { years: "6+", label: "Yrs Frontend" },
  { years: "4+", label: "Yrs Design" },
  { years: "2+", label: "Yrs Teaching" },
  { years: "1+", label: "Yr Backend" },
];

export interface ExperienceEntry {
  id: string;
  time: string;
  title: string;
  company: string;
  companyUrl?: string;
  current?: boolean;
  badgeLabel?: string;
}

export const experience: ExperienceEntry[] = [
  {
    id: "madison",
    time: "10.2025 — Present",
    title: "Full Stack Software Engineer",
    company: "Madison",
    companyUrl: "https://madison-technologies.com/",
    current: true,
    badgeLabel: "Current",
  },
  {
    id: "avepoint",
    time: "06.2024 — 09.2025",
    title: "Front-end Software Engineer",
    company: "AvePoint",
    companyUrl: "https://www.avepoint.com/",
  },
  {
    id: "fpt",
    time: "07.2023 — 05.2024",
    title: "Front-end Software Engineer",
    company: "FPT Software",
    companyUrl: "https://fptsoftware.com/",
  },
  {
    id: "wiicamp",
    time: "05.2021 — 06.2023",
    title: "Full Stack Software Engineer",
    company: "Wiicamp",
    companyUrl: "https://wiicamp.com/",
  },
  {
    id: "orient",
    time: "01.2019 — 05.2021",
    title: "Software Engineer",
    company: "Orient Software",
    companyUrl: "https://www.orientsoftware.com/",
  },
  {
    id: "aptech",
    time: "03.2023 — Present",
    title: "Lecturer NodeJS & NextJS",
    company: "Aptech",
    companyUrl: "https://aptechvietnam.com.vn/",
    current: true,
    badgeLabel: "Part-time",
  },
  {
    id: "freelancer",
    time: "08.2016 — Present",
    title: "Designer",
    company: "Freelancer",
    current: true,
    badgeLabel: "Freelance",
  },
  {
    id: "teaching-assistant",
    time: "07.2021 — 12.2021",
    title: "Teaching Assistant, Intro to Programming",
    company: "The University of Danang — University of Economics",
  },
];

export interface Project {
  id: string;
  name: string;
  time: string;
  position: string;
  description: string;
  teamSize: number;
  tech: string[];
}

export interface CompanyGroup {
  id: string;
  company: string;
  companyUrl: string;
  projects: Project[];
  visibleCount?: number;
}

export const workHistory: CompanyGroup[] = [
  {
    id: "madison",
    company: "Madison",
    companyUrl: "https://madison-technologies.com/",
    projects: [
      {
        id: "residential-management-system",
        name: "Residential Management System",
        time: "10.2025 — Present",
        position: "Full stack developer",
        description: "Real estate management platform for property managers.",
        teamSize: 31,
        tech: ["Vue 3", "TypeScript", "NestJS", "PostgreSQL", "TailwindCSS v4"],
      },
    ],
  },
  {
    id: "avepoint",
    company: "AvePoint",
    companyUrl: "https://www.avepoint.com/",
    projects: [
      {
        id: "y-project",
        name: "Y Project",
        time: "06.2024 — 09.2025",
        position: "Front-end developer",
        description: "Microsoft services data query and reporting platform.",
        teamSize: 18,
        tech: ["React 18", "TypeScript", ".Net", "SQL", "TailwindCSS"],
      },
    ],
  },
  {
    id: "fpt",
    company: "FPT Software",
    companyUrl: "https://fptsoftware.com/",
    projects: [
      {
        id: "x-project",
        name: "X Project",
        time: "07.2023 — 05.2024",
        position: "Front-end developer",
        description: "Enterprise web application development.",
        teamSize: 19,
        tech: ["React 18", "TypeScript", "Java Spring Boot", "TailwindCSS"],
      },
    ],
  },
  {
    id: "aptech",
    company: "Aptech",
    companyUrl: "https://aptechvietnam.com.vn/",
    projects: [
      {
        id: "teaching",
        name: "Teaching",
        time: "03.2023 — 09.2023",
        position: "Instructor of M.E.R.N course",
        description: "Full-stack web development training program.",
        teamSize: 15,
        tech: ["Next.js 14", "React 18", "Node.js", "Express", "MongoDB"],
      },
    ],
  },
  {
    id: "wiicamp",
    company: "Wiicamp",
    companyUrl: "https://wiicamp.com/",
    visibleCount: 2,
    projects: [
      {
        id: "bookese",
        name: "Bookese Web App",
        time: "11.2022 — 06.2023",
        position: "Front-end developer",
        description: "Hotel booking and management platform.",
        teamSize: 7,
        tech: ["React JS", "Node.js", "Socket.IO", "MongoDB"],
      },
      {
        id: "vivumall",
        name: "Vivumall Web App",
        time: "09.2022 — 06.2023",
        position: "Front-end developer",
        description: "E-commerce marketplace platform.",
        teamSize: 14,
        tech: ["React JS", "Node.js", "Socket.IO", "MongoDB"],
      },
      {
        id: "dashment",
        name: "Dashment Web App",
        time: "01.2022 — 06.2022",
        position: "Full stack developer",
        description: "Enterprise organization and branch management portal.",
        teamSize: 5,
        tech: ["React JS", "Node.js", "MongoDB"],
      },
      {
        id: "wesport",
        name: "Wesport Web App",
        time: "11.2021 — 01.2022",
        position: "Front-end developer",
        description: "Sports field reservation management platform.",
        teamSize: 7,
        tech: ["React JS", "Node.js", "MongoDB"],
      },
      {
        id: "chattoken",
        name: "Chattoken Web App",
        time: "08.2021 — 11.2021",
        position: "Full stack developer",
        description: "Chat application on Blockchain platform.",
        teamSize: 5,
        tech: ["React JS", "Node.js", "Smart Contract", "Socket.IO", "MongoDB"],
      },
      {
        id: "lom",
        name: "LOM Web App",
        time: "09.2021 — 10.2021",
        position: "Designer",
        description: "UI/UX design and resources for dev team.",
        teamSize: 4,
        tech: ["Figma", "PhotoShop"],
      },
      {
        id: "rubricshub",
        name: "Rubricshub Web App",
        time: "06.2021 — 09.2021",
        position: "Full stack developer",
        description: "Educational platform for Rubric-based assessment.",
        teamSize: 5,
        tech: ["Express", "Node.js", "Socket.IO", "MongoDB"],
      },
      {
        id: "compas",
        name: "Compas Mobile App",
        time: "05.2021 — 08.2021",
        position: "Back-end developer",
        description: "Restaurant management mobile application (France).",
        teamSize: 4,
        tech: ["React Native", "Node.js", "Socket.IO", "MongoDB"],
      },
      {
        id: "pit",
        name: "PIT Mobile App",
        time: "05.2021 — 06.2021",
        position: "Back-end developer",
        description: "Mobile application backend development.",
        teamSize: 3,
        tech: ["Node.js", "Express", "MongoDB"],
      },
    ],
  },
  {
    id: "orient",
    company: "Orient Software",
    companyUrl: "https://www.orientsoftware.com/",
    projects: [
      {
        id: "neurondai",
        name: "NeurondAI Landing Page",
        time: "02.2021 — 05.2021",
        position: "Designer & Front-end & DevOps",
        description: "Company introduction landing page.",
        teamSize: 5,
        tech: ["Gatsby JS", "CDN", "CloudFlare"],
      },
      {
        id: "bitcastle",
        name: "BitCastle Reporting",
        time: "10.2020 — 02.2021",
        position: "Front-end developer",
        description: "Data statistics and reporting application (Japan).",
        teamSize: 5,
        tech: ["Vue JS", ".Net", "SQL"],
      },
      {
        id: "smartqa",
        name: "SmartQA",
        time: "06.2020 — 10.2020",
        position: "Front-end developer",
        description: "Task management with multi-language support (Japan).",
        teamSize: 4,
        tech: ["React JS", "Django", "Firebase", "Socket.IO"],
      },
      {
        id: "skribenta",
        name: "Skribenta",
        time: "05.2020 — 06.2020",
        position: "Designer",
        description: "Icon design for toolkit (Sweden — Excosoft).",
        teamSize: 1,
        tech: ["PhotoShop", "Illustrator"],
      },
      {
        id: "kona",
        name: "Kona Web App",
        time: "06.2019 — 05.2020",
        position: "Front-end developer",
        description: "Workspace booking platform with Stripe payment (Japan).",
        teamSize: 4,
        tech: ["React JS", "Django", "Firebase", "Socket.IO"],
      },
    ],
  },
];

export interface KnowledgeGroup {
  id: string;
  label: string;
  items: string[];
}

export const knowledge: KnowledgeGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "ReactJS", "NextJS"],
  },
  {
    id: "backend",
    label: "Backend",
    items: ["NodeJS", "Express", "NestJS", "MongoDB", "Mongoose", "MySQL", "PostgreSQL"],
  },
  {
    id: "design",
    label: "Design",
    items: ["PhotoShop", "Graphic Design", "Photography", "UI/UX Design", "Figma"],
  },
  {
    id: "other",
    label: "Other",
    items: [
      "AI Prompt",
      "Midjourney",
      "Embroidery Software",
      "Wilcom",
      "Time Management",
      "Flexibility",
    ],
  },
];

export interface EducationEntry {
  id: string;
  time: string;
  title: string;
  location: string;
}

export const education: EducationEntry[] = [
  {
    id: "university",
    time: "08.2015 — 06.2019",
    title: "Management Information System",
    location: "The University of Danang — University of Economics",
  },
  {
    id: "mcsa",
    time: "11.2017 — 01.2018",
    title: "MCSA Certificate",
    location: "DNICT Danang",
  },
  {
    id: "nodejs",
    time: "04.2021 — 05.2021",
    title: "NodeJS",
    location: "JavaScript & Node Express — Wiicamp",
  },
];

export const footerNote = "© Created by Trinh Phuong · Last updated 24.09.2026";

export const fullNameNoDiacritics = "Trinh Dinh Phuong";

/**
 * Builds the downloaded PDF's filename as "<Full Name> - <download date>"
 * with no diacritics/spaces, e.g. "Trinh-Dinh-Phuong-24-09-2026.pdf".
 */
export function getResumeFilename() {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  const namePart = fullNameNoDiacritics.replace(/\s+/g, "-");
  return `${namePart}-${dd}-${mm}-${yyyy}.pdf`;
}

/**
 * Merges experience roles with their corresponding work-history projects (matched by id)
 * for the print/PDF view, which combines Experience + Work History into one section
 * instead of repeating the same companies twice.
 */
export function getMergedTimeline() {
  return experience.map((exp) => {
    const group = workHistory.find((g) => g.id === exp.id);
    return {
      ...exp,
      projects: group?.projects ?? [],
    };
  });
}
