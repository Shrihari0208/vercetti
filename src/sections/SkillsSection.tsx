import { motion } from 'framer-motion';
import { useScrollSection } from '../hooks/useScrollSection';
import { SKILLS_DATA } from '../data/skills';

export const SkillsSection = () => {
  const ref = useScrollSection<HTMLElement>('skills');

  return (
    <section id="skills" ref={ref} className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 pointer-events-none">
        
        <div className="flex flex-col justify-center pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="eyebrow mb-3">Technical skills</p>
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-10 text-[#f0ede8]">Stack</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SKILLS_DATA.map((skill, idx) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
                className="card p-5"
              >
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#737373] mb-3">{skill.name}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2 py-1 border border-[#333] text-[#f0ede8]/80 rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block"></div>
      </div>
    </section>
  );
};
