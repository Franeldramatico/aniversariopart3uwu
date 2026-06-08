'use client';

import {
  Color,
  LinearSRGBColorSpace,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  SRGBColorSpace,
  Texture,
} from 'three';

type CharacterMaterialOptions = {
  emissiveColor: string;
  emissiveIntensity: number;
  envMapIntensity: number;
};

const DEFAULT_ROUGHNESS = 0.72;
const MAX_METALNESS = 0.04;

function calibrateTexture(texture?: Texture | null) {
  if (!texture) return;
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = Math.min(texture.anisotropy || 1, 4);
  texture.needsUpdate = true;
}

function calibrateMaterial(material: MeshStandardMaterial, options: CharacterMaterialOptions) {
  if (material.userData.renderCalibrated) return;

  calibrateTexture(material.map);
  calibrateTexture(material.emissiveMap);

  material.roughness = Math.max(material.roughness ?? DEFAULT_ROUGHNESS, DEFAULT_ROUGHNESS);
  material.metalness = Math.min(material.metalness ?? 0, MAX_METALNESS);
  material.envMapIntensity = options.envMapIntensity;

  if (material.emissive) {
    material.emissive.copy(new Color(options.emissiveColor).convertSRGBToLinear());
    material.emissiveIntensity = options.emissiveIntensity;
  }

  if (material.normalMap) {
    material.normalScale.setScalar(Math.min(material.normalScale.x || 1, 0.72));
  }

  material.toneMapped = true;
  material.userData.renderCalibrated = true;
  material.needsUpdate = true;
}

export function calibrateCharacterModel(root: Object3D, options: CharacterMaterialOptions) {
  root.traverse((child) => {
    const mesh = child as Mesh;
    if (!mesh.isMesh) return;

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = true;

    if (mesh.geometry) {
      mesh.geometry.computeBoundingSphere();
      mesh.geometry.computeBoundingBox();
    }

    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    materials.forEach((material) => {
      if (!material || !(material as MeshStandardMaterial).isMeshStandardMaterial) return;
      calibrateMaterial(material as MeshStandardMaterial, options);
    });
  });
}

export function setLinearTextureColorSpace(texture?: Texture | null) {
  if (!texture) return;
  texture.colorSpace = LinearSRGBColorSpace;
  texture.needsUpdate = true;
}
