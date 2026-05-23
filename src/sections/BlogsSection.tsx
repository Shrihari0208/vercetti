import { motion } from 'framer-motion';
import { useScrollSection } from '../hooks/useScrollSection';
import { BLOGS_DATA } from '../data/blogs';

export const BlogsSection = () => {
  const ref = useScrollSection<HTMLElement>('blogs');

  return (
    <section id="blogs" ref={ref} className="min-h-screen flex items-center py-20 pb-32">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 pointer-events-none">
        
        <div className="flex flex-col justify-center pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="eyebrow mb-3">Career timeline</p>
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-10 text-[#f0ede8]">Journey</h2>
          </motion.div>

          <div className="relative pl-6 border-l border-[#222]">
            <div className="space-y-8">
              {BLOGS_DATA.map((blog, idx) => (
                <motion.div 
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                  className="relative"
                >
                  <div className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-[#e8d5b0]"></div>

                  <span className="text-[#e8d5b0] font-mono text-xs uppercase tracking-wider">{blog.date}</span>
                  <h5 className="text-sm font-bold mt-1 mb-2 text-[#f0ede8]">{blog.title}</h5>
                  <p className="text-xs text-[#737373] leading-relaxed mb-3">{blog.content}</p>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {blog.tags.map(tag => (
                      <span key={tag} className="text-xs text-[#737373] border border-[#222] px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:block"></div>
      </div>
    </section>
  );
};
