import { motion } from 'framer-motion';
import { useScrollSection } from '../hooks/useScrollSection';

export const AboutSection = () => {
  const ref = useScrollSection<HTMLElement>('about');

  return (
    <section id="about" ref={ref} className="min-h-screen flex items-center py-20 pb-32">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10 pointer-events-none">
        
        {/* Left Content: Bio and Timeline */}
        <div className="flex flex-col justify-center pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-brand-orange tracking-widest uppercase text-sm mb-2 font-mono">My Journey</h3>
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-8 drop-shadow-md">About <span className="text-gradient">Me</span></h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 leading-relaxed mb-10"
          >
            I am a passionate software engineer blurring the line between code and art. With strong foundations in modern web technologies and a keen eye for aesthetics, I create high-performance applications that leave a lasting impression.
          </motion.p>

          {/* Timeline */}
          <div className="space-y-6 relative border-l border-white/20 ml-3 pl-6">
            {[
              { year: '2021', title: 'Started Journey', desc: 'Began learning web development self-taught.' },
              { year: '2022', title: 'First Freelance', desc: 'Delivered initial commercial projects for local clients.' },
              { year: '2023', title: 'Joined TechCorp', desc: 'Working as Frontend Developer on large scale apps.' },
              { year: '2024', title: 'Creative Engineering', desc: 'Diving into WebGL, 3D, and immersive experiences.' }
            ].map((item, idx) => (
              <motion.div 
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (idx * 0.1) }}
                className="relative"
              >
                <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-brand-orange shadow-[0_0_10px_#ff8c00]"></div>
                <h4 className="text-brand-orange font-mono text-sm mb-1">{item.year}</h4>
                <h5 className="font-bold uppercase tracking-wider mb-1">{item.title}</h5>
                <p className="text-sm text-white/50">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Content: Contact form that hovers above the 3D scene elements */}
        <div className="flex flex-col justify-center pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass-pink p-8 rounded-2xl relative overflow-hidden"
          >
            {/* Subtle glow background */}
            <div className="absolute top-0 right-0 -m-20 w-40 h-40 bg-brand-pink/20 rounded-full blur-3xl rounded-full"></div>
            
            <h3 className="text-2xl font-black uppercase tracking-wider mb-6 relative z-10">Get in Touch</h3>
            
            <form className="space-y-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand-pink transition-colors font-light tracking-wide"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand-pink transition-colors font-light tracking-wide"
                />
              </div>
              <div>
                <textarea 
                  placeholder="Your Message..." 
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand-pink transition-colors font-light tracking-wide resize-none"
                ></textarea>
              </div>
              <button className="w-full py-4 bg-gradient-to-r from-brand-pink to-brand-purple rounded-lg font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex justify-center items-center neon-shadow-pink">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
