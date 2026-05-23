import { CONTACT_INFO } from '../utils/constants';

export const Footer = () => (
  <footer className="py-8 border-t border-[#1a1a1a] relative z-10 w-full">
    <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#737373] font-mono tracking-widest uppercase">
      <div className="flex flex-wrap justify-center gap-6">
        <a href={CONTACT_INFO.portfolio} target="_blank" rel="noreferrer" className="hover:text-[#f0ede8] transition-colors">Portfolio</a>
        <a href={CONTACT_INFO.github} target="_blank" rel="noreferrer" className="hover:text-[#f0ede8] transition-colors">GitHub</a>
        <a href={CONTACT_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#f0ede8] transition-colors">LinkedIn</a>
        <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#f0ede8] transition-colors">Email</a>
      </div>
      <p>Built by Shrihari Deshmukh — {new Date().getFullYear()}</p>
    </div>
  </footer>
);
