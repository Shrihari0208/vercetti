import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CharacterModel } from './CharacterModel';
import { ANIMATIONS } from '../utils/constants';

const FloatingLanterns = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(state.clock.elapsedTime * 1.5 + i) * 0.005;
        child.position.x += Math.cos(state.clock.elapsedTime * 1.2 + i) * 0.003;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 8, 1 + Math.random() * 4, -4 + (Math.random() - 0.5) * 4]}>
          <cylinderGeometry args={[0.2, 0.2, 0.5]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.8} />
          <pointLight intensity={0.5} distance={3} color="#00f5ff" />
        </mesh>
      ))}
    </group>
  );
};

const OceanPlane = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
      <planeGeometry args={[100, 100, 32, 32]} />
      <meshStandardMaterial color="#0a2a4a" wireframe transparent opacity={0.3} />
    </mesh>
  );
};

export const AboutScene = () => {
  return (
    <group>
      <fog attach="fog" args={['#06000f', 5, 30]} />
      <ambientLight intensity={0.8} color="#a855f7" />
      <directionalLight position={[-5, 5, 5]} intensity={1} color="#00f5ff" />

      {/* Ground opaque */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#06000f" transparent opacity={0.9} />
      </mesh>

      <OceanPlane />
      <FloatingLanterns />

      <CharacterModel 
        fbxPath={ANIMATIONS.about} 
        position={[0, 0, 0]} 
        rotation={[0, 0, 0]} 
      />
    </group>
  );
};
