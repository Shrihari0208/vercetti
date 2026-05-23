export interface BlogPost {
  id: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
}

export const BLOGS_DATA: BlogPost[] = [
  {
    id: 'bsc-2024',
    date: 'June 2024',
    title: 'Graduated & Made the Switch',
    content: 'Finished my B.Sc. and moved into software full-time. The pivot into frontend wasn\'t an overnight decision — I\'d been building things on the side for a while. Formalizing it felt like catching up to where I already was.',
    tags: ['Milestone', 'Career']
  },
  {
    id: 'intern-aug-2024',
    date: 'August 2024',
    title: 'Frontend Intern — Blue Digital Media',
    content: 'First professional role. Built the Elsopro.com CRM front-end — React, Redux Toolkit, Tailwind — used by 60,000+ vendors. Integrated Google Maps for vendor search. Shipped a full responsive interface within the first month.',
    tags: ['Internship', 'React', 'CRM']
  },
  {
    id: 'react-dev-sep-2024',
    date: 'September 2024',
    title: 'Promoted to React Developer',
    content: 'Moved to full-time. Led front-end for the Abu Dhabi Sports Council Events Portal — booking/approval flows, bilingual RTL layouts, Google Maps. Also shipped the full Snapit.ae UI with Framer Motion animations.',
    tags: ['React', 'Government Portal', 'Blue Digital Media']
  },
  {
    id: 'meon-jun-2025',
    date: 'June 2025 – Present',
    title: 'Frontend Developer — Meon Technologies',
    content: 'Architecting fintech products from scratch: OCR Admin, Super Admin, Chatbot Admin, NCD IPO platform, and a Central Tool for cross-product management. Also optimizing the public site for Core Web Vitals and SEO.',
    tags: ['Fintech', 'Meon Technologies', 'Current']
  }
];
