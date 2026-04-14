import { CONTACT_INFO } from '../utils/constants';

export const Footer = () => (
  <footer className="py-8 border-t border-white/5 relative z-10 w-full glass bg-transparent border-t-brand-purple/20">
    <div className="container mx-auto px-6 text-center text-white/50 text-sm font-lexend">
      <div className="flex justify-center space-x-6 mb-4 font-mono tracking-widest uppercase text-xs">
        <a href={CONTACT_INFO.github} target="_blank" rel="noreferrer" className="hover:text-brand-pink transition-colors">GitHub</a>
        <a href={CONTACT_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-brand-cyan transition-colors">LinkedIn</a>
        <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-brand-purple transition-colors">Email</a>
      </div>
      <p className="tracking-wide">&copy; {new Date().getFullYear()} Sharihari Deshmukh. All rights reserved.</p>
    </div>
  </footer>
);
