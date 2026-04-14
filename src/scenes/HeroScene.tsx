import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { CharacterModel } from './CharacterModel';
import { ANIMATIONS } from '../utils/constants';

const PalmTree = ({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.05;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4 + position[2]) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Trunk */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.2, 0.4, 3]} />
        <meshStandardMaterial color="#301A18" />
      </mesh>
      {/* Fronds Array */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[0, 3, 0]} rotation={[0, (Math.PI * 2 / 5) * i, Math.PI / 3]}>
          <coneGeometry args={[1, 3, 4]} />
          <meshStandardMaterial color="#0A3A2A" wireframe={true} />
        </mesh>
      ))}
    </group>
  );
};

export const HeroScene = () => {
  return (
    <group>
      <fog attach="fog" args={['#1a0520', 5, 20]} />
      <hemisphereLight args={['#ff8c00', '#1a0520', 0.8]} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ff8c00" castShadow />
      
      {/* Neon pink point light */}
      <pointLight position={[2, 2, 2]} intensity={2} color="#ff2d7e" />
      <pointLight position={[-3, 3, 0]} intensity={2} color="#00f5ff" />

      {/* Sun */}
      <mesh position={[0, 10, -15]}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial color="#ff8c00" />
      </mesh>

      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0b0312" transparent opacity={0.85} />
      </mesh>

      {/* Neon Road Stripes */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1, 0.01, 5]}>
        <planeGeometry args={[0.1, 20]} />
        <meshBasicMaterial color="#ff2d7e" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 5]}>
        <planeGeometry args={[0.1, 20]} />
        <meshBasicMaterial color="#ff2d7e" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1, 0.01, 5]}>
        <planeGeometry args={[0.1, 20]} />
        <meshBasicMaterial color="#ff2d7e" />
      </mesh>

      <PalmTree position={[-4, 0, -5]} rotation={[0, 0, 0]} />
      <PalmTree position={[4, 0, -4]} rotation={[0, 1, 0]} />
      <PalmTree position={[-5, 0, 2]} rotation={[0, -0.5, 0]} />
      <PalmTree position={[5, 0, 4]} rotation={[0, 0.5, 0]} />

      <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

      <CharacterModel 
        fbxPath={ANIMATIONS.hero} 
        position={[2, 0, 0]} 
        rotation={[0, -Math.PI / 4, 0]} 
      />
    </group>
  );
};
