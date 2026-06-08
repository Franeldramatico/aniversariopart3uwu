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

export default function FranModel() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF('/chibiFran.glb');

  useEffect(() => {
    calibrateCharacterModel(scene, {
      emissiveColor: '#21152d',
      emissiveIntensity: 0.026,
      envMapIntensity: 0.18,
    });
  }, [scene]);

  return (
    <group ref={group} dispose={null} position={[1.34, 0.42, 0.42]} rotation={[0, 3 * Math.PI / 2, 0]} scale={1.72}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/chibiFran.glb');
