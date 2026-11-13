import { useState } from "react";
import { CATEGORIES, CATALOG_PRODUCTS } from "../data/catalog";
import type { CategoryId, ModelType, ProductItem } from "../types/furniture";

interface CatalogViewProps {
  onSelectProduct: (product: ProductItem) => void;
}

function ProductBlueprintIcon({ type }: { type: ModelType }) {
  switch (type) {
    case 'desk-drawer':
      return (
        <svg viewBox="0 0 160 100" className="h-28 w-44 stroke-neutral-700" fill="none" strokeWidth="1.5">
          <rect x="20" y="25" width="120" height="6" />
          <rect x="95" y="31" width="38" height="16" />
          <line x1="110" y1="39" x2="118" y2="39" />
          <line x1="27" y1="31" x2="27" y2="85" />
          <line x1="133" y1="31" x2="133" y2="85" />
        </svg>
      );
    case 'dining-table':
      return (
        <svg viewBox="0 0 160 100" className="h-28 w-44 stroke-neutral-700" fill="none" strokeWidth="1.5">
          <rect x="15" y="28" width="130" height="7" />
          <line x1="24" y1="35" x2="24" y2="85" />
          <line x1="136" y1="35" x2="136" y2="85" />
          <line x1="24" y1="42" x2="136" y2="42" />
        </svg>
      );
    case 'coffee-table':
      return (
        <svg viewBox="0 0 160 100" className="h-28 w-44 stroke-neutral-700" fill="none" strokeWidth="1.5">
          <rect x="25" y="45" width="110" height="6" />
          <rect x="32" y="64" width="96" height="4" />
          <line x1="32" y1="51" x2="32" y2="85" />
          <line x1="128" y1="51" x2="128" y2="85" />
        </svg>
      );
    case 'bookshelf-grid':
      return (
        <svg viewBox="0 0 160 100" className="h-28 w-44 stroke-neutral-700" fill="none" strokeWidth="1.5">
          <rect x="52" y="10" width="56" height="80" />
          <line x1="80" y1="10" x2="80" y2="90" />
          <line x1="52" y1="30" x2="108" y2="30" />
          <line x1="52" y1="50" x2="108" y2="50" />
          <line x1="52" y1="70" x2="108" y2="70" />
        </svg>
      );
    case 'tv-console':
      return (
        <svg viewBox="0 0 160 100" className="h-28 w-44 stroke-neutral-700" fill="none" strokeWidth="1.5">
          <rect x="18" y="42" width="124" height="30" />
          <line x1="56" y1="42" x2="56" y2="72" />
          <line x1="104" y1="42" x2="104" y2="72" />
          <line x1="56" y1="57" x2="104" y2="57" />
          <line x1="25" y1="72" x2="25" y2="85" />
          <line x1="135" y1="72" x2="135" y2="85" />
        </svg>
      );
    case 'sideboard':
      return (
        <svg viewBox="0 0 160 100" className="h-28 w-44 stroke-neutral-700" fill="none" strokeWidth="1.5">
          <rect x="22" y="28" width="116" height="46" />
          <line x1="60" y1="28" x2="60" y2="74" />
          <line x1="100" y1="28" x2="100" y2="74" />
          <line x1="28" y1="74" x2="28" y2="86" />
          <line x1="132" y1="74" x2="132" y2="86" />
        </svg>
      );
    case 'dining-chair':
      return (
        <svg viewBox="0 0 160 100" className="h-28 w-44 stroke-neutral-700" fill="none" strokeWidth="1.5">
          <rect x="58" y="18" width="44" height="14" />
          <line x1="60" y1="32" x2="60" y2="54" />
          <line x1="100" y1="32" x2="100" y2="54" />
          <rect x="56" y="54" width="48" height="5" />
          <line x1="60" y1="59" x2="60" y2="86" />
          <line x1="100" y1="59" x2="100" y2="86" />
        </svg>
      );
    case 'bar-stool':
      return (
        <svg viewBox="0 0 160 100" className="h-28 w-44 stroke-neutral-700" fill="none" strokeWidth="1.5">
          <rect x="60" y="26" width="40" height="5" />
          <line x1="65" y1="31" x2="60" y2="86" />
          <line x1="95" y1="31" x2="100" y2="86" />
          <line x1="62" y1="64" x2="98" y2="64" />
        </svg>
      );
    case 'bench':
      return (
        <svg viewBox="0 0 160 100" className="h-28 w-44 stroke-neutral-700" fill="none" strokeWidth="1.5">
          <rect x="22" y="48" width="116" height="6" />
          <line x1="30" y1="54" x2="30" y2="85" />
          <line x1="130" y1="54" x2="130" y2="85" />
          <line x1="30" y1="65" x2="130" y2="65" />
        </svg>
      );
  }
}

export function CatalogView({ onSelectProduct }: CatalogViewProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'semua'>('semua');

  const filteredProducts =
    activeCategory === 'semua'
      ? CATALOG_PRODUCTS
      : CATALOG_PRODUCTS.filter((item) => item.category === activeCategory);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-12">
      {/* Header Katalog */}
      <div className="flex flex-col justify-between gap-6 border-b border-neutral-300 pb-8 md:flex-row md:items-end">
        <div className="max-w-xl space-y-2">
          <div className="text-xs font-bold tracking-widest text-neutral-500 uppercase">
            KATALOG PRODUK // 2026
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 md:text-4xl">
            FURNITUR MODULAR MINIMALIS
          </h1>
          <p className="text-sm leading-relaxed text-neutral-600">
            Pilih item di bawah untuk membuka mode pratinjau 3D interaktif, menyesuaikan ukuran, 
            serta mengganti finishing kayu secara langsung.
          </p>
        </div>

        {/* Filter 3 Kategori */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`cursor-pointer border px-4 py-2 text-xs font-semibold tracking-wide transition-colors ${
                  isActive
                    ? 'border-neutral-900 bg-neutral-900 text-[#f4f3ef]'
                    : 'border-neutral-300 bg-[#eae8e3] text-neutral-700 hover:border-neutral-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Kartu Produk (3 Kolom) */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <article
            key={product.id}
            onClick={() => onSelectProduct(product)}
            className="group flex cursor-pointer flex-col justify-between border border-neutral-300 bg-[#eae8e3] transition-colors hover:border-neutral-900"
          >
            {/* Area Preview Sketsa */}
            <div>
              <div className="flex items-center justify-between border-b border-neutral-300 px-5 py-3 text-xs font-medium text-neutral-500">
                <span>{product.code}</span>
                <span>{product.categoryLabel}</span>
              </div>

              <div className="flex h-48 items-center justify-center bg-[#e3e1db] transition-colors group-hover:bg-[#dcd9d2]">
                <ProductBlueprintIcon type={product.modelType} />
              </div>

              <div className="space-y-2 p-5">
                <h2 className="text-lg font-extrabold tracking-tight text-neutral-900">
                  {product.name}
                </h2>
                <p className="line-clamp-2 text-xs leading-relaxed text-neutral-600">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Footer Kartu: Harga & Tombol Buka 3D */}
            <div className="flex items-center justify-between border-t border-neutral-300 px-5 py-4">
              <div>
                <div className="text-[11px] text-neutral-500">{product.dimensionsLabel}</div>
                <div className="text-base font-bold text-neutral-900">
                  Rp {product.basePrice.toLocaleString('id-ID')}
                </div>
              </div>

              <span className="border border-neutral-900 px-3 py-1.5 text-xs font-semibold text-neutral-900 transition-colors group-hover:bg-neutral-900 group-hover:text-[#f4f3ef]">
                Lihat 3D →
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
