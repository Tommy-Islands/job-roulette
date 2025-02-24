interface GlobalControlsProps {
  onCheckAll: () => void;
  onClearAll: () => void;
}

export function GlobalControls({ onCheckAll, onClearAll }: GlobalControlsProps) {
  return (
    <div className="bg-[#2a2829] p-4 rounded-lg mb-4 flex justify-between gap-4">
      <button
        onClick={onCheckAll}
        className="px-4 py-2 bg-[#594731] text-[#b89249] rounded hover:bg-[#6a563b] transition-colors"
      >
        ALL
      </button>
      <button
        onClick={onClearAll}
        className="px-4 py-2 bg-[#2c2928] text-[#b89249] rounded hover:bg-[#3a3534] transition-colors"
      >
        CLEAR
      </button>
    </div>
  );
} 