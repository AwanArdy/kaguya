import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import type { FurnitureConfig } from '../types/furniture';

interface TvConsoleProps {
  config: FurnitureConfig;
}

export function TvConsole({ config }: TvConsoleProps) {
  const { width, depth, height, finish } = config;
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const leftPivotRef = useRef<THREE.Group>(null);
  const rightPivotRef = useRef<THREE.Group>(null);

  const legHeight = 0.14;
  const bodyHeight = height - legHeight;
  const panelThick = 0.02;
  const bodyCenterY = legHeight + bodyHeight / 2;

  // Pembagian lebar: Kabinet Kiri (30%), Rak Media Tengah (40%), Kabinet Kanan (30%)
  const sideCabW = width * 0.3;
  const centerOpenW = width - sideCabW * 2;
  const doorW = sideCabW - panelThick * 1.2;
  const doorH = bodyHeight - panelThick * 2 - 0.006;

  // Animasi engsel buka-tutup pintu kabinet
  useFrame((_, delta) => {
    const speed = 1 - Math.exp(-10 * delta);
    if (leftPivotRef.current) {
      leftPivotRef.current.rotation.y = THREE.MathUtils.lerp(
        leftPivotRef.current.rotation.y,
        leftOpen ? -Math.PI * 0.48 : 0,
        speed
      );
    }
    if (rightPivotRef.current) {
      rightPivotRef.current.rotation.y = THREE.MathUtils.lerp(
        rightPivotRef.current.rotation.y,
        rightOpen ? Math.PI * 0.48 : 0,
        speed
      );
    }
  });

  // Ukuran TV proporsional terhadap lebar meja
  const tvWidth = Math.min(width * 0.78, 1.32);
  const tvHeight = tvWidth * 0.56;
  const tvBaseY = height;

  return (
    <group>
      {/* 1. BADAN UTAMA KONSOL TV */}
      {/* Top & Bottom Panel */}
      {[height - panelThick / 2, legHeight + panelThick / 2].map((yPos, i) => (
        <RoundedBox
          key={`tv-tb-${i}`}
          args={[width, panelThick, depth]}
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

      {/* Dinding Samping Kiri & Kanan */}
      {[-width / 2 + panelThick / 2, width / 2 - panelThick / 2].map((xPos, i) => (
        <mesh key={`tv-side-${i}`} position={[xPos, bodyCenterY, 0]} castShadow receiveShadow>
          <boxGeometry args={[panelThick, bodyHeight - panelThick * 2, depth]} />
          <meshStandardMaterial
            color={finish.color}
            roughness={finish.roughness}
            metalness={finish.metalness}
          />
        </mesh>
      ))}

      {/* Sekat Vertikal Pemisah Rak Tengah */}
      {[-centerOpenW / 2, centerOpenW / 2].map((xPos, i) => (
        <mesh key={`tv-div-${i}`} position={[xPos, bodyCenterY, 0]} castShadow receiveShadow>
          <boxGeometry args={[panelThick * 0.85, bodyHeight - panelThick * 2, depth - 0.01]} />
          <meshStandardMaterial
            color={finish.color}
            roughness={finish.roughness}
            metalness={finish.metalness}
          />
        </mesh>
      ))}

      {/* Panel Belakang & Rak Kaca/Kayu Tengah */}
      <mesh position={[0, bodyCenterY, -depth / 2 + 0.006]} receiveShadow>
        <boxGeometry args={[width - panelThick * 2, bodyHeight - panelThick * 2, 0.01]} />
        <meshStandardMaterial color={finish.color} roughness={0.85} />
      </mesh>
      <mesh position={[0, bodyCenterY, 0]} castShadow receiveShadow>
        <boxGeometry args={[centerOpenW - panelThick, 0.014, depth - 0.03]} />
        <meshStandardMaterial
          color={finish.color}
          roughness={finish.roughness}
          metalness={finish.metalness}
        />
      </mesh>

      {/* 2. PINTU KABINET INTERAKTIF (Klik untuk buka) */}
      {/* Pintu Kiri (Engsel di sisi kiri) */}
      <group
        ref={leftPivotRef}
        position={[-width / 2 + panelThick, bodyCenterY, depth / 2 - 0.008]}
        onClick={(e) => {
          e.stopPropagation();
          setLeftOpen((p) => !p);
        }}
      >
        <RoundedBox
          args={[doorW, doorH, 0.016]}
          radius={0.002}
          smoothness={2}
          position={[doorW / 2, 0, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color={finish.color}
            roughness={finish.roughness}
            metalness={finish.metalness}
          />
        </RoundedBox>
        {/* Handle Minimalis */}
        <mesh position={[doorW - 0.025, 0.04, 0.012]}>
          <boxGeometry args={[0.008, 0.06, 0.012]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Pintu Kanan (Engsel di sisi kanan) */}
      <group
        ref={rightPivotRef}
        position={[width / 2 - panelThick, bodyCenterY, depth / 2 - 0.008]}
        onClick={(e) => {
          e.stopPropagation();
          setRightOpen((p) => !p);
        }}
      >
        <RoundedBox
          args={[doorW, doorH, 0.016]}
          radius={0.002}
          smoothness={2}
          position={[-doorW / 2, 0, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color={finish.color}
            roughness={finish.roughness}
            metalness={finish.metalness}
          />
        </RoundedBox>
        <mesh position={[-doorW + 0.025, 0.04, 0.012]}>
          <boxGeometry args={[0.008, 0.06, 0.012]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* 3. EMPAT KAKI LOGAM HITAM RAMPING */}
      {[
        [-width / 2 + 0.06, legHeight / 2, -depth / 2 + 0.05],
        [ width / 2 - 0.06, legHeight / 2, -depth / 2 + 0.05],
        [-width / 2 + 0.06, legHeight / 2,  depth / 2 - 0.05],
        [ width / 2 - 0.06, legHeight / 2,  depth / 2 - 0.05],
      ].map(([x, y, z], i) => (
        <mesh key={`tv-leg-${i}`} position={[x, y, z]} castShadow>
          <cylinderGeometry args={[0.014, 0.011, legHeight, 16]} />
          <meshStandardMaterial color="#1e1e1e" metalness={0.75} roughness={0.35} />
        </mesh>
      ))}

      {/* 4. DEKORASI: SMART TV LAYAR DATAR + SOUNDBAR + MEDIA PLAYER */}
      {/* Smart TV di atas meja */}
      <group position={[0, tvBaseY, -0.04]}>
        {/* Dua Kaki Penyangga TV */}
        {[-tvWidth * 0.34, tvWidth * 0.34].map((xPos, i) => (
          <mesh key={`tv-stand-${i}`} position={[xPos, 0.03, 0.01]} castShadow>
            <boxGeometry args={[0.018, 0.06, 0.16]} />
            <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
        {/* Bezel & Bodi TV */}
        <RoundedBox
          args={[tvWidth, tvHeight, 0.022]}
          radius={0.003}
          smoothness={2}
          position={[0, 0.055 + tvHeight / 2, 0]}
          castShadow
        >
          <meshStandardMaterial color="#141414" roughness={0.4} metalness={0.5} />
        </RoundedBox>
        {/* Layar TV (Reflektif gelap elegan) */}
        <mesh position={[0, 0.055 + tvHeight / 2, 0.012]}>
          <planeGeometry args={[tvWidth - 0.018, tvHeight - 0.018]} />
          <meshStandardMaterial color="#0b0e14" roughness={0.12} metalness={0.85} />
        </mesh>
      </group>

      {/* Soundbar Ramping di depan TV */}
      <RoundedBox
        args={[Math.min(tvWidth * 0.65, 0.72), 0.042, 0.065]}
        radius={0.008}
        smoothness={3}
        position={[0, tvBaseY + 0.021, depth / 2 - 0.075]}
        castShadow
      >
        <meshStandardMaterial color="#232325" roughness={0.6} metalness={0.3} />
      </RoundedBox>

      {/* Media Player / Konsol di Rak Tengah Atas */}
      <group position={[0, bodyCenterY + 0.025, 0.02]}>
        <RoundedBox
          args={[Math.min(centerOpenW * 0.62, 0.32), 0.036, 0.21]}
          radius={0.004}
          smoothness={2}
          castShadow
        >
          <meshStandardMaterial color="#1c1c1e" roughness={0.35} metalness={0.6} />
        </RoundedBox>
        {/* Lampu Indikator LED Standby */}
        <mesh position={[-0.1, 0, 0.106]}>
          <sphereGeometry args={[0.0035, 12, 12]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={2}
          />
        </mesh>
      </group>

      {/* Set-Top Box / Router Mini di Rak Tengah Bawah */}
      <RoundedBox
        args={[Math.min(centerOpenW * 0.45, 0.22), 0.028, 0.16]}
        radius={0.003}
        smoothness={2}
        position={[0, legHeight + panelThick + 0.014, 0.02]}
        castShadow
      >
        <meshStandardMaterial color="#d8d6d0" roughness={0.5} metalness={0.1} />
      </RoundedBox>
    </group>
  );
}
