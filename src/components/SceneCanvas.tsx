import { Suspense, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import type { FurnitureConfig } from '../types/furniture';

interface SceneCanvasProps {
  config: FurnitureConfig;
  children?: ReactNode;
}

export function SceneCanvas({ children }: SceneCanvasProps) {
  return (
    <div className="relative h-full w-full bg-[#e5e4e0]">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [1.65, 1.25, 2.05], fov: 38 }}
        gl={{ toneMappingExposure: 0.9 }}
      >
        <color attach="background" args={['#e5e4e0']} />

        {/* Pencahayaan studio hangat dan terkontrol */}
        <ambientLight intensity={0.25} />
        <directionalLight
          position={[4, 7, 5]}
          intensity={0.85}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0005}
        />

        <Suspense fallback={null}>
          <Environment preset="studio" environmentIntensity={0.4} />

          <group position={[0, -0.38, 0]}>
            {children}
            <ContactShadows
              position={[0, 0, 0]}
              opacity={0.5}
              scale={4.5}
              blur={1.8}
              far={2}
            />
          </group>
        </Suspense>

        <OrbitControls
          makeDefault
          minPolarAngle={0.2}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minDistance={1.1}
          maxDistance={4.2}
          enablePan={false}
        />
      </Canvas>

      <div className="pointer-events-none absolute right-6 bottom-5 rounded bg-neutral-900/10 px-3 py-1.5 text-xs font-medium text-neutral-700 backdrop-blur-xs">
        Geser untuk memutar • Scroll untuk zoom
      </div>
    </div>
  );
}
