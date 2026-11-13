import { RoundedBox } from '@react-three/drei';
import type { FurnitureConfig } from '../types/furniture';

interface CoffeeTableProps {
  config: FurnitureConfig;
}

export function CoffeeTable({ config }: CoffeeTableProps) {
  const { width, depth, height, finish } = config;

  // Proporsi meja tamu 2 tingkat
  const topThickness = 0.026;
  const shelfThickness = 0.02;
  const legHeight = height - topThickness;
  const topY = height - topThickness / 2;
  const shelfY = height * 0.36; // Posisi rak bawah di 36% tinggi meja

  const legInsetX = width / 2 - 0.055;
  const legInsetZ = depth / 2 - 0.055;

  const legPositions: Array<[number, number, number]> = [
    [-legInsetX, legHeight / 2, -legInsetZ],
    [ legInsetX, legHeight / 2, -legInsetZ],
    [-legInsetX, legHeight / 2,  legInsetZ],
    [ legInsetX, legHeight / 2,  legInsetZ],
  ];

  return (
    <group>
      {/* 1. PAPAN ATAS UTAMA */}
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

      {/* 2. RAK PENYIMPANAN BAWAH (Majalah / Remote) */}
      <RoundedBox
        args={[width - 0.11, shelfThickness, depth - 0.11]}
        radius={0.003}
        smoothness={3}
        position={[0, shelfY, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={finish.color}
          roughness={finish.roughness}
          metalness={finish.metalness}
        />
      </RoundedBox>

      {/* 3. EMPAT KAKI SILINDER TEGAK + BANTALAN LANTAI */}
      {legPositions.map((pos, idx) => (
        <group key={idx} position={pos}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.022, 0.018, legHeight, 24]} />
            <meshStandardMaterial
              color={finish.color}
              roughness={finish.roughness}
              metalness={finish.metalness}
            />
          </mesh>

          <mesh position={[0, -legHeight / 2 + 0.003, 0]}>
            <cylinderGeometry args={[0.0185, 0.0185, 0.006, 24]} />
            <meshStandardMaterial color="#181818" roughness={0.9} metalness={0.1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
