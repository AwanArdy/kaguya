import { RoundedBox } from '@react-three/drei';
import type { FurnitureConfig } from '../types/furniture';

interface DiningTableProps {
  config: FurnitureConfig;
}

export function DiningTable({ config }: DiningTableProps) {
  const { width, depth, height, finish } = config;

  // Proporsi konstruksi meja makan (papan tebal & kaki balok kokoh)
  const topThickness = 0.036;
  const apronHeight = 0.075;
  const panelThickness = 0.022;
  const legSize = 0.052;
  const legHeight = height - topThickness;

  const topY = height - topThickness / 2;
  const apronY = height - topThickness - apronHeight / 2;

  const legInsetX = width / 2 - 0.075;
  const legInsetZ = depth / 2 - 0.075;

  const legPositions: Array<[number, number, number]> = [
    [-legInsetX, legHeight / 2, -legInsetZ],
    [ legInsetX, legHeight / 2, -legInsetZ],
    [-legInsetX, legHeight / 2,  legInsetZ],
    [ legInsetX, legHeight / 2,  legInsetZ],
  ];

  return (
    <group>
      {/* 1. DAUN MEJA UTAMA */}
      <RoundedBox
        args={[width, topThickness, depth]}
        radius={0.005}
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

      {/* 2. RANGKA APRON KELILING (Penahan lengkung bentangan panjang) */}
      {/* Apron Depan & Belakang */}
      {[-legInsetZ, legInsetZ].map((zPos, i) => (
        <mesh key={`apron-z-${i}`} position={[0, apronY, zPos]} castShadow receiveShadow>
          <boxGeometry args={[width - 0.16, apronHeight, panelThickness]} />
          <meshStandardMaterial
            color={finish.color}
            roughness={finish.roughness}
            metalness={finish.metalness}
          />
        </mesh>
      ))}

      {/* Apron Samping Kiri & Kanan */}
      {[-legInsetX, legInsetX].map((xPos, i) => (
        <mesh key={`apron-x-${i}`} position={[xPos, apronY, 0]} castShadow receiveShadow>
          <boxGeometry args={[panelThickness, apronHeight, depth - 0.16]} />
          <meshStandardMaterial
            color={finish.color}
            roughness={finish.roughness}
            metalness={finish.metalness}
          />
        </mesh>
      ))}

      {/* 3. EMPAT KAKI BALOK TEGAK LURUS + BANTALAN LANTAI */}
      {legPositions.map((pos, idx) => (
        <group key={idx} position={pos}>
          <RoundedBox
            args={[legSize, legHeight, legSize]}
            radius={0.003}
            smoothness={2}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color={finish.color}
              roughness={finish.roughness}
              metalness={finish.metalness}
            />
          </RoundedBox>

          {/* Bantalan karet anti-gores */}
          <mesh position={[0, -legHeight / 2 + 0.003, 0]}>
            <boxGeometry args={[legSize - 0.004, 0.006, legSize - 0.004]} />
            <meshStandardMaterial color="#181818" roughness={0.9} metalness={0.1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
