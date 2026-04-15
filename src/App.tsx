import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { SceneErrorBoundary } from './components/SceneErrorBoundary';
import { useStore } from './store';

import { HeroSection } from './sections/HeroSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { AboutSection } from './sections/AboutSection';
import { CanvasContainer } from './scenes/CanvasContainer';

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

function App() {
  const setLoaded = useStore((state) => state.setLoaded);

  useEffect(() => {
    // Smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Initial load timer
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, [setLoaded]);

  return (
    <>
      <LoadingScreen />
      
      <div className="relative min-h-screen bg-[#06000f] text-white overflow-x-hidden font-lexend selection:bg-brand-pink/30 selection:text-white">
        {/* 3D Canvas fixed relative to viewport */}
        <div className="fixed inset-0 z-0">
          <SceneErrorBoundary>
            <CanvasContainer />
          </SceneErrorBoundary>
        </div>

        {/* Foreground pointer-events container */}
        <div className="relative z-10 w-full pointer-events-none flex flex-col min-h-screen">
          <div className="pointer-events-auto">
            <Navbar />
          </div>
          
          <main className="pointer-events-auto flex-grow flex flex-col">
            <HeroSection />
            <SkillsSection />
            <ProjectsSection />
            <AboutSection />
          </main>
          
          <div className="pointer-events-auto shrink-0 w-full">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;