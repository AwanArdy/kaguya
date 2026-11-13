import type { FurnitureConfig, ModelType } from '../types/furniture';
import { MinimalistDesk } from './MinimalistDesk';
import { DiningTable } from './DiningTable';
import { CoffeeTable } from './CoffeeTable';

interface FurnitureModelProps {
  modelType: ModelType;
  config: FurnitureConfig;
}

export function FurnitureModel({ modelType, config }: FurnitureModelProps) {
  switch (modelType) {
    case 'desk-drawer':
      return <MinimalistDesk config={config} />;
    case 'dining-table':
      return <DiningTable config={config} />;
    case 'coffee-table':
      return <CoffeeTable config={config} />;
    default:
      // Sementara untuk kategori Rak & Kursi yang akan dirakit berikutnya
      return <MinimalistDesk config={config} />;
  }
}
