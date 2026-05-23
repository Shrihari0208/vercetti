import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';

export const LoadingScreen = () => {
  const loaded = useStore((state) => state.loaded);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loaded) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 99) {
            clearInterval(interval);
            return 99;
          }
          return prev + Math.floor(Math.random() * 15) + 5;
        });
      }, 300);
      return () => clearInterval(interval);
    } else {
      setProgress(100);
    }
  }, [loaded]);

  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]"
        >
          <div className="text-2xl font-black text-[#f0ede8] mb-8 tracking-widest uppercase font-lexend">
            Loading
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>.</motion.span>
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}>.</motion.span>
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}>.</motion.span>
          </div>
          
          <div className="w-48 h-px bg-[#222] overflow-hidden">
            <motion.div
              className="h-full bg-[#e8d5b0]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.3 }}
            />
          </div>
          <div className="mt-3 text-[#737373] text-xs font-mono">{Math.min(progress, 100)}%</div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-10 text-[#444] text-xs tracking-wider uppercase text-center px-6"
          >
            Best on a laptop or larger screen
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
