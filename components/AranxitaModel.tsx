'use client';

import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';
import { calibrateCharacterModel } from './modelRendering';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      primitive: any;
    }
  }
}

export default function AranxitaModel() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF('/gothic_girl.glb');

  useEffect(() => {
    calibrateCharacterModel(scene, {
      emissiveColor: '#2b1428',
      emissiveIntensity: 0.04,
      envMapIntensity: 0.22,
    });
  }, [scene]);

  return (
    <group ref={group} dispose={null} position={[-1.42, 0.32, 0.42]} rotation={[0, 3 * Math.PI / 2, 0]} scale={1.76}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/gothic_girl.glb');
