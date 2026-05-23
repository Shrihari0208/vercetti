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
        scrolled ? 'py-4 bg-[#0a0a0a]/90 border-b border-white/5' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <div 
          onClick={() => scrollToSection('hero')}
          className="text-xl font-black tracking-tighter cursor-pointer text-[#f0ede8] hover:text-[#e8d5b0] transition-colors"
        >
          SD.
        </div>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8 text-xs font-medium">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`transition-colors uppercase tracking-widest ${
                activeSection === link.id
                  ? 'text-[#f0ede8]'
                  : 'text-[#737373] hover:text-[#f0ede8]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection('about')}
            className="px-4 py-1.5 border border-white/20 text-white/70 rounded text-xs uppercase tracking-wider hover:border-white/50 hover:text-white transition-colors"
          >
            Hire me
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white/70 hover:text-white transition-colors">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu — dark background, no blur */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-[#0a0a0a] border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col py-4 px-6 gap-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left uppercase tracking-widest text-xs py-2 ${
                    activeSection === link.id ? 'text-[#f0ede8]' : 'text-[#737373]'
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
