/** Live / repo links sourced from LatextFile (resume) */

export type ProjectLink = { label: string; href: string };

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  /** Public repo */
  github?: string;
  /** Primary live / demo URL */
  live?: string;
  /** Extra URLs (e.g. multiple client sites) */
  extraLinks?: ProjectLink[];
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'sanjana',
    title: 'Sanjana — AI Companion App',
    description:
      'Published on Google Play. Users chat with configurable AI personas. React Native client, Node.js + Express + Prisma + PostgreSQL backend, Docker, AWS Lightsail.',
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'Prisma', 'Docker', 'AWS Lightsail'],
    // No Play Store URL in resume — add when you have the listing link
  },
  {
    id: 'dcoify',
    title: 'Dcoify — SaaS Platform',
    description:
      'Production SaaS with MFA + backup keys, multilingual support, BYOK, and Lemon Squeezy. Next.js, Tailwind, shadcn/ui, PostgreSQL, Prisma.',
    tech: ['Next.js', 'PostgreSQL', 'Prisma', 'Lemon Squeezy', 'shadcn/ui'],
    github: 'https://github.com/Shrihari0208/Dcoify',
    live: 'https://dcoify.vercel.app/',
  },
  {
    id: 'vedai',
    title: 'VedAI — Full-Stack AI App',
    description:
      'Full-stack AI app with MFA, multilingual support, BYOK, and Lemon Squeezy. Next.js stack parallel to Dcoify with different product focus.',
    tech: ['Next.js', 'PostgreSQL', 'Prisma', 'Node.js', 'Lemon Squeezy'],
    github: 'https://github.com/Shrihari0208/VedaiNextjs',
    live: 'https://vedai-nextjs.vercel.app/',
  },
  {
    id: 'bloggy',
    title: 'Bloggy',
    description:
      'Full-stack blogging app with JWT auth, CRUD posts, responsive Material UI. Deployed on Render.',
    tech: ['React', 'Material-UI', 'JWT', 'Render'],
    github: 'https://github.com/Harry-Hunter23/Bloggy',
    live: 'https://bloggy-x9yf.onrender.com/',
  },
  {
    id: 'blabber-bot',
    title: 'Blabber Bot',
    description:
      'AI chatbot using OpenAI for summarization, generation, and images. Frontend on Netlify, backend on Render.',
    tech: ['React', 'OpenAI API', 'Node.js', 'Netlify', 'Render'],
    github: 'https://github.com/Harry-Hunter23/BlabberBot',
    live: 'https://main--blabberbot.netlify.app/',
  },
  {
    id: 'adsc',
    title: 'Abu Dhabi Sports Council Portal',
    description:
      'Government event portal: booking/approval, Google Maps, bilingual English/Arabic (RTL), search with filters and pagination.',
    tech: ['React', 'Vite', 'Tailwind', 'Redux Toolkit', 'Google Maps API'],
  },
  {
    id: 'elsopro',
    title: 'Elsopro CRM & Snapit.ae',
    description:
      'CRM front-end for 60,000+ vendors; Snapit.ae UI with React, Vite, Tailwind, Framer Motion.',
    tech: ['React', 'Redux Toolkit', 'Tailwind', 'Framer Motion'],
    live: 'https://elsopro.com',
  },
  {
    id: 'client-sites',
    title: 'Client Websites',
    description:
      'High-conversion landing pages and a full tourism portal with maps, itinerary tools, and media galleries.',
    tech: ['React', 'Next.js', 'Tailwind', 'Google Maps API'],
    extraLinks: [
      { label: 'Blue Digital Services', href: 'https://www.services.bluedigital.co.in/' },
      { label: 'Vertex Grid Systems', href: 'http://vertexgridsystems.com/' },
      { label: 'AMH Tourism', href: 'https://amhtourism.com/' },
    ],
  },
];
