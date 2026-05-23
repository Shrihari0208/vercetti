import { motion } from 'framer-motion';
import { useScrollSection } from '../hooks/useScrollSection';

export const HeroSection = () => {
  const ref = useScrollSection<HTMLElement>('hero');

  return (
    <section id="hero" ref={ref} className="min-h-screen flex items-center pt-28 lg:pt-20">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 pointer-events-none">
        
        <div className="flex flex-col justify-center pointer-events-auto">
          {/* Availability badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="status-badge mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"></div>
            <span className="text-xs font-mono text-[#737373] uppercase tracking-widest">Frontend Developer @ Meon Technologies</span>
          </motion.div>

          {/* Name */}
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4"
          >
            <span className="text-[#f0ede8]">Shrihari</span>
            <br />
            <span className="text-[#f0ede8]/90">Deshmukh</span>
          </motion.h1>

          {/* Role */}
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-[#737373] font-light tracking-wide mb-6"
          >
            React · React Native · Next.js · Full-Stack
          </motion.h2>

          {/* Real tagline */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-[#737373] max-w-md mb-10 leading-relaxed text-sm"
          >
            Over a year shipping production apps — government event portals, fintech platforms, a Play Store AI companion, and SaaS products with payments and auth. I write TypeScript, build with React and React Native, and care about code that scales.
          </motion.p>

          {/* Two clean CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <a href="#projects" className="btn-primary">
              Selected work →
            </a>
            <a href="/resume.pdf" download="Shrihari_Deshmukh_Resume.pdf" className="btn-secondary">
              Download CV
            </a>
          </motion.div>
        </div>

        {/* Right side reserved for 3D character */}
        <div className="hidden md:block"></div>
      </div>
    </section>
  );
};
