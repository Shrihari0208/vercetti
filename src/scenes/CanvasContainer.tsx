import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import { useStore } from '../store';
import { Suspense } from 'react';

import { HeroScene } from './HeroScene';
import { SkillsScene } from './SkillsScene';
import { ProjectsScene } from './ProjectsScene';
import { AboutScene } from './AboutScene';

export const CanvasContainer = () => {
  const activeSection = useStore((state) => state.activeSection);

  // Return corresponding scene
  const renderScene = () => {
    switch (activeSection) {
      case 'hero': return <HeroScene />;
      case 'skills': return <SkillsScene />;
      case 'projects': return <ProjectsScene />;
      case 'about': return <AboutScene />;
      default: return <HeroScene />;
    }
  };

  return (
    <div className="w-full h-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0); // Transparent to see `#06000f`
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          {renderScene()}
          <Preload all />
        </Suspense>
        <OrbitControls 
          enableZoom={true} 
          enablePan={true}
          maxPolarAngle={Math.PI * 0.55}
          minDistance={2}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
};
