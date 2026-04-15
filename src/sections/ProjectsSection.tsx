import { motion } from 'framer-motion';
import { useScrollSection } from '../hooks/useScrollSection';
import { PROJECTS_DATA } from '../data/projects';
import { Code, ExternalLink } from 'lucide-react';

export const ProjectsSection = () => {
  const ref = useScrollSection<HTMLElement>('projects');

  return (
    <section id="projects" ref={ref} className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 pointer-events-none">
        
        <div className="flex flex-col justify-center pointer-events-auto mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-brand-purple tracking-widest uppercase text-sm mb-2 font-mono">My Work</h3>
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-12 drop-shadow-md">Featured <span className="text-gradient">Projects</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PROJECTS_DATA.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.15 }}
                className={`glass p-6 rounded-xl hover:-translate-y-2 transition-all duration-300 group hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]`}
              >
                <h4 className="text-xl font-bold mb-2 uppercase tracking-wide group-hover:text-brand-purple transition-colors">
                  {project.title}
                </h4>
                <p className="text-sm text-white/50 mb-6 min-h-[60px]">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-md text-brand-cyan/80">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4 border-t border-white/10 pt-4">
                  <a href={project.github} className="flex items-center text-sm font-bold text-white/70 hover:text-white transition-colors">
                    <Code size={16} className="mr-2" /> Code
                  </a>
                  <a href={project.live} className="flex items-center text-sm font-bold text-white/70 hover:text-white transition-colors">
                    <ExternalLink size={16} className="mr-2" /> Live
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right side is intentionally empty for 3D space */}
        <div className="hidden md:block"></div>
      </div>
    </section>
  );
};
