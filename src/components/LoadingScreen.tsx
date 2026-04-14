import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';

export const LoadingScreen = () => {
  const loaded = useStore((state) => state.loaded);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fake progress loading (0 to 100%)
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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#06000f]"
        >
          <div className="text-4xl font-bold text-gradient mb-8 tracking-widest uppercase">
            Loading
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}
            >
              .
            </motion.span>
          </div>
          
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-pink via-brand-cyan to-brand-purple"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.3 }}
            />
          </div>
          <div className="mt-4 text-white/50 text-sm font-mono">{Math.min(progress, 100)}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
