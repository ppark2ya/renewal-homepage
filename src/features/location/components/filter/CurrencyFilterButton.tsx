'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CurrencyFilterButtonProps {
  code: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
  flagSrc?: string;
  className?: string;
}

export default function CurrencyFilterButton({
  code,
  label,
  isSelected,
  onClick,
  flagSrc,
  className,
}: CurrencyFilterButtonProps) {
  const showFlag = code !== 'all' && flagSrc;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-10 items-center gap-2 rounded-full px-5 py-[10px] text-[14px] leading-[20px] transition-colors',
        isSelected
          ? 'border border-[#FFD300] bg-[#FFF2B2] text-[#111]'
          : 'bg-[#F2F3F4] text-[#111] hover:bg-[#E8E9EA]',
        className
      )}
    >
      {showFlag && (
        <div className="relative size-6 overflow-hidden rounded-sm">
          <Image
            src={flagSrc}
            alt={label}
            width={24}
            height={24}
            className="object-cover"
          />
        </div>
      )}
      <span>{label}</span>
    </button>
  );
}
