export interface BlogPost {
  id: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
}

export const BLOGS_DATA: BlogPost[] = [
  {
    id: "grad-2024",
    date: "June 2024",
    title: "Graduation & A New Beginning",
    content: "Graduated with a B.Sc. Agriculture (Hons) from Dr. PDKV. While my background was rooted in agriculture, my absolute passion for technology and building digital experiences led me to formally pivot into software engineering. The real journey started here.",
    tags: ["Milestone", "Graduation", "Pivot"]
  },
  {
    id: "internship-bd",
    date: "July 2024",
    title: "Joining Blue Digital Media as an Intern",
    content: "Started my first professional gig as a Frontend Developer Intern. My primary task was working on an extensive CRM building UI components using React, Redux Toolkit, and Material-UI. Seeing code I wrote impact over 60,000 vendors was mind-blowing.",
    tags: ["Internship", "React", "CRM"]
  },
  {
    id: "react-dev-promotion",
    date: "September 2024",
    title: "Stepping Up: Full-Time React Developer",
    content: "Promoted to a full-time Dev! I led the frontend architecture for the Abu Dhabi Sports Council (ADSC) Events Portal and Snapit.ae UI. Implemented complex data tables, dynamic CMS integration, and ensured responsive precision using Tailwind CSS.",
    tags: ["Career", "Frontend", "TailwindCSS"]
  },
  {
    id: "freelance-fullstack",
    date: "December 2024 - Present",
    title: "Freelancing & Exploring Full-Stack AI",
    content: "Expanded my horizons into freelance work, crafting super high-conversion landing pages and delving into backend systems (Node.js, Express, Supabase). Currently focused on building Blabber Bot AI—my experimental AI-driven full-stack companion.",
    tags: ["Freelance", "FullStack", "AI"]
  }
];
