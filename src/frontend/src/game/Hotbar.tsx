import {
  BLOCK_COLORS,
  BLOCK_NAMES,
  HOTBAR_BLOCKS,
  useWorldStore,
} from "./store";

export default function Hotbar() {
  const selectedBlock = useWorldStore((s) => s.selectedBlock);
  const setSelectedBlock = useWorldStore((s) => s.setSelectedBlock);

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 pointer-events-auto select-none">
      {HOTBAR_BLOCKS.map((type, i) => {
        const isSelected = type === selectedBlock;
        return (
          <button
            type="button"
            key={type}
            data-ocid={`hotbar.item.${i + 1}`}
            onClick={() => setSelectedBlock(type)}
            title={BLOCK_NAMES[type]}
            className="flex flex-col items-center justify-center cursor-pointer transition-transform"
            style={{
              width: 56,
              height: 56,
              background: isSelected ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.45)",
              border: isSelected
                ? "2.5px solid white"
                : "2.5px solid rgba(150,150,150,0.6)",
              borderRadius: 4,
              transform: isSelected ? "scale(1.15)" : "scale(1)",
              boxShadow: isSelected ? "0 0 8px rgba(255,255,255,0.3)" : "none",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                background: BLOCK_COLORS[type],
                borderRadius: 3,
                border: "1px solid rgba(0,0,0,0.3)",
                boxShadow:
                  "inset -3px -3px 0 rgba(0,0,0,0.2), inset 3px 3px 0 rgba(255,255,255,0.1)",
              }}
            />
            <span
              style={{
                color: "white",
                fontSize: 11,
                fontFamily: "monospace",
                marginTop: 3,
                opacity: 0.85,
              }}
            >
              {i + 1}
            </span>
          </button>
        );
      })}
    </div>
  );
}
