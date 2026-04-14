import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { CharacterModel } from './CharacterModel';
import { ANIMATIONS } from '../utils/constants';

const FloatingOrbs = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.y = 2 + Math.sin(state.clock.elapsedTime * 2 + i * 1.5) * 0.5;
      });
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[-3, 2, -2]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#00f5ff" />
      </mesh>
      <mesh position={[3, 2, -1]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#ff2d7e" />
      </mesh>
      <mesh position={[-2, 3, 2]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>
      <mesh position={[2, 2.5, 3]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial color="#ff8c00" />
      </mesh>
      <mesh position={[0, 4, -4]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color="#00f5ff" />
      </mesh>
    </group>
  );
};

export const SkillsScene = () => {
  return (
    <group>
      <fog attach="fog" args={['#06000f', 2, 20]} />
      <ambientLight intensity={0.5} color="#00f5ff" />
      <pointLight position={[0, 5, 0]} intensity={2} color="#a855f7" />

      {/* Ground Grid Floor */}
      <Grid 
        position={[0, 0, 0]} 
        args={[20, 20]} 
        cellSize={1} 
        cellThickness={1} 
        cellColor="#a855f7" 
        sectionSize={4} 
        sectionThickness={1.5} 
        sectionColor="#00f5ff" 
        fadeDistance={20} 
        fadeStrength={1} 
      />

      <FloatingOrbs />
      <Stars radius={50} depth={50} count={1000} factor={4} saturation={1} fade speed={2} />

      <CharacterModel 
        fbxPath={ANIMATIONS.skills} 
        position={[2, 0, 0]} 
        rotation={[0, -Math.PI / 4, 0]} 
      />
    </group>
  );
};
