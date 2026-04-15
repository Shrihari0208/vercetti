import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CharacterModel } from './CharacterModel';
import { ANIMATIONS } from '../utils/constants';

// Rule §5: replaced 8 dynamic pointLights with emissive meshBasicMaterial
const FloatingLanterns = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Rule §4: memoize random positions so they're stable across renders
  const lanternPositions = useMemo(() => 
    Array.from({ length: 8 }, () => [
      (Math.random() - 0.5) * 8,
      1 + Math.random() * 4,
      -4 + (Math.random() - 0.5) * 4,
    ] as [number, number, number]),
  []);

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
      {lanternPositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.2, 0.2, 0.5]} />
          {/* Emissive glow — no dynamic light needed */}
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.8} />
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
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  return (
    <group>
      <fog attach="fog" args={['#06000f', 5, 30]} />
      <ambientLight intensity={0.8} color="#a855f7" />
      <directionalLight position={[-5, 5, 5]} intensity={1} color="#00f5ff" />

      {/* Single point light to replace the 8 removed lantern lights */}
      <pointLight position={[0, 3, -2]} intensity={2} color="#00f5ff" distance={15} decay={2} />

      {/* Ground opaque */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#06000f" transparent opacity={0.9} />
      </mesh>

      <OceanPlane />
      <FloatingLanterns />

      <CharacterModel 
        fbxPath={ANIMATIONS.about} 
        position={isMobile ? [0, -0.8, -2] : [0, -0.8, 0]} 
        rotation={[0, 0, 0]} 
        scale={isMobile ? 0.8 : 1}
      />
    </group>
  );
};
