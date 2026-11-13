import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import type { FurnitureConfig } from '../types/furniture';

interface SideboardProps {
  config: FurnitureConfig;
}

export function Sideboard({ config }: SideboardProps) {
  const { width, depth, height, finish } = config;
  const [openDoors, setOpenDoors] = useState<[boolean, boolean, boolean]>([false, false, false]);
  const doorRefs = useRef<Array<THREE.Group | null>>([]);

  const plinthHeight = 0.07; // Kaki plinth rata lantai khas seri MALM
  const panelThick = 0.02;
  const bodyHeight = height - plinthHeight;
  const bodyCenterY = plinthHeight + bodyHeight / 2;

  const innerW = width - panelThick * 2;
  const doorW = (innerW - 0.008) / 3;
  const doorH = bodyHeight - panelThick * 2 - 0.006;

  useFrame((_, delta) => {
    const speed = 1 - Math.exp(-10 * delta);
    openDoors.forEach((isOpen, idx) => {
      const ref = doorRefs.current[idx];
      if (!ref) return;
      const targetAngle = isOpen ? (idx === 2 ? Math.PI * 0.46 : -Math.PI * 0.46) : 0;
      ref.rotation.y = THREE.MathUtils.lerp(ref.rotation.y, targetAngle, speed);
    });
  });

  const toggleDoor = (index: number) => {
    setOpenDoors((prev) => {
      const next: [boolean, boolean, boolean] = [...prev] as [boolean, boolean, boolean];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <group>
      {/* 1. ALAS PLINTH BAWAH */}
      <mesh position={[0, plinthHeight / 2, -0.01]} castShadow receiveShadow>
        <boxGeometry args={[width - 0.04, plinthHeight, depth - 0.04]} />
        <meshStandardMaterial color={finish.color} roughness={0.8} />
      </mesh>

      {/* 2. BINGKAI KABINET UTAMA */}
      {/* Atas & Bawah */}
      {[height - panelThick / 2, plinthHeight + panelThick / 2].map((yPos, i) => (
        <RoundedBox
          key={`sb-tb-${i}`}
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
        <mesh key={`sb-side-${i}`} position={[xPos, bodyCenterY, 0]} castShadow receiveShadow>
          <boxGeometry args={[panelThick, bodyHeight - panelThick * 2, depth]} />
          <meshStandardMaterial
            color={finish.color}
            roughness={finish.roughness}
            metalness={finish.metalness}
          />
        </mesh>
      ))}

      {/* Sekat Dalam & Rak Horizontal Dalam */}
      {[-innerW / 6, innerW / 6].map((xPos, i) => (
        <mesh key={`sb-div-${i}`} position={[xPos, bodyCenterY, -0.01]} receiveShadow>
          <boxGeometry args={[0.016, bodyHeight - panelThick * 2, depth - 0.03]} />
          <meshStandardMaterial color={finish.color} roughness={0.8} />
        </mesh>
      ))}
      <mesh position={[0, bodyCenterY, -0.01]} receiveShadow>
        <boxGeometry args={[innerW, 0.016, depth - 0.04]} />
        <meshStandardMaterial color={finish.color} roughness={0.8} />
      </mesh>
      <mesh position={[0, bodyCenterY, -depth / 2 + 0.006]} receiveShadow>
        <boxGeometry args={[innerW, bodyHeight - panelThick * 2, 0.01]} />
        <meshStandardMaterial color={finish.color} roughness={0.85} />
      </mesh>

      {/* 3. TIGA PINTU PUSH-TO-OPEN (Klik masing-masing pintu) */}
      {[0, 1, 2].map((idx) => {
        const isRightHinge = idx === 2;
        const slotLeftX = -innerW / 2 + idx * (doorW + 0.004);
        const hingeX = isRightHinge ? slotLeftX + doorW : slotLeftX;
        const meshOffsetX = isRightHinge ? -doorW / 2 : doorW / 2;

        return (
          <group
            key={`sb-door-${idx}`}
            ref={(el) => {
              doorRefs.current[idx] = el;
            }}
            position={[hingeX, bodyCenterY, depth / 2 - 0.008]}
            onClick={(e) => {
              e.stopPropagation();
              toggleDoor(idx);
            }}
          >
            <RoundedBox
              args={[doorW, doorH, 0.018]}
              radius={0.002}
              smoothness={2}
              position={[meshOffsetX, 0, 0]}
              castShadow
              receiveShadow
            >
              <meshStandardMaterial
                color={finish.color}
                roughness={finish.roughness}
                metalness={finish.metalness}
              />
            </RoundedBox>
          </group>
        );
      })}

      {/* 4. DEKORASI DI ATAS CREDENZA: BINGKAI LUKISAN, LAMPU MEJA, & MANGKUK */}
      {/* Bingkai Lukisan Minimalis Bersandar */}
      <group position={[-width * 0.22, height + 0.19, -depth * 0.22]} rotation={[-0.12, 0.08, 0]}>
        <RoundedBox args={[0.32, 0.4, 0.02]} radius={0.002} smoothness={2} castShadow>
          <meshStandardMaterial color="#1f1f1f" roughness={0.5} />
        </RoundedBox>
        {/* Kanvas Putih */}
        <mesh position={[0, 0, 0.011]}>
          <planeGeometry args={[0.29, 0.37]} />
          <meshStandardMaterial color="#f2efe9" roughness={0.9} />
        </mesh>
        {/* Bentuk Geometris Abstrak */}
        <mesh position={[0, -0.02, 0.012]}>
          <circleGeometry args={[0.075, 32]} />
          <meshStandardMaterial color="#b87352" roughness={0.85} />
        </mesh>
      </group>

      {/* Lampu Meja Minimalis di Sisi Kanan */}
      <group position={[width * 0.3, height, -0.02]}>
        {/* Kaki Lampu Keramik */}
        <mesh position={[0, 0.075, 0]} castShadow>
          <cylinderGeometry args={[0.032, 0.055, 0.15, 24]} />
          <meshStandardMaterial color="#3d444b" roughness={0.6} />
        </mesh>
        {/* Kap Lampu Kain */}
        <mesh position={[0, 0.21, 0]} castShadow>
          <cylinderGeometry args={[0.075, 0.115, 0.14, 24]} />
          <meshStandardMaterial color="#ebe6dc" roughness={0.9} />
        </mesh>
      </group>

      {/* Mangkuk Keramik di Tengah */}
      <mesh position={[0.06, height + 0.028, 0.04]} castShadow>
        <cylinderGeometry args={[0.095, 0.055, 0.056, 28]} />
        <meshStandardMaterial color="#cfc9be" roughness={0.45} />
      </mesh>
    </group>
  );
}
