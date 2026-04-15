import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, MeshReflectorMaterial, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { CharacterModel } from './CharacterModel';
import { ANIMATIONS } from '../utils/constants';

/* ─── Sleek Synthwave Grid Floor ─── */
const SynthwaveGrid = () => (
  <Grid
    position={[0, -0.04, 0]} // Just above the reflector
    args={[100, 100]}
    cellSize={1.5}
    cellThickness={1.5}
    cellColor="#422575" // Deep purple/cyan mix
    sectionSize={1.5}
    sectionThickness={1.5}
    sectionColor="#422575"
    fadeDistance={40}
    fadeStrength={1.5}
  />
);

/* ─── Reflective glass layer underneath the grid ─── */
const GlassReflector = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
    <planeGeometry args={[100, 100]} />
    <MeshReflectorMaterial
      mirror={1}
      blur={[0, 0]} // Sharp reflections for the glossy tile look
      resolution={512}
      mixBlur={0}
      mixStrength={10}
      roughness={0.15} // Very glossy
      depthScale={1.2}
      minDepthThreshold={0.4}
      maxDepthThreshold={1.4}
      color="#020005" // Pitch black base to emphasize lighting and reflections
      metalness={0.9}
    />
  </mesh>
);

/* ─── Palm tree accent — shared materials (Rule §4) ─── */

// Memoize materials outside component so all PalmTree instances share them
const trunkMaterial = new THREE.MeshStandardMaterial({ color: '#301A18' });
const frondMaterial = new THREE.MeshStandardMaterial({ color: '#0A3A2A', wireframe: true });

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
      <mesh position={[0, 1.5, 0]} castShadow material={trunkMaterial}>
        <cylinderGeometry args={[0.2, 0.4, 3]} />
      </mesh>
      {/* Fronds Array */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[0, 3, 0]} rotation={[0, (Math.PI * 2 / 5) * i, Math.PI / 3]} castShadow material={frondMaterial}>
          <coneGeometry args={[1, 3, 4]} />
        </mesh>
      ))}
    </group>
  );
};

export const HeroScene = () => {
  return (
    <group>
      <fog attach="fog" args={['#1a0520', 8, 30]} />
      <hemisphereLight args={['#ffffff', '#0b0312', 0.2]} />

      {/* Key light — single shadow caster (Rule §5: minimize shadow casters) */}
      <directionalLight
        position={[5, 12, 5]}
        intensity={1.5}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}   // reduced from 2048
        shadow-mapSize-height={1024}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-bias={-0.0005}

      // fdff
      />

      {/* Neon accent lights — no shadows (Rule §5) */}
      <pointLight position={[3, 3, 2]} intensity={3} color="#ff2d7e" distance={15} decay={2} />
      <pointLight position={[-4, 4, 0]} intensity={3} color="#00f5ff" distance={15} decay={2} />
      <pointLight position={[0, 2, -5]} intensity={2} color="#a855f7" distance={12} decay={2} />

      {/* Spot light — shadow REMOVED (was a second shadow caster) */}
      <spotLight
        position={[0, 10, 0]}
        angle={Math.PI / 3}
        penumbra={0.8}
        intensity={2}
        color="#6366f1"
      />

      {/* Sun */}
      <mesh position={[0, 10, -15]}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial color="#ff8c00" />
      </mesh>

      {/* ── Dance Floor ── */}
      <GlassReflector />
      <SynthwaveGrid />

      {/* Palm trees — shared materials */}
      <PalmTree position={[-4, 0, -5]} rotation={[0, 0, 0]} />
      <PalmTree position={[4, 0, -4]} rotation={[0, 1, 0]} />
      <PalmTree position={[-5, 0, 2]} rotation={[0, -0.5, 0]} />
      <PalmTree position={[5, 0, 4]} rotation={[0, 0.5, 0]} />

      {/* Rule §5: reduced from 2000 to 1000 */}
      <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

      <CharacterModel
        fbxPath={ANIMATIONS.hero}
        secondaryFbxPath="/animations/standing-taunt-battlecry.fbx"
        position={[2, -0.9, 0]}
        rotation={[0, -Math.PI / 4, 0]}
      />
    </group>
  );
};
