import { motion } from 'framer-motion';
import { useScrollSection } from '../hooks/useScrollSection';
import { useState, useRef, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';

export const AboutSection = () => {
  const ref = useScrollSection<HTMLElement>('about');
  const formRef = useRef<HTMLFormElement>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS credentials are missing in your environment configuration.");
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(() => {
        setSubmitStatus('success');
        formRef.current?.reset();
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus('idle'), 5000);
      });
  };

  return (
    <section id="about" ref={ref} className="min-h-screen flex items-center py-20 pb-32">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 pointer-events-none">
        
        {/* Left: Bio and Timeline */}
        <div className="flex flex-col justify-center pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="eyebrow mb-3">Background</p>
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-8 text-[#f0ede8]">About</h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[#737373] leading-relaxed mb-10 text-sm max-w-md"
          >
            Frontend developer with 1+ year shipping production React and React Native apps. Currently at Meon Technologies building fintech platforms — IPO workflows, KYC, and admin dashboards — from the ground up. I work with TypeScript, Next.js, Redux Toolkit, and know my way around a backend when needed.
          </motion.p>

          {/* Timeline */}
          <div className="space-y-6 relative border-l border-[#222] ml-3 pl-6">
            {[
              {
                year: '2020 – 2024',
                title: 'B.Sc.',
                desc: 'College of Agriculture, Nagpur — Dr. PDKV. Built things on the side throughout.'
              },
              {
                year: 'Aug 2024',
                title: 'Frontend Intern — Blue Digital Media',
                desc: 'Built the Elsopro CRM front-end (60,000+ vendors) and integrated Google Maps API. Shipped on schedule, promoted within two months.'
              },
              {
                year: 'Sep 2024',
                title: 'React Developer — Blue Digital Media',
                desc: 'Led front-end for the Abu Dhabi Sports Council portal and Snapit.ae. Owned bilingual layouts, OAuth 2.0 auth flows, and Agile sprints.'
              },
              {
                year: 'Jun 2025 – Now',
                title: 'Frontend Developer — Meon Technologies',
                desc: 'Architecting fintech products from scratch: OCR Admin, NCD IPO platform, KYC workflows, Super Admin, and a Central Tool for cross-product management.'
              }
            ].map((item, idx) => (
              <motion.div 
                key={item.year}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
                className="relative"
              >
                <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-[#e8d5b0]"></div>
                <h4 className="text-[#e8d5b0] font-mono text-xs mb-1 uppercase tracking-wider">{item.year}</h4>
                <h5 className="font-bold tracking-wide mb-1 text-sm text-[#f0ede8]">{item.title}</h5>
                <p className="text-xs text-[#737373]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Contact form */}
        <div className="flex flex-col justify-center pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="card p-8"
          >
            <p className="eyebrow mb-2">Contact</p>
            <h3 className="text-xl font-bold tracking-wide mb-6 text-[#f0ede8]">Send a message</h3>
            
            <form ref={formRef} className="space-y-4" onSubmit={sendEmail}>
              <input 
                type="text" 
                name="user_name"
                placeholder="Your name" 
                required
                className="w-full bg-transparent border border-[#222] rounded px-4 py-3 text-[#f0ede8] placeholder-[#444] focus:outline-none focus:border-[#444] transition-colors text-sm"
              />
              <input 
                type="email" 
                name="user_email"
                placeholder="Your email" 
                required
                className="w-full bg-transparent border border-[#222] rounded px-4 py-3 text-[#f0ede8] placeholder-[#444] focus:outline-none focus:border-[#444] transition-colors text-sm"
              />
              <textarea 
                name="message"
                placeholder="What are you building?" 
                rows={4}
                required
                className="w-full bg-transparent border border-[#222] rounded px-4 py-3 text-[#f0ede8] placeholder-[#444] focus:outline-none focus:border-[#444] transition-colors text-sm resize-none"
              ></textarea>

              {submitStatus === 'success' && (
                <p className="text-[#4ade80] text-xs font-mono">Message sent.</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-xs font-mono">Failed to send — check API keys.</p>
              )}

              <button 
                disabled={isSubmitting}
                className="btn-primary w-full justify-center disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send message →'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
