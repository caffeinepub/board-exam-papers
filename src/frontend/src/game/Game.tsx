import { PointerLockControls, Sky } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import Hotbar from "./Hotbar";
import {
  BLOCK_COLORS,
  type BlockType,
  HOTBAR_BLOCKS,
  useWorldStore,
} from "./store";
import { generateTerrain, getTerrainHeight } from "./terrain";

// ─── Voxel Raycast ──────────────────────────────────────────────────────────
function raycastVoxels(
  origin: THREE.Vector3,
  direction: THREE.Vector3,
  blocks: Map<string, BlockType>,
  maxDist = 6,
): {
  pos: [number, number, number];
  placePos: [number, number, number];
} | null {
  let lastX = Math.floor(origin.x);
  let lastY = Math.floor(origin.y);
  let lastZ = Math.floor(origin.z);

  for (let d = 0.15; d < maxDist; d += 0.05) {
    const cx = Math.floor(origin.x + direction.x * d);
    const cy = Math.floor(origin.y + direction.y * d);
    const cz = Math.floor(origin.z + direction.z * d);

    if (blocks.has(`${cx},${cy},${cz}`)) {
      return { pos: [cx, cy, cz], placePos: [lastX, lastY, lastZ] };
    }

    lastX = cx;
    lastY = cy;
    lastZ = cz;
  }
  return null;
}

// ─── Instanced Mesh per Block Type ──────────────────────────────────────────
const MAX_INSTANCES = 12000;

function BlockInstances({
  type,
  positions,
}: {
  type: BlockType;
  positions: [number, number, number][];
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    mesh.count = positions.length;
    for (let i = 0; i < positions.length; i++) {
      dummy.position.set(
        positions[i][0] + 0.5,
        positions[i][1] + 0.5,
        positions[i][2] + 0.5,
      );
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [positions, dummy]);

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, MAX_INSTANCES]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial color={BLOCK_COLORS[type]} />
    </instancedMesh>
  );
}

// ─── World (block instances grouped by type) ────────────────────────────────
function WorldBlocks() {
  const blocks = useWorldStore((s) => s.blocks);

  const byType = useMemo(() => {
    const map = new Map<BlockType, [number, number, number][]>();
    for (const [key, type] of blocks) {
      const parts = key.split(",");
      const pos: [number, number, number] = [+parts[0], +parts[1], +parts[2]];
      if (!map.has(type)) map.set(type, []);
      map.get(type)!.push(pos);
    }
    return map;
  }, [blocks]);

  return (
    <>
      {Array.from(byType.entries()).map(([type, positions]) => (
        <BlockInstances key={type} type={type} positions={positions} />
      ))}
    </>
  );
}

// ─── Hovered block wireframe (no re-render, direct ref update) ──────────────
function HoverHighlight({
  hoverRef,
}: {
  hoverRef: React.MutableRefObject<[number, number, number] | null>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const h = hoverRef.current;
    if (h) {
      mesh.position.set(h[0] + 0.5, h[1] + 0.5, h[2] + 0.5);
      mesh.visible = true;
    } else {
      mesh.visible = false;
    }
  });

  return (
    <mesh ref={meshRef} visible={false}>
      <boxGeometry args={[1.02, 1.02, 1.02]} />
      <meshBasicMaterial color="#000000" wireframe transparent opacity={0.6} />
    </mesh>
  );
}

