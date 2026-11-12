export type FinishOption = {
  id: string;
  name: string;
  color: string;
  roughness: number;
  metalness: number;
}

export interface FurnitureConfig {
  finish: FinishOption;
  width: number;
  depth: number;
  height: number;
}
