import { motion } from 'framer-motion';
import { useScrollSection } from '../hooks/useScrollSection';
import { PROJECTS_DATA } from '../data/projects';

export const ProjectsSection = () => {
  const ref = useScrollSection<HTMLElement>('projects');

  return (
    <section id="projects" ref={ref} className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 pointer-events-none">
        
        <div className="flex flex-col justify-center pointer-events-auto mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="eyebrow mb-3">Selected work</p>
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-10 text-[#f0ede8]">Projects</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROJECTS_DATA.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (idx % 4) * 0.08 }}
                className="card card-hover p-5 group flex flex-col"
              >
                <h4 className="text-sm font-bold mb-2 tracking-wide text-[#f0ede8] group-hover:text-[#e8d5b0] transition-colors">
                  {project.title}
                </h4>
                <p className="text-xs text-[#737373] mb-4 leading-relaxed flex-1">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 border border-[#333] text-[#737373] rounded">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-[#222] pt-3">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#737373] hover:text-[#f0ede8] transition-colors"
                    >
                      Live →
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#737373] hover:text-[#f0ede8] transition-colors"
                    >
                      Code →
                    </a>
                  )}
                  {project.extraLinks?.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#737373] hover:text-[#f0ede8] transition-colors"
                    >
                      {link.label} →
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="hidden md:block"></div>
      </div>
    </section>
  );
};