// ─── Block Interaction (raycast + click) ────────────────────────────────────
function BlockInteraction() {
  const { camera } = useThree();
  const blocks = useWorldStore((s) => s.blocks);
  const blocksRef = useRef(blocks);
  blocksRef.current = blocks;

  const removeBlock = useWorldStore((s) => s.removeBlock);
  const addBlock = useWorldStore((s) => s.addBlock);
  const selectedBlock = useWorldStore((s) => s.selectedBlock);
  const selectedBlockRef = useRef(selectedBlock);
  selectedBlockRef.current = selectedBlock;

  const hoverRef = useRef<[number, number, number] | null>(null);
  const placeRef = useRef<[number, number, number] | null>(null);

  useFrame(() => {
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    const result = raycastVoxels(camera.position, dir, blocksRef.current);
    hoverRef.current = result?.pos ?? null;
    placeRef.current = result?.placePos ?? null;
  });

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!document.pointerLockElement) return;
      if (e.button === 0 && hoverRef.current) {
        removeBlock(
          hoverRef.current[0],
          hoverRef.current[1],
          hoverRef.current[2],
        );
      } else if (e.button === 2 && placeRef.current) {
        addBlock(
          placeRef.current[0],
          placeRef.current[1],
          placeRef.current[2],
          selectedBlockRef.current,
        );
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [removeBlock, addBlock]);

  return <HoverHighlight hoverRef={hoverRef} />;
}

// ─── Player Controller (WASD + gravity + jump) ──────────────────────────────
function PlayerController() {
  const { camera } = useThree();
  const pos = useRef(new THREE.Vector3(0, 50, 0));
  const vel = useRef(new THREE.Vector3());
  const onGround = useRef(false);
  const keys = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
    shift: false,
  });

  const blocks = useWorldStore((s) => s.blocks);
  const blocksRef = useRef(blocks);
  blocksRef.current = blocks;

  const hasBlock = (x: number, y: number, z: number) =>
    blocksRef.current.has(`${Math.floor(x)},${Math.floor(y)},${Math.floor(z)}`);

  useEffect(() => {
    const startH = getTerrainHeight(0, 0);
    pos.current.set(0, startH + 4, 0);
    camera.position.copy(pos.current);

    const onDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
          keys.current.w = true;
          break;
        case "KeyA":
          keys.current.a = true;
          break;
        case "KeyS":
          keys.current.s = true;
          break;
        case "KeyD":
          keys.current.d = true;
          break;
        case "Space":
          e.preventDefault();
          keys.current.space = true;
          break;
        case "ShiftLeft":
          keys.current.shift = true;
          break;
      }
    };
    const onUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
          keys.current.w = false;
          break;
        case "KeyA":
          keys.current.a = false;
          break;
        case "KeyS":
          keys.current.s = false;
          break;
        case "KeyD":
          keys.current.d = false;
          break;
        case "Space":
          keys.current.space = false;
          break;
        case "ShiftLeft":
          keys.current.shift = false;
          break;
      }
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [camera]);

  useFrame((_, delta) => {
    if (!document.pointerLockElement) return;
    const dt = Math.min(delta, 0.05);
    const speed = keys.current.shift ? 12 : 5;

    const fwd = new THREE.Vector3();
    camera.getWorldDirection(fwd);
    fwd.y = 0;
    fwd.normalize();
    const right = new THREE.Vector3()
      .crossVectors(fwd, new THREE.Vector3(0, 1, 0))
      .normalize();

    const moveDir = new THREE.Vector3();
    if (keys.current.w) moveDir.addScaledVector(fwd, 1);
    if (keys.current.s) moveDir.addScaledVector(fwd, -1);
    if (keys.current.a) moveDir.addScaledVector(right, -1);
    if (keys.current.d) moveDir.addScaledVector(right, 1);
    if (moveDir.lengthSq() > 0) moveDir.normalize();

    vel.current.x = moveDir.x * speed;
    vel.current.z = moveDir.z * speed;
    vel.current.y -= 28 * dt;

    if (keys.current.space && onGround.current) {
      vel.current.y = 10;
      onGround.current = false;
      keys.current.space = false;
    }

    const p = pos.current;
    const prevX = p.x;
    const prevZ = p.z;

    // Move X with collision
    p.x += vel.current.x * dt;
    const bodyYs = [
      Math.floor(p.y - 1.6),
      Math.floor(p.y - 0.8),
      Math.floor(p.y - 0.1),
    ];
    let xHit = false;
    for (const by of bodyYs) {
      if (hasBlock(p.x - 0.3, by, prevZ) || hasBlock(p.x + 0.3, by, prevZ)) {
        xHit = true;
        break;
      }
    }
    if (xHit) {
      p.x = prevX;
      vel.current.x = 0;
    }

    // Move Z with collision
    p.z += vel.current.z * dt;
    let zHit = false;
    for (const by of bodyYs) {
      if (hasBlock(p.x, by, p.z - 0.3) || hasBlock(p.x, by, p.z + 0.3)) {
        zHit = true;
        break;
      }
    }
    if (zHit) {
      p.z = prevZ;
      vel.current.z = 0;
    }

    // Move Y
    p.y += vel.current.y * dt;

    // Ground collision
    if (vel.current.y <= 0) {
      const footY = Math.floor(p.y - 1.8);
      const bx = Math.floor(p.x);
      const bz = Math.floor(p.z);
      if (hasBlock(bx, footY, bz)) {
        p.y = footY + 1 + 1.8;
        vel.current.y = 0;
        onGround.current = true;
      } else {
        onGround.current = false;
      }
    }

    // Ceiling collision
    if (
      vel.current.y > 0 &&
      hasBlock(Math.floor(p.x), Math.floor(p.y + 0.1), Math.floor(p.z))
    ) {
      vel.current.y = 0;
    }

    // World bounds
    p.x = Math.max(-23.5, Math.min(23.5, p.x));
    p.z = Math.max(-23.5, Math.min(23.5, p.z));
    if (p.y < 0.5) {
      p.y = 0.5;
      vel.current.y = 0;
    }

    camera.position.copy(p);
  });

  return null;
}

