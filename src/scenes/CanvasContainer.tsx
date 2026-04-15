import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../store';
import { Suspense, lazy } from 'react';

// Lazy-load scenes — only the active scene's code + FBX assets are fetched (Rule §3)
const HeroScene = lazy(() => import('./HeroScene').then(m => ({ default: m.HeroScene })));
const SkillsScene = lazy(() => import('./SkillsScene').then(m => ({ default: m.SkillsScene })));
const ProjectsScene = lazy(() => import('./ProjectsScene').then(m => ({ default: m.ProjectsScene })));
const AboutScene = lazy(() => import('./AboutScene').then(m => ({ default: m.AboutScene })));

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
        shadows
        camera={{ position: [0, 2, 6], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
        dpr={[1, 1.5]}  // Rule §6: cap DPR at 1.5 for mobile
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          {renderScene()}
          {/* Removed <Preload all /> — it defeats lazy loading (Rule §3 + §4) */}
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
