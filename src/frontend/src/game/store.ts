import { create } from "zustand";

export enum BlockType {
  Grass = 1,
  Dirt = 2,
  Stone = 3,
  Sand = 4,
  Wood = 5,
  Leaves = 6,
}

export const BLOCK_COLORS: Record<number, string> = {
  [BlockType.Grass]: "#5a8a3c",
  [BlockType.Dirt]: "#8b5e3c",
  [BlockType.Stone]: "#787878",
  [BlockType.Sand]: "#d4b483",
  [BlockType.Wood]: "#7b5230",
  [BlockType.Leaves]: "#2d6a2f",
};

export const BLOCK_NAMES: Record<number, string> = {
  [BlockType.Grass]: "Grass",
  [BlockType.Dirt]: "Dirt",
  [BlockType.Stone]: "Stone",
  [BlockType.Sand]: "Sand",
  [BlockType.Wood]: "Wood",
  [BlockType.Leaves]: "Leaves",
};

export const HOTBAR_BLOCKS: BlockType[] = [
  BlockType.Grass,
  BlockType.Dirt,
  BlockType.Stone,
  BlockType.Sand,
  BlockType.Wood,
  BlockType.Leaves,
];

interface WorldStore {
  blocks: Map<string, BlockType>;
  selectedBlock: BlockType;
  setSelectedBlock: (b: BlockType) => void;
  addBlock: (x: number, y: number, z: number, type: BlockType) => void;
  removeBlock: (x: number, y: number, z: number) => void;
  initBlocks: (blocks: Map<string, BlockType>) => void;
}

export const useWorldStore = create<WorldStore>((set) => ({
  blocks: new Map(),
  selectedBlock: BlockType.Grass,
  setSelectedBlock: (selectedBlock) => set({ selectedBlock }),
  addBlock: (x, y, z, type) =>
    set((state) => {
      const blocks = new Map(state.blocks);
      blocks.set(`${x},${y},${z}`, type);
      return { blocks };
    }),
  removeBlock: (x, y, z) =>
    set((state) => {
      const blocks = new Map(state.blocks);
      blocks.delete(`${x},${y},${z}`);
      return { blocks };
    }),
  initBlocks: (blocks) => set({ blocks }),
}));
