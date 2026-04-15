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
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-brand-cyan tracking-widest uppercase text-sm mb-2 font-mono">Competencies</h3>
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-12 drop-shadow-md">My <span className="text-gradient">Arsenal</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SKILLS_DATA.map((skill, idx) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.15 }}
                className="glass-cyan p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="flex justify-between items-end mb-4">
                  <h4 className="text-lg font-bold uppercase tracking-wider">{skill.name}</h4>
                  <span className="text-brand-cyan font-mono text-sm">{skill.percent}%</span>
                </div>
                
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                  <motion.div 
                    className="h-full bg-brand-cyan shadow-[0_0_10px_#00f5ff]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + (idx * 0.1), ease: "easeOut" }}
                  />
                </div>
                
                <p className="text-xs text-white/50">{skill.items}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right side is intentionally empty for 3D space */}
        <div className="hidden lg:block"></div>
      </div>
    </section>
  );
};
