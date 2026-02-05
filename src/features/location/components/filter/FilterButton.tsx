'use client';

import { cn } from '@/lib/utils';

interface FilterButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export default function FilterButton({
  label,
  isSelected,
  onClick,
  className,
}: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'h-10 rounded-full px-5 py-[10px] text-[14px] leading-[20px] transition-colors',
        isSelected
          ? 'border border-[#FFD300] bg-[#FFF2B2] text-[#111]'
          : 'bg-[#F2F3F4] text-[#111] hover:bg-[#E8E9EA]',
        className
      )}
    >
      {label}
    </button>
  );
}
