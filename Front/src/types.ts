
export type ViewMode = '1D' | '2D' | '3D';
export type BlockType = 'wall' | 'pillar' | 'stair' | 'cone' | 'sphere';
export type PlaneType = 'xy' | 'xz' | 'yz';

export interface BlockDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface BlockObject {
  id: string;
  type: BlockType;
  position: [number, number, number];
  dimensions: BlockDimensions;
  rotation: [number, number, number];
  color: string;
}

export interface HistoryState {
  blocks: BlockObject[];
}
