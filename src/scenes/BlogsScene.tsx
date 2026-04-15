import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshReflectorMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { CharacterModel } from './CharacterModel';
import { ANIMATIONS } from '../utils/constants';

/* ─── Shiny Crystal Floor for Moonwalk ─── */
const ShinyFloor = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
    <planeGeometry args={[150, 150]} />
    <MeshReflectorMaterial
      mirror={1}
      blur={[300, 100]} // Smooth out the reflection slightly
      resolution={1024}
      mixBlur={1}
      mixStrength={50}
      roughness={0.05} // Crystal clear glossy
      depthScale={1.2}
      minDepthThreshold={0.4}
      maxDepthThreshold={1.4}
      color="#10051c" // Deep indigo base to bounce colors off
      metalness={0.8}
    />
  </mesh>
);

/* ─── Spotlight that follows or highlights the stage ─── */
const StageLights = () => {
  const lightRef = useRef<THREE.SpotLight>(null);
  
  useFrame((state) => {
    if (lightRef.current) {
      // Gentle sweeping motion for the spotlight like a stage performance
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 5 + 2;
    }
  });

  return (
    <group>
      <spotLight
        ref={lightRef}
        position={[2, 10, 5]}
        angle={Math.PI / 5}
        penumbra={0.5}
        intensity={4}
        color="#00f5ff"
        castShadow
      />
      <pointLight position={[2, 2, -2]} intensity={2} color="#ff2d7e" />
    </group>
  );
};

const Moonwalker = ({ isMobile }: { isMobile: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Manually translate the character backwards into the depth continuously.
      // Moonwalk moves backwards. We angle him and push him deep.
      const speed = 0.6; // Units per second
      groupRef.current.position.z -= speed * delta;
      groupRef.current.position.x += (speed * 0.5) * delta;

      // If he moonwalks perfectly into the thick fog and disappears, reset his position to loop the illusion!
      if (groupRef.current.position.z < -30) {
        groupRef.current.position.z = isMobile ? -3 : 0;
        groupRef.current.position.x = isMobile ? 0 : 2;
      }
    }
  });

  return (
    <group ref={groupRef} position={isMobile ? [0, -0.8, -3] : [2, -0.8, 0]}>
      <CharacterModel 
        fbxPath={ANIMATIONS.blogs} 
        position={[0, 0, 0]} 
        rotation={[0, -Math.PI / 3, 0]} // Angled away
        scale={isMobile ? 0.7 : 1}
        inPlace={true} // Flawless loop without FBX positional snapping!
      />
    </group>
  );
};

export const BlogsScene = () => {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  return (
    <group>
      <fog attach="fog" args={['#06000f', 5, 25]} />
      <ambientLight intensity={0.2} />

      <StageLights />
      <ShinyFloor />

      <Stars radius={50} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />

      {/* Floating abstract element in the distance */}
      <mesh position={[8, 4, -10]} rotation={[0, Math.PI / 4, 0]}>
        <torusKnotGeometry args={[2, 0.4, 128, 32]} />
        <meshStandardMaterial color="#a855f7" wireframe />
      </mesh>

      <Moonwalker isMobile={isMobile} />
    </group>
  );
};
