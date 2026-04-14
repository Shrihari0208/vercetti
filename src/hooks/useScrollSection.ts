import { useEffect, useRef } from 'react';
import { useStore } from '../store';

export const useScrollSection = <T extends HTMLElement>(sectionId: string, threshold: number = 0.5) => {
  const ref = useRef<T>(null);
  const setActiveSection = useStore((state) => state.setActiveSection);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(sectionId);
        }
      },
      { threshold }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [sectionId, setActiveSection, threshold]);

  return ref;
};
