'use client';

import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  ContactShadows,
} from '@react-three/drei';
import AranxitaModel from './AranxitaModel';
import FranModel from './FranModel';
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  BufferGeometry,
  DirectionalLight,
  Float32BufferAttribute,
  Object3D,
  PCFSoftShadowMap,
  Points,
  SRGBColorSpace,
} from 'three';

function CompositionRig() {
  const { camera, viewport } = useThree();

  useFrame((state, delta) => {
    const isPortrait = viewport.width < 6;
    const damping = 1 - Math.exp(-delta * 3.8);
    const targetX = state.mouse.x * (isPortrait ? 0.1 : 0.18);
    const targetY = 1.36 + state.mouse.y * 0.06;
    const targetZ = isPortrait ? 8.2 : 6.85;

    camera.position.x += (targetX - camera.position.x) * damping;
    camera.position.y += ((isPortrait ? 2.05 : 1.82) - camera.position.y) * damping;
    camera.position.z += (targetZ - camera.position.z) * damping;
    camera.lookAt(0, targetY, 0.28);
  });

  return null;
}

function ParticleLayer({
  count,
  width,
  height,
  zMin,
  zMax,
  size,
  color,
  opacity,
  speed,
  parallax,
  seed,
}: {
  count: number;
  width: number;
  height: number;
  zMin: number;
  zMax: number;
  size: number;
  color: string;
  opacity: number;
  speed: number;
  parallax: number;
  seed: number;
}) {
  const ref = useRef<Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    let randomState = seed;
    const random = () => {
      randomState = (randomState * 1664525 + 1013904223) >>> 0;
      return randomState / 4294967296;
    };

    for (let i = 0; i < count; i += 1) {
      const stride = i * 3;
      const sideBias = random() > 0.62 ? Math.sign(random() - 0.5) * 1.2 : 0;
      positions[stride] = (random() - 0.5) * width + sideBias;
      positions[stride + 1] = random() * height + 0.45;
      positions[stride + 2] = zMin + random() * (zMax - zMin);
    }

    const buffer = new BufferGeometry();
    buffer.setAttribute('position', new Float32BufferAttribute(positions, 3));
    buffer.computeBoundingSphere();
    return buffer;
  }, [count, height, seed, width, zMax, zMin]);

  useFrame((state, delta) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      const damping = 1 - Math.exp(-delta * 4.2);
      ref.current.position.x += (state.mouse.x * parallax - ref.current.position.x) * damping;
      ref.current.position.y += (state.mouse.y * parallax * 0.32 - ref.current.position.y) * damping;
      ref.current.rotation.y = Math.sin(t * speed) * 0.015;
      ref.current.rotation.z = t * speed * 0.012;
    }
  });

  return (
    <points ref={ref} geometry={geometry} frustumCulled>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
        depthTest
        blending={AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

function LayeredParticles() {
  return (
    <group renderOrder={1}>
      <ParticleLayer count={56} width={8.5} height={4.8} zMin={-0.4} zMax={2.8} size={0.052} color="#ff9fbd" opacity={0.42} speed={0.34} parallax={0.62} seed={1403} />
      <ParticleLayer count={88} width={13} height={6.8} zMin={-7} zMax={-1.2} size={0.032} color="#ffd1df" opacity={0.3} speed={0.18} parallax={0.3} seed={2459} />
      <ParticleLayer count={124} width={22} height={10} zMin={-18} zMax={-7} size={0.021} color="#9f91ff" opacity={0.22} speed={0.07} parallax={0.1} seed={3833} />
    </group>
  );
}

function CinematicLighting() {
  const key = useRef<DirectionalLight>(null);
  const target = useMemo(() => new Object3D(), []);
  const { scene } = useThree();

  React.useEffect(() => {
    target.position.set(0, 1.1, 0.34);
    scene.add(target);

    if (key.current) {
      key.current.shadow.camera.left = -3.2;
      key.current.shadow.camera.right = 3.2;
      key.current.shadow.camera.top = 3.8;
      key.current.shadow.camera.bottom = -1.25;
      key.current.shadow.camera.near = 2.2;
      key.current.shadow.camera.far = 10;
      key.current.shadow.camera.updateProjectionMatrix();
    }

    return () => {
      scene.remove(target);
    };
  }, [scene, target]);

  return (
    <>
      <ambientLight intensity={0.28} color="#29183d" />
      <hemisphereLight color="#d7c8ff" groundColor="#12071c" intensity={0.78} />
      <directionalLight
        ref={key}
        target={target}
        position={[-2.85, 4.75, 4.2]}
        color="#ffd8c8"
        intensity={2.55}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.00012}
        shadow-normalBias={0.028}
        shadow-radius={4}
      />
      <directionalLight
        target={target}
        position={[3.6, 2.35, 3.5]}
        color="#c8bcff"
        intensity={0.88}
      />
      <directionalLight
        target={target}
        position={[0, 2.55, -4.1]}
        color="#ff6fae"
        intensity={1.8}
      />
      <directionalLight
        target={target}
        position={[0, 1.2, 5.4]}
        color="#ffd6e8"
        intensity={0.22}
      />
    </>
  );
}

function SceneContent() {
  return (
    <>
      {/* Fondo gradual y atmósfera */}
      <color attach="background" args={['#0a0519']} />
      <fog attach="fog" args={['#0a0519', 9, 23]} />
      
       <CinematicLighting />
      
      <LayeredParticles />

      <group position={[0, -0.05, 0]}>
        <Suspense fallback={null}>
          <AranxitaModel />
          <FranModel />
        </Suspense>
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#12071f" roughness={0.96} metalness={0.02} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.548, 0.25]}>
        <circleGeometry args={[2.8, 64]} />
        <meshBasicMaterial color="#241034" transparent opacity={0.28} depthWrite={false} />
      </mesh>
      <ContactShadows
        position={[0, -0.512, 0.34]}
        opacity={0.5}
        scale={[4.35, 2.35]}
        blur={2.45}
        far={2.25}
        resolution={256}
        frames={1}
        color="#08030f"
      />
    </>
  );
}

export default function RomanticScene() {
  return (
    <div className="fixed inset-0 w-full h-full" style={{backgroundColor: '#0a0519'}}>
      <Canvas
        shadows="soft"
        dpr={[1, 1.35]}
        gl={{
          antialias: false,
          toneMapping: ACESFilmicToneMapping,
          toneMappingExposure: 1.08,
          stencil: false,
          depth: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
        camera={{ position: [0, 1.82, 6.85], fov: 36, near: 0.1, far: 45 }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = SRGBColorSpace;
          gl.shadowMap.type = PCFSoftShadowMap;
          gl.setClearColor('#0a0519', 1);
        }}
      >
        <Suspense fallback={null}>
          <CompositionRig />
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
