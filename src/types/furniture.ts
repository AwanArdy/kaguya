export type CategoryId = 'meja' | 'penyimpanan' | 'kursi';

export type ModelType =
  | 'desk-drawer'
  | 'dining-table'
  | 'coffee-table'
  | 'bookshelf-grid'
  | 'tv-console'
  | 'sideboard'
  | 'dining-chair'
  | 'bar-stool'
  | 'bench';

export interface FinishOption {
  id: string;
  name: string;
  color: string;
  roughness: number;
  metalness: number;
}

export interface ProductItem {
  id: string;
  code: string;
  name: string;
  category: CategoryId;
  categoryLabel: string;
  basePrice: number;
  description: string;
  dimensionsLabel: string;
  defaultDimensions: {
    width: number;
    depth: number;
    height: number;
  };
  modelType: ModelType;
}

export interface FurnitureConfig {
  finish: FinishOption;
  width: number;
  depth: number;
  height: number;
}
