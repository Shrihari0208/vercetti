import { useEffect, useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { FBXLoader, SkeletonUtils } from 'three-stdlib';

interface Props {
  fbxPath: string;
  /** Optional second FBX whose animation plays after the first finishes (loops). */
  secondaryFbxPath?: string;
  idleSwayAmount?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  inPlace?: boolean; // Strips XZ root motion to allow manual group translation
}

export const CharacterModel = ({ 
  fbxPath, 
  secondaryFbxPath,
  idleSwayAmount = 0.1, 
  position = [0, 0, 0], 
  rotation = [0, Math.PI / 4, 0], 
  scale = 1.0,
  inPlace = false
}: Props) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load the primary FBX model
  const fbx = useLoader(FBXLoader, fbxPath);

  // Optionally load secondary FBX (for follow-up animation)
  const secondaryFbx = useLoader(
    FBXLoader,
    secondaryFbxPath || fbxPath // fallback to primary if none provided
  );
  
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

  // Merge all animations: primary + secondary
  const allAnimations = useMemo(() => {
    const processClip = (clip: THREE.AnimationClip) => {
      const newClip = clip.clone();
      if (inPlace) {
        newClip.tracks.forEach(t => {
          if (t.name.includes('mixamorigHips.position')) {
            // Keep Y (up/down bobbing) but zero out X and Z (translation)
            for (let i = 0; i < t.values.length; i += 3) {
              const initialX = t.values[0];
              const initialZ = t.values[2];
              t.values[i] = initialX; // Lock X to initial
              t.values[i + 2] = initialZ; // Lock Z to initial
            }
          }
        });
      }
      return newClip;
    };

    const anims = fbx.animations.map(processClip);
    if (secondaryFbxPath && secondaryFbx && secondaryFbx !== fbx) {
      // Tag secondary animations so we can identify them
      secondaryFbx.animations.forEach((clip, i) => {
        const taggedClip = processClip(clip);
        taggedClip.name = `__secondary_${i}_${clip.name}`;
        anims.push(taggedClip);
      });
    }
    return anims;
  }, [fbx, secondaryFbx, secondaryFbxPath, inPlace]);

  const { actions, names, mixer } = useAnimations(allAnimations, groupRef);

  // State machine: walk(1x) → taunt(2x) → walk(1x) → taunt(2x) → …
  const phaseRef = useRef<'walk' | 'taunt'>('walk');
  const tauntCountRef = useRef(0);

  useEffect(() => {
    if (names.length === 0) return;

    const primaryName = names.find(n => !n.startsWith('__secondary_'));
    const secondaryName = names.find(n => n.startsWith('__secondary_'));
    if (!primaryName || !actions[primaryName]) return;

    const walkAction = actions[primaryName]!;

    if (!secondaryFbxPath || !secondaryName || !actions[secondaryName]) {
      // No secondary — just loop the primary forever
      walkAction.reset().fadeIn(0.5).play();
      return;
    }

    const tauntAction = actions[secondaryName]!;

    // Helper to start walk (plays once)
    const playWalk = () => {
      phaseRef.current = 'walk';
      tauntAction.fadeOut(0.4);
      walkAction.reset();
      walkAction.setLoop(THREE.LoopOnce, 1);
      walkAction.clampWhenFinished = true;
      walkAction.fadeIn(0.4).play();
    };

    // Helper to start taunt (plays once per call)
    const playTaunt = () => {
      phaseRef.current = 'taunt';
      walkAction.fadeOut(0.4);
      tauntAction.reset();
      tauntAction.setLoop(THREE.LoopOnce, 1);
      tauntAction.clampWhenFinished = true;
      tauntAction.fadeIn(0.4).play();
    };

    // Kick off the cycle with walk
    phaseRef.current = 'walk';
    tauntCountRef.current = 0;
    walkAction.setLoop(THREE.LoopOnce, 1);
    walkAction.clampWhenFinished = true;
    walkAction.reset().fadeIn(0.5).play();

    const onFinished = (e: { action: THREE.AnimationAction }) => {
      if (e.action === walkAction && phaseRef.current === 'walk') {
        // Walk finished → start taunt (1st of 2)
        tauntCountRef.current = 0;
        tauntCountRef.current++;
        playTaunt();
      } else if (e.action === tauntAction && phaseRef.current === 'taunt') {
        // Taunt finished — played it tauntCountRef times so far
        if (tauntCountRef.current < 2) {
          tauntCountRef.current++;
          playTaunt();
        } else {
          // 2 taunts done → back to walk
          tauntCountRef.current = 0;
          playWalk();
        }
      }
    };

    mixer.addEventListener('finished', onFinished);
    return () => {
      mixer.removeEventListener('finished', onFinished);
    };
  }, [actions, names, mixer, secondaryFbxPath]);

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
