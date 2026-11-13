import type { FurnitureConfig, ModelType } from '../types/furniture';
import { MinimalistDesk } from './MinimalistDesk';
import { DiningTable } from './DiningTable';
import { CoffeeTable } from './CoffeeTable';
import { BookshelfGrid } from './BookshelfGrid';
import { TvConsole } from './TvConsole';
import { Sideboard } from './Sideboard';

interface FurnitureModelProps {
  modelType: ModelType;
  config: FurnitureConfig;
}

export function FurnitureModel({ modelType, config }: FurnitureModelProps) {
  switch (modelType) {
    // Kategori 1: Meja & Kerja
    case 'desk-drawer':
      return <MinimalistDesk config={config} />;
    case 'dining-table':
      return <DiningTable config={config} />;
    case 'coffee-table':
      return <CoffeeTable config={config} />;

    // Kategori 2: Rak & Penyimpanan
    case 'bookshelf-grid':
      return <BookshelfGrid config={config} />;
    case 'tv-console':
      return <TvConsole config={config} />;
    case 'sideboard':
      return <Sideboard config={config} />;

    default:
      return <MinimalistDesk config={config} />;
  }
}
