import { motion } from 'framer-motion';
import { useScrollSection } from '../hooks/useScrollSection';

export const HeroSection = () => {
  const ref = useScrollSection<HTMLElement>('hero');

  return (
    <section id="hero" ref={ref} className="min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 pointer-events-none">
        
        <div className="flex flex-col justify-center pointer-events-auto">
          {/* Pulse Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-3 bg-brand-pink/10 border border-brand-pink/30 rounded-full px-4 py-2 w-max mb-8 backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-brand-pink animate-ping"></div>
            <span className="text-xs font-mono text-brand-pink uppercase tracking-widest">Vice City Beach — Available for work</span>
          </motion.div>

          {/* Name */}
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4"
          >
            <span className="text-white drop-shadow-lg">Shrihari</span>
            <br />
            <span className="text-gradient">Deshmukh</span>
          </motion.h1>

          {/* Title */}
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/70 font-light tracking-wide mb-6 uppercase"
          >
            Frontend · Full Stack · MERN Developer
          </motion.h2>

          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-white/50 max-w-md mb-10 leading-relaxed"
          >
            Crafting immersive digital experiences that blend high-performance engineering with striking visual design.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#projects" className="px-8 py-3 bg-brand-pink text-white rounded-md font-bold uppercase tracking-wider hover:bg-brand-pink/80 transition-all neon-shadow-pink hover:-translate-y-1">
              View Projects
            </a>
            <a href="#about" className="px-8 py-3 bg-white/5 border border-white/20 text-white rounded-md font-bold uppercase tracking-wider hover:bg-white/10 hover:border-white/40 transition-all hover:-translate-y-1 backdrop-blur-sm">
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right side is intentionally empty for 3D character */}
        <div className="hidden md:block"></div>
      </div>
    </section>
  );
};
