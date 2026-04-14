import { useEffect, useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { FBXLoader, SkeletonUtils } from 'three-stdlib';

interface Props {
  fbxPath: string;
  idleSwayAmount?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export const CharacterModel = ({ 
  fbxPath, 
  idleSwayAmount = 0.1, 
  position = [0, 0, 0], 
  rotation = [0, Math.PI / 4, 0], 
  scale = 1.0 
}: Props) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load the FBX model
  const fbx = useLoader(FBXLoader, fbxPath);
  
  // Clone to avoid mutation of cached objects and preserve SkinnedMesh hierarchy
  const clonedFbx = useMemo(() => {
    const clone = SkeletonUtils.clone(fbx);
    
    // Enable shadows
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    // Grounding: Ensure feet are exactly at y=0
    clone.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(clone);
    clone.position.y = -box.min.y;

    return clone;
  }, [fbx]);

  const { actions, names } = useAnimations(fbx.animations, groupRef);

  useEffect(() => {
    if (names.length > 0) {
      const action = actions[names[0]];
      if (action) {
        action.reset().fadeIn(0.5).play();
      }
    }
  }, [actions, names]);

  useFrame((state) => {
    if (groupRef.current && idleSwayAmount > 0) {
      groupRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.4) * idleSwayAmount;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={clonedFbx} />
    </group>
  );
};
