import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { CharacterModel } from './CharacterModel';
import { ANIMATIONS } from '../utils/constants';

const NeonFrames = () => {
  return (
    <group position={[0, 2.5, -4]}>
      <mesh position={[-4, 0, 0]}>
        <boxGeometry args={[0.1, 5, 0.1]} />
        <meshBasicMaterial color="#ff2d7e" />
      </mesh>
      <mesh position={[4, 0, 0]}>
        <boxGeometry args={[0.1, 5, 0.1]} />
        <meshBasicMaterial color="#00f5ff" />
      </mesh>
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[8, 0.1, 0.1]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>
      <mesh position={[0, -2.5, 0]}>
        <boxGeometry args={[8, 0.1, 0.1]} />
        <meshBasicMaterial color="#ff2d7e" />
      </mesh>
    </group>
  );
};

const ParticleSystem = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesCount = 500;

  // Rule §4: memoize positions so they aren't recreated every render
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <points ref={pointsRef} position={[0, 2, 0]}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={particlesCount} 
          args={[positions, 3]} 
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#00f5ff" transparent opacity={0.6} />
    </points>
  );
};

export const ProjectsScene = () => {
  return (
    <group>
      <fog attach="fog" args={['#06000f', 5, 20]} />
      <ambientLight intensity={0.4} color="#a855f7" />
      <pointLight position={[0, 4, 2]} intensity={2} color="#ff2d7e" />

      {/* Ground transparent */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#06000f" transparent opacity={0.8} />
      </mesh>

      <NeonFrames />
      <ParticleSystem />
      <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

      <CharacterModel 
        fbxPath={ANIMATIONS.projects} 
        position={[2, -0.8, 0]} 
        rotation={[0, -Math.PI / 4, 0]} 
      />
    </group>
  );
};
