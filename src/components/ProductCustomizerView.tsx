import { useState } from 'react';
import { FINISH_OPTIONS } from '../data/catalog';
import { SceneCanvas } from './SceneCanvas';
// import { MinimalistDesk } from '../models/MinimalistDesk';
import type { FurnitureConfig, ProductItem } from '../types/furniture';
import { FurnitureModel } from '../models/FurnitureModel';

interface ProductCustomizerViewProps {
  product: ProductItem;
  onBack: () => void;
}

export function ProductCustomizerView({ product, onBack }: ProductCustomizerViewProps) {
  const [config, setConfig] = useState<FurnitureConfig>({
    finish: FINISH_OPTIONS[0],
    width: product.defaultDimensions.width,
    depth: product.defaultDimensions.depth,
    height: product.defaultDimensions.height,
  });

  const widthDiff = Math.round((config.width - product.defaultDimensions.width) * 10);
  const calculatedPrice = Math.max(product.basePrice + widthDiff * 75000, product.basePrice * 0.8);

  return (
    <main className="grid flex-1 grid-cols-1 lg:grid-cols-[440px_1fr]">
      {/* Panel Kiri: Info Produk & Kustomisasi */}
      <section className="flex flex-col justify-between gap-6 border-t border-neutral-300 p-8 lg:border-t-0 lg:border-r lg:p-10">
        <div className="space-y-6">
          <button
            onClick={onBack}
            className="inline-flex cursor-pointer items-center gap-2 text-xs font-bold tracking-wider text-neutral-600 uppercase transition-colors hover:text-neutral-900"
          >
            ← Kembali ke Katalog
          </button>

          <div className="space-y-2">
            <div className="text-xs font-bold tracking-widest text-neutral-500 uppercase">
              {product.code} // {product.categoryLabel}
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
              {product.name}
            </h1>
            <p className="text-sm leading-relaxed text-neutral-600">
              {product.description}
            </p>
          </div>

          <div className="border-b border-neutral-300 pb-4 text-2xl font-bold tracking-tight">
            Rp {calculatedPrice.toLocaleString('id-ID')}
          </div>

          {/* Kontrol Pilihan Material / Warna */}
          <div className="flex flex-col gap-3">
            <label className="text-xs tracking-wider text-neutral-600 uppercase">
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
                    className={`h-8 w-8 cursor-pointer rounded-full border border-neutral-400 transition-transform ${
                      isActive ? 'scale-105 ring-2 ring-neutral-900 ring-offset-2 ring-offset-[#f4f3ef]' : 'hover:scale-105'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Kontrol Dimensi Panjang */}
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between text-xs tracking-wider text-neutral-600 uppercase">
              <span>PANJANG</span>
              <strong className="font-semibold text-neutral-900">
                {Math.round(config.width * 100)} cm
              </strong>
            </div>
            <input
              type="range"
              min={Number((product.defaultDimensions.width * 0.75).toFixed(2))}
              max={Number((product.defaultDimensions.width * 1.4).toFixed(2))}
              step={0.05}
              value={config.width}
              onChange={(e) => setConfig({ ...config, width: parseFloat(e.target.value) })}
              className="w-full cursor-pointer accent-neutral-900"
            />
          </div>

          {/* Kontrol Dimensi Kedalaman */}
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between text-xs tracking-wider text-neutral-600 uppercase">
              <span>KEDALAMAN (LEBAR)</span>
              <strong className="font-semibold text-neutral-900">
                {Math.round(config.depth * 100)} cm
              </strong>
            </div>
            <input
              type="range"
              min={Number((product.defaultDimensions.depth * 0.8).toFixed(2))}
              max={Number((product.defaultDimensions.depth * 1.3).toFixed(2))}
              step={0.05}
              value={config.depth}
              onChange={(e) => setConfig({ ...config, depth: parseFloat(e.target.value) })}
              className="w-full cursor-pointer accent-neutral-900"
            />
          </div>
        </div>

        <button className="w-full cursor-pointer bg-neutral-900 py-4 text-sm font-semibold tracking-wide text-[#f4f3ef] transition-colors hover:bg-neutral-800">
          Pesan Konfigurasi Ini
        </button>
      </section>

      {/* Panel Kanan: Viewport 3D */}
      <section className="order-first h-[420px] lg:order-last lg:h-auto lg:min-h-[600px]">
        <SceneCanvas config={config}>
          <FurnitureModel modelType={product.modelType} config={config} />
        </SceneCanvas>
      </section>
    </main>
  );
}
