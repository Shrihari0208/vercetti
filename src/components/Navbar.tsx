import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../utils/constants';
import { useStore } from '../store';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useStore((state) => state.activeSection);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-4 bg-[#06000f]/80 backdrop-blur-lg border-b border-white/5' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <div 
          onClick={() => scrollToSection('hero')}
          className="text-2xl font-black tracking-tighter cursor-pointer group"
        >
          <span className="text-white group-hover:text-brand-pink transition-colors">SD</span>
          <span className="text-brand-cyan">.</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`transition-colors uppercase tracking-widest hover:text-brand-cyan ${
                activeSection === link.id ? 'text-brand-cyan neon-shadow-cyan drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]' : 'text-white/70'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection('about')}
            className="px-5 py-2 rounded-full border border-brand-pink text-brand-pink hover:bg-brand-pink hover:text-white transition-all shadow-[0_0_10px_rgba(255,45,126,0.2)] hover:shadow-[0_0_20px_rgba(255,45,126,0.6)] uppercase tracking-wider text-xs"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white hover:text-brand-cyan transition-colors">
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 glass border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col py-4 px-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left uppercase tracking-widest text-sm py-2 ${
                    activeSection === link.id ? 'text-brand-cyan' : 'text-white/70'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
