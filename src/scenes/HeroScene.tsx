import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { CharacterModel } from './CharacterModel';
import { ANIMATIONS } from '../utils/constants';

/* ─── Animated glass dance-floor tile grid ─── */
const TILE_COUNT = 30;        // reduced from 40 (Rule §5: fewer draw calls)
const TILE_SIZE = 1.0;
const GAP = 0.06;
const GRID_EXTENT = TILE_COUNT * (TILE_SIZE + GAP) * 0.5;

const DanceFloor = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const colorArrayRef = useRef<Float32Array | null>(null);
  const initializedRef = useRef(false);

  // Pre-compute palette as flat RGB values to avoid .lerp() overhead per frame
  const paletteRGB = useMemo(() => {
    const colors = [
      new THREE.Color('#ff2d7e'),
      new THREE.Color('#00f5ff'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#ff00aa'),
      new THREE.Color('#6366f1'),
      new THREE.Color('#0ea5e9'),
    ];
    // Store as flat [r,g,b, r,g,b, ...] for direct indexing
    const flat = new Float32Array(colors.length * 3);
    colors.forEach((c, i) => {
      flat[i * 3] = c.r;
      flat[i * 3 + 1] = c.g;
      flat[i * 3 + 2] = c.b;
    });
    return { flat, count: colors.length };
  }, []);

  const { totalCount, positions } = useMemo(() => {
    const total = TILE_COUNT * TILE_COUNT;
    const pos = new Float32Array(total * 2); // flat [x,z, x,z, ...]
    let idx = 0;
    for (let row = 0; row < TILE_COUNT; row++) {
      for (let col = 0; col < TILE_COUNT; col++) {
        pos[idx++] = col * (TILE_SIZE + GAP) - GRID_EXTENT + (TILE_SIZE + GAP) * 0.5;
        pos[idx++] = row * (TILE_SIZE + GAP) - GRID_EXTENT + (TILE_SIZE + GAP) * 0.5;
      }
    }
    return { totalCount: total, positions: pos };
  }, []);

  // Initialize instance matrices + colour buffer after mount
  useEffect(() => {
    if (!meshRef.current || initializedRef.current) return;
    const mesh = meshRef.current;
    const dummy = new THREE.Object3D();
    const colors = new Float32Array(totalCount * 3);

    for (let i = 0; i < totalCount; i++) {
      const x = positions[i * 2];
      const z = positions[i * 2 + 1];
      dummy.position.set(x, 0, z);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      // initial colour — dark base
      colors[i * 3] = 0.03;
      colors[i * 3 + 1] = 0.004;
      colors[i * 3 + 2] = 0.055;
    }
    mesh.instanceMatrix.needsUpdate = true;
    colorArrayRef.current = colors;

    mesh.geometry.setAttribute(
      'color',
      new THREE.InstancedBufferAttribute(colors, 3)
    );

    initializedRef.current = true;
  }, [totalCount, positions]);

  // Dark base RGB (avoid allocations)
  const DARK_R = 0.03, DARK_G = 0.004, DARK_B = 0.055;

  useFrame((state) => {
    if (!meshRef.current || !colorArrayRef.current) return;
    const t = state.clock.elapsedTime;
    const colors = colorArrayRef.current;
    const { flat, count: palLen } = paletteRGB;

    for (let i = 0; i < totalCount; i++) {
      const x = positions[i * 2];
      const z = positions[i * 2 + 1];

      // Concentric wave-ripple + diagonal sweep
      const dist = Math.sqrt(x * x + z * z);
      const wave1 = Math.sin(dist * 0.6 - t * 2.0) * 0.5 + 0.5;
      const wave2 = Math.sin((x + z) * 0.4 + t * 1.5) * 0.5 + 0.5;
      const blend = (wave1 * 0.6 + wave2 * 0.4) * 0.85;

      // Palette index — direct flat array lookup, zero allocations
      const palIdx = (Math.abs(Math.floor(x * 0.7 + z * 0.3 + t * 0.5)) % palLen) * 3;
      const br = flat[palIdx], bg = flat[palIdx + 1], bb = flat[palIdx + 2];

      // Inline lerp: dark → bright
      colors[i * 3]     = DARK_R + (br - DARK_R) * blend;
      colors[i * 3 + 1] = DARK_G + (bg - DARK_G) * blend;
      colors[i * 3 + 2] = DARK_B + (bb - DARK_B) * blend;
    }

    const attr = meshRef.current.geometry.getAttribute('color');
    if (attr) (attr as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, totalCount]}
      receiveShadow
    >
      <boxGeometry args={[TILE_SIZE, 0.08, TILE_SIZE]} />
      {/* Rule §5: Downgraded from meshPhysicalMaterial (clearcoat = extra render pass) */}
      <meshStandardMaterial
        vertexColors
        metalness={0.8}
        roughness={0.12}
        transparent
        opacity={0.92}
        envMapIntensity={1.2}
      />
    </instancedMesh>
  );
};

/* ─── Reflective glass layer underneath the tiles ─── */
const GlassReflector = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
    <planeGeometry args={[100, 100]} />
    <MeshReflectorMaterial
      mirror={0.75}
      blur={[300, 100]}
      resolution={512}       // Rule §5: reduced from 1024
      mixBlur={1}
      mixStrength={40}
      roughness={0.8}
      depthScale={1.2}
      minDepthThreshold={0.4}
      maxDepthThreshold={1.4}
      color="#050010"
      metalness={0.6}
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
      <DanceFloor />

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
