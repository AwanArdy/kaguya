import { RoundedBox } from '@react-three/drei';
import type { FurnitureConfig } from '../types/furniture';

interface BookshelfGridProps {
  config: FurnitureConfig;
}

export function BookshelfGrid({ config }: BookshelfGridProps) {
  const { width, depth, height, finish } = config;

  // Rangka luar tebal khas KALLAX (3.2cm) & sekat dalam tipis (1.6cm)
  const outerThick = 0.032;
  const innerThick = 0.016;
  const cols = 2;
  const rows = 4;

  const innerWidth = width - outerThick * 2;
  const innerHeight = height - outerThick * 2;
  const cellW = (innerWidth - innerThick * (cols - 1)) / cols;
  const cellH = (innerHeight - innerThick * (rows - 1)) / rows;

  // Koordinat pusat tiap kompartemen
  const getColX = (colIdx: number) =>
    -innerWidth / 2 + cellW / 2 + colIdx * (cellW + innerThick);
  const getRowY = (rowIdx: number) =>
    outerThick + cellH / 2 + rowIdx * (cellH + innerThick);

  return (
    <group>
      {/* 1. BINGKAI LUAR (Atas, Bawah, Kiri, Kanan) */}
      {/* Atas & Bawah */}
      {[height - outerThick / 2, outerThick / 2].map((yPos, i) => (
        <RoundedBox
          key={`frame-h-${i}`}
          args={[width, outerThick, depth]}
          radius={0.003}
          smoothness={3}
          position={[0, yPos, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color={finish.color}
            roughness={finish.roughness}
            metalness={finish.metalness}
          />
        </RoundedBox>
      ))}

      {/* Kiri & Kanan */}
      {[-width / 2 + outerThick / 2, width / 2 - outerThick / 2].map((xPos, i) => (
        <RoundedBox
          key={`frame-v-${i}`}
          args={[outerThick, height - outerThick * 2, depth]}
          radius={0.003}
          smoothness={3}
          position={[xPos, height / 2, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color={finish.color}
            roughness={finish.roughness}
            metalness={finish.metalness}
          />
        </RoundedBox>
      ))}

      {/* 2. SEKAT VERTIKAL TENGAH */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[innerThick, innerHeight, depth - 0.004]} />
        <meshStandardMaterial
          color={finish.color}
          roughness={finish.roughness}
          metalness={finish.metalness}
        />
      </mesh>

      {/* 3. TIGA RAK HORIZONTAL PEMBAGI 4 BARIS */}
      {[1, 2, 3].map((rowDivider) => {
        const yPos = outerThick + rowDivider * cellH + (rowDivider - 0.5) * innerThick;
        return (
          <mesh key={`shelf-${rowDivider}`} position={[0, yPos, 0]} castShadow receiveShadow>
            <boxGeometry args={[innerWidth, innerThick, depth - 0.004]} />
            <meshStandardMaterial
              color={finish.color}
              roughness={finish.roughness}
              metalness={finish.metalness}
            />
          </mesh>
        );
      })}

      {/* 4. DEKORASI KOMPARTEMEN */}
      {/* Kotak Penyimpanan Kain (Baris 0 Kiri & Baris 1 Kanan) */}
      {[
        { col: 0, row: 0, color: '#5c636a' },
        { col: 1, row: 1, color: '#8c7a6b' },
      ].map((box, idx) => (
        <group
          key={`box-${idx}`}
          position={[getColX(box.col), getRowY(box.row) - cellH / 2 + (cellH * 0.86) / 2, 0.01]}
        >
          <RoundedBox
            args={[cellW * 0.9, cellH * 0.86, depth * 0.85]}
            radius={0.006}
            smoothness={2}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color={box.color} roughness={0.9} />
          </RoundedBox>
          {/* Lubang Handle Logam Kecil */}
          <mesh position={[0, 0.03, (depth * 0.85) / 2 + 0.002]}>
            <torusGeometry args={[0.018, 0.003, 12, 24]} />
            <meshStandardMaterial color="#d4d4d4" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Deretan Buku Berdiri (Baris 2 Kiri) */}
      <group position={[getColX(0) - cellW * 0.28, getRowY(2) - cellH / 2, 0.02]}>
        {[
          { w: 0.026, h: 0.22, color: '#2b3a4a', offset: 0 },
          { w: 0.032, h: 0.24, color: '#a64b3a', offset: 0.031 },
          { w: 0.022, h: 0.20, color: '#d9cbb8', offset: 0.06 },
          { w: 0.028, h: 0.23, color: '#3b4d3b', offset: 0.087 },
        ].map((book, i) => (
          <mesh
            key={`book-${i}`}
            position={[book.offset, book.h / 2, 0]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[book.w, book.h, depth * 0.62]} />
            <meshStandardMaterial color={book.color} roughness={0.75} />
          </mesh>
        ))}
      </group>

      {/* Vas Keramik & Tanaman Hias (Baris 3 Kanan) */}
      <group position={[getColX(1), getRowY(3) - cellH / 2, 0.02]}>
        {/* Vas Keramik */}
        <mesh position={[-0.04, 0.065, 0]} castShadow>
          <cylinderGeometry args={[0.028, 0.042, 0.13, 24]} />
          <meshStandardMaterial color="#e8e4dc" roughness={0.45} />
        </mesh>
        {/* Pot Tanaman Sukulen */}
        <mesh position={[0.055, 0.035, 0.02]} castShadow>
          <cylinderGeometry args={[0.036, 0.028, 0.07, 20]} />
          <meshStandardMaterial color="#b86b4b" roughness={0.8} />
        </mesh>
        <mesh position={[0.055, 0.085, 0.02]} castShadow>
          <sphereGeometry args={[0.042, 16, 16]} />
          <meshStandardMaterial color="#4a6b48" roughness={0.85} />
        </mesh>
      </group>

      {/* Tumpukan Buku Horizontal + Dekorasi Bola Batu (Baris 1 Kiri) */}
      <group position={[getColX(0), getRowY(1) - cellH / 2, 0.02]}>
        <mesh position={[0, 0.015, 0]} castShadow>
          <boxGeometry args={[0.19, 0.03, 0.14]} />
          <meshStandardMaterial color="#d6cfc2" roughness={0.7} />
        </mesh>
        <mesh position={[0.005, 0.042, 0]} castShadow>
          <boxGeometry args={[0.17, 0.024, 0.13]} />
          <meshStandardMaterial color="#2f353b" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.082, 0]} castShadow>
          <sphereGeometry args={[0.028, 20, 20]} />
          <meshStandardMaterial color="#8c857b" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}
