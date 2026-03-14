import { BlockType } from "./store";

function hash(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}

function smoothNoise(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash(ix, iy);
  const b = hash(ix + 1, iy);
  const c = hash(ix, iy + 1);
  const d = hash(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function fbm(x: number, y: number): number {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  for (let i = 0; i < 4; i++) {
    value += smoothNoise(x * frequency, y * frequency) * amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }
  return value;
}

export function getTerrainHeight(x: number, z: number): number {
  const n = fbm(x * 0.05, z * 0.05);
  return Math.floor(3 + n * 10);
}

export function generateTerrain(worldSize = 48): Map<string, BlockType> {
  const blocks = new Map<string, BlockType>();
  const half = Math.floor(worldSize / 2);

  for (let x = -half; x < half; x++) {
    for (let z = -half; z < half; z++) {
      const height = getTerrainHeight(x, z);

      for (let y = 0; y <= height; y++) {
        let type: BlockType;
        if (y === height) {
          type = height <= 4 ? BlockType.Sand : BlockType.Grass;
        } else if (y >= height - 3) {
          type = BlockType.Dirt;
        } else {
          type = BlockType.Stone;
        }
        blocks.set(`${x},${y},${z}`, type);
      }
    }
  }

  // Trees
  for (let tx = -half + 4; tx < half - 4; tx += 7) {
    for (let tz = -half + 4; tz < half - 4; tz += 7) {
      const jx = tx + Math.floor(hash(tx, tz) * 5) - 2;
      const jz = tz + Math.floor(hash(tz, tx) * 5) - 2;
      const groundH = getTerrainHeight(jx, jz);
      if (groundH <= 4) continue;

      const trunkH = 4 + Math.floor(hash(jx * 3, jz * 3) * 2);
      for (let ty = groundH + 1; ty <= groundH + trunkH; ty++) {
        blocks.set(`${jx},${ty},${jz}`, BlockType.Wood);
      }

      const leafTop = groundH + trunkH;
      for (let lx = -2; lx <= 2; lx++) {
        for (let lz = -2; lz <= 2; lz++) {
          for (let ly = leafTop - 1; ly <= leafTop + 2; ly++) {
            const dist = Math.abs(lx) + Math.abs(lz) + Math.abs(ly - leafTop);
            if (dist <= 3 && !(lx === 0 && lz === 0 && ly <= leafTop - 1)) {
              const lk = `${jx + lx},${ly},${jz + lz}`;
              if (!blocks.has(lk)) blocks.set(lk, BlockType.Leaves);
            }
          }
        }
      }
    }
  }

  return blocks;
}
