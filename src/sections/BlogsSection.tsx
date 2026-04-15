import { motion } from 'framer-motion';
import { useScrollSection } from '../hooks/useScrollSection';
import { BLOGS_DATA } from '../data/blogs';
import { MessageSquare, Heart, Repeat2, Share } from 'lucide-react';

export const BlogsSection = () => {
  const ref = useScrollSection<HTMLElement>('blogs');

  return (
    <section id="blogs" ref={ref} className="min-h-screen flex items-center py-20 pb-32">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 pointer-events-none">
        
        {/* Left Content: The Thread */}
        <div className="flex flex-col justify-center pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-brand-purple tracking-widest uppercase text-sm mb-2 font-mono">Archive</h3>
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-12 drop-shadow-md">My <span className="text-gradient">Timeline</span></h2>
          </motion.div>

          <div className="relative pl-6 sm:pl-10">
            {/* The continuous vertical thread line */}
            <div className="absolute top-0 bottom-0 left-[15px] sm:left-[31px] w-[2px] bg-white/10 hidden sm:block"></div>

            <div className="space-y-10">
              {BLOGS_DATA.map((blog, idx) => (
                <motion.div 
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * idx }}
                  className="relative flex flex-col sm:flex-row gap-4 sm:gap-6"
                >
                  {/* Thread Avatar (Left side of thread on Desktop) */}
                  <div className="hidden sm:flex relative z-10 shrink-0 flex-col items-center">
                    <div className="w-12 h-12 rounded-full border-2 border-brand-purple bg-[#06000f] flex items-center justify-center font-black text-brand-purple z-10 relative overflow-hidden shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                      <span className="text-sm">SH</span>
                    </div>
                  </div>

                  {/* Thread Post Card */}
                  <div className="flex-1 glass p-5 sm:p-6 rounded-2xl hover:bg-white/5 transition-colors group">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-bold tracking-wide flex items-center">
                        Shrihari 
                        <span className="text-brand-purple ml-1">✔</span>
                      </h4>
                      <span className="text-white/40 text-sm font-mono">• {blog.date}</span>
                    </div>
                    
                    <h5 className="text-lg font-bold mb-3 text-white/90">{blog.title}</h5>
                    <p className="text-sm text-white/60 leading-relaxed mb-4">{blog.content}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-5">
                      {blog.tags.map(tag => (
                        <span key={tag} className="text-xs text-brand-purple bg-brand-purple/10 px-2 py-1 rounded-md">#{tag}</span>
                      ))}
                    </div>

                    {/* Faux Thread Actions */}
                    <div className="flex items-center space-x-6 text-white/30 border-t border-white/5 pt-3">
                      <button className="flex items-center hover:text-brand-pink transition-colors group-hover:text-white/50"><MessageSquare size={16} className="mr-2" /> <span className="text-xs">{(idx + 1) * 12}</span></button>
                      <button className="flex items-center hover:text-green-400 transition-colors group-hover:text-white/50"><Repeat2 size={16} className="mr-2" /> <span className="text-xs">{idx + 3}</span></button>
                      <button className="flex items-center hover:text-red-400 transition-colors group-hover:text-white/50"><Heart size={16} className="mr-2" /> <span className="text-xs">{(4 - idx) * 45}</span></button>
                      <button className="flex items-center hover:text-brand-cyan transition-colors group-hover:text-white/50"><Share size={16} /></button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Thread extension fading out */}
            <div className="absolute -bottom-20 left-[31px] w-[2px] h-20 bg-gradient-to-b from-white/10 to-transparent hidden sm:block"></div>
          </div>
        </div>

        {/* Right side is intentionally empty for the Moonwalk 3D scene (Shiny Floor) */}
        <div className="hidden lg:block relative pointer-events-auto">
           {/* Can place an interactive overlay here if needed */}
        </div>
      </div>
    </section>
  );
};
