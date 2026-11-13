import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CatalogView } from './components/CatalogView';
import { ProductCustomizerView } from './components/ProductCustomizerView';
import type { ProductItem } from './types/furniture';

export function App() {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f3ef] text-neutral-900 antialiased">
      <Navbar />

      {selectedProduct ? (
        <ProductCustomizerView
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
      ) : (
        <CatalogView onSelectProduct={(product) => setSelectedProduct(product)} />
      )}
    </div>
  );
}

export default App;
