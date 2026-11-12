import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { SceneCanvas } from './components/SceneCanvas';
import { MinimalistDesk } from './models/MinimalistDesk';
import type { FinishOption, FurnitureConfig } from './types/furniture';

const FINISH_OPTIONS: FinishOption[] = [
  { id: 'oak', name: 'Natural Oak', color: '#b58d5c', roughness: 0.72, metalness: 0.04 },
  { id: 'walnut', name: 'Dark Walnut', color: '#4e3529', roughness: 0.68, metalness: 0.04 },
  { id: 'white', name: 'Warm Chalk', color: '#dcdad3', roughness: 0.55, metalness: 0.02 },
  { id: 'black', name: 'Charcoal Black', color: '#242424', roughness: 0.55, metalness: 0.08 },
];

export function App() {
  const [config, setConfig] = useState<FurnitureConfig>({
    finish: FINISH_OPTIONS[0],
    width: 1.2,
    depth: 0.6,
    height: 0.75,
  });

  // Kalkulasi harga dinamis berdasarkan panjang meja
  const calculatedPrice = 1850000 + Math.round((config.width - 1.2) * 10) * 75000;

  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 antialiased">
      <Navbar />

      <main className="grid flex-1 grid-cols-1 lg:grid-cols-[440px_1fr]">
        {/* Panel Kiri: Info Produk & Kustomisasi */}
        <section className="flex flex-col justify-center gap-6 border-t border-neutral-200 p-8 lg:border-t-0 lg:border-r lg:p-12">
          <div className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
            KOLEKSI 2026 // MODULAR
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900">
              LACKBERG DESK 01
            </h1>
            <p className="text-sm leading-relaxed text-neutral-600">
              Meja kerja minimalis bergaya Skandinavia dengan konstruksi presisi. 
              Klik pada laci meja di tampilan 3D untuk membuka atau menutup kompartemen penyimpanan.
            </p>
          </div>

          <div className="border-b border-neutral-200 pb-5 text-2xl font-bold tracking-tight">
            Rp {calculatedPrice.toLocaleString('id-ID')}
          </div>

          {/* Kontrol Pilihan Material / Warna */}
          <div className="flex flex-col gap-3">
            <label className="text-xs tracking-wider text-neutral-500 uppercase">
              FINISHING: <strong className="font-semibold text-neutral-900">{config.finish.name}</strong>
            </label>
            <div className="flex gap-3.5">
              {FINISH_OPTIONS.map((item) => {
                const isActive = config.finish.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setConfig({ ...config, finish: item })}
                    title={item.name}
                    style={{ backgroundColor: item.color }}
                    className={`h-8 w-8 cursor-pointer rounded-full border border-neutral-300 transition-transform ${
                      isActive ? 'scale-105 ring-2 ring-neutral-900 ring-offset-3' : 'hover:scale-105'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Kontrol Dimensi (Panjang Meja) */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-xs tracking-wider text-neutral-500 uppercase">
              <span>PANJANG MEJA</span>
              <strong className="font-semibold text-neutral-900">
                {Math.round(config.width * 100)} cm
              </strong>
            </div>
            <input
              type="range"
              min={0.9}
              max={1.8}
              step={0.1}
              value={config.width}
              onChange={(e) => setConfig({ ...config, width: parseFloat(e.target.value) })}
              className="w-full cursor-pointer accent-neutral-900"
            />
          </div>

          {/* Kontrol Kedalaman Meja */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-xs tracking-wider text-neutral-500 uppercase">
              <span>KEDALAMAN (LEBAR)</span>
              <strong className="font-semibold text-neutral-900">
                {Math.round(config.depth * 100)} cm
              </strong>
            </div>
            <input
              type="range"
              min={0.5}
              max={0.8}
              step={0.05}
              value={config.depth}
              onChange={(e) => setConfig({ ...config, depth: parseFloat(e.target.value) })}
              className="w-full cursor-pointer accent-neutral-900"
            />
          </div>

          <div className="pt-2">
            <button className="w-full cursor-pointer bg-neutral-900 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-neutral-800">
              Pesan Konfigurasi Ini
            </button>
          </div>
        </section>

        {/* Panel Kanan: Viewport 3D */}
        <section className="order-first h-[420px] lg:order-last lg:h-auto lg:min-h-[600px]">
          <SceneCanvas config={config}>
            <MinimalistDesk config={config} />
          </SceneCanvas>
        </section>
      </main>
    </div>
  );
}

export default App;
