import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from 'three';
import type { FurnitureConfig } from "../types/furniture";

interface MinimalistDeskProps {
  config: FurnitureConfig
}

export function MinimalistDesk({ config }: MinimalistDeskProps) {
  const { width, depth, height, finish } = config;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const drawerRef = useRef<THREE.Group>(null);

  const topThickness = 0.028;
  const apronHeight = 0.11;
  const panelThickness = 0.018;
  const legHeight = height - topThickness / 2;
  const topY = height - topThickness / 2;
  const apronY = height - topThickness - apronHeight / 2;

  const drawerSectionWidth = 0.38;
  const drawerSectionX = width / 2 - drawerSectionWidth / 2 - 0.03;

  const legInsetX = width / 2 - 0.055;
  const legInsetZ = depth / 2 - 0.055;
  const legPositions: Array<[number, number, number]> = [
    [-legInsetX, legHeight / 2, -legInsetZ],
    [ legInsetX, legHeight / 2, -legInsetZ],
    [-legInsetX, legHeight / 2,  legInsetZ],
    [ legInsetX, legHeight / 2,  legInsetZ],
  ];

  useFrame((_, delta) => {
    if (!drawerRef.current) return;
    const targetZ = drawerOpen ? 0.24 : 0;
    drawerRef.current.position.z =  THREE.MathUtils.lerp(
      drawerRef.current.position.z,
      targetZ,
      1 - Math.exp(-10 * delta)
    );
  });

  if (typeof document !== 'undefined') {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }

  return (
    <group>
      {/* daun meja */}
      <RoundedBox
        args={[width, topThickness, depth]}
        radius={0.004}
        smoothness={4}
        position={[0, topY, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={finish.color}
          roughness={finish.roughness}
          metalness={finish.metalness}
        />
      </RoundedBox>

      {/* rangka penyangga bawah */}
      {/* panel belakang */}
      <mesh
        position={[0, apronY, -depth / 2 + 0.04]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[width - 0.12, apronHeight, panelThickness]} />
        <meshStandardMaterial
          color={finish.color}
          roughness={finish.roughness}
          metalness={finish.metalness}
        />
      </mesh>

      {/* panel samping kiri */}
      <mesh
        position={[-width / 2 + 0.06, apronY, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[panelThickness, apronHeight, depth - 0.1]} />
        <meshStandardMaterial
          color={finish.color}
          roughness={finish.roughness}
          metalness={finish.metalness}
        />
      </mesh>

      {/* panel samping kanan */}
      <mesh
        position={[width / 2 - 0.06, apronY, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[panelThickness, apronHeight, depth - 0.1]} />
        <meshStandardMaterial
          color={finish.color}
          roughness={finish.roughness}
          metalness={finish.metalness}
        />
      </mesh>

      {/* sekat kiri unit laci */}
      <mesh
        position={[drawerSectionX - drawerSectionWidth / 2, apronY, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[panelThickness, apronHeight, depth - 0.1]} />
        <meshStandardMaterial
          color={finish.color}
          roughness={finish.roughness}
          metalness={finish.metalness}
        />
      </mesh>

      {/* alas bawah kotak laci */}
      <mesh
        position={[drawerSectionX, apronY - apronHeight / 2 + panelThickness / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[drawerSectionWidth, panelThickness, depth - 0.1]} />
        <meshStandardMaterial
          color={finish.color}
          roughness={finish.roughness}
          metalness={finish.metalness}
        />
      </mesh>

      {/* laci interaktif */}
      <group
        ref={drawerRef}
        position={[drawerSectionX, apronY + 0.004, 0]}
        onClick={(e) => {
          e.stopPropagation();
          setDrawerOpen((prev) => !prev);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        {/* muka laci */}
        <RoundedBox
          args={[drawerSectionWidth - 0.022, apronHeight - 0.022, panelThickness]}
          radius={0.003}
          smoothness={3}
          position={[0, 0, depth / 2 - 0.04]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color={finish.color}
            roughness={finish.roughness}
            metalness={finish.metalness}
          />
        </RoundedBox>

        {/* handle logam */}
        <mesh
          position={[0, 0.01, depth / 2 - 0.025]}
          castShadow
        >
          <boxGeometry args={[0.09, 0.01, 0.018]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.35} metalness={0.8} />
        </mesh>

        {/* kotak dalam laci */}
        <mesh position={[0, -0.01, 0.02]} castShadow receiveShadow>
          <boxGeometry args={[drawerSectionWidth - 0.045, apronHeight - 0.04, depth - 0.15]} />
          <meshStandardMaterial color="#e3d2b4" roughness={0.8} metalness={0} />
        </mesh>
      </group>

      {/* kaki meja */}
      {legPositions.map((pos, index) => (
        <group key={index} position={pos}>
          {/* batang kaki kayu tapered */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.024, 0.017, legHeight, 24]} />
            <meshStandardMaterial
              color={finish.color}
              roughness={finish.roughness}
              metalness={finish.metalness}
            />
          </mesh>

          {/* bantalan karet hitam di ujung bawah kaki */}
          <mesh position={[0, -legHeight / 2 + 0.004, 0]}>
            <cylinderGeometry args={[0.0175, 0.0175, 0.008, 24]} />
            <meshStandardMaterial color="#181818" roughness={0.9} metalness={0.1} />
          </mesh>
        </group>
      ))}
      </group>
  );
}