// ─── Root Game Component ─────────────────────────────────────────────────────
export default function Game() {
  const initBlocks = useWorldStore((s) => s.initBlocks);
  const selectedBlock = useWorldStore((s) => s.selectedBlock);
  const setSelectedBlock = useWorldStore((s) => s.setSelectedBlock);

  useEffect(() => {
    initBlocks(generateTerrain(48));
  }, [initBlocks]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const idx = Number.parseInt(e.key) - 1;
      if (idx >= 0 && idx < HOTBAR_BLOCKS.length)
        setSelectedBlock(HOTBAR_BLOCKS[idx]);
    };
    const onWheel = (e: WheelEvent) => {
      const cur = HOTBAR_BLOCKS.indexOf(selectedBlock);
      const next =
        (cur + (e.deltaY > 0 ? 1 : -1) + HOTBAR_BLOCKS.length) %
        HOTBAR_BLOCKS.length;
      setSelectedBlock(HOTBAR_BLOCKS[next]);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
    };
  }, [selectedBlock, setSelectedBlock]);

  return (
    <div
      className="w-full h-full relative"
      onContextMenu={(e) => e.preventDefault()}
    >
      <Canvas
        data-ocid="game.canvas_target"
        camera={{ fov: 70, near: 0.1, far: 150 }}
        gl={{ antialias: false }}
        style={{ background: "#87CEEB" }}
      >
        <color attach="background" args={["#87CEEB"]} />
        <Sky sunPosition={[80, 30, 80]} />
        <ambientLight intensity={0.75} />
        <directionalLight position={[60, 100, 40]} intensity={1.0} castShadow />
        <fog attach="fog" args={["#c5e8f8", 40, 120]} />

        <PlayerController />
        <BlockInteraction />
        <WorldBlocks />
        <PointerLockControls />
      </Canvas>

      {/* Crosshair */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="relative" style={{ width: 20, height: 20 }}>
          <div
            className="absolute top-1/2 w-full -translate-y-1/2"
            style={{
              height: 2,
              background: "white",
              boxShadow: "0 0 3px 1px rgba(0,0,0,0.7)",
            }}
          />
          <div
            className="absolute left-1/2 h-full -translate-x-1/2"
            style={{
              width: 2,
              background: "white",
              boxShadow: "0 0 3px 1px rgba(0,0,0,0.7)",
            }}
          />
        </div>
      </div>

      <Hotbar />
    </div>
  );
}
