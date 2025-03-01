import { useState, useEffect } from 'react';
import Image from 'next/image';

interface JobSelectorProps {
  label: string;
  icon: string;
  isSelected?: boolean;
  onChange?: (selected: boolean) => void;
}

export function JobSelector({ label, icon, isSelected = false, onChange }: JobSelectorProps) {
  const [selected, setSelected] = useState(isSelected);

  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);

  const handleClick = () => {
    const newValue = !selected;
    setSelected(newValue);
    onChange?.(newValue);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative
        w-10 h-10 md:w-12 md:h-12
        border-2
        rounded-md
        transition-all
        ${selected 
          ? 'border-[#b89249] bg-[#594731]' 
          : 'border-[#494643] bg-[#2c2928]'
        }
        hover:border-[#b89249]
        focus:outline-none
        focus:ring-2
        focus:ring-[#b89249]
        focus:ring-opacity-50
      `}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src={icon}
          alt={label}
          width={36}
          height={36}
          className="opacity-90 w-9 h-9 md:w-12 md:h-12 object-contain"
          unoptimized
        />
      </div>
      {selected && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#b89249] rounded-full" />
      )}
    </button>
  );
} 