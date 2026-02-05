'use client';

import { cn } from '@/lib/utils';
import { HOTSPOT_ICON_COMPONENTS } from './HotspotIcons';
import type { HotspotButton as HotspotButtonType } from '../types';

interface HotspotButtonProps {
  hotspot: HotspotButtonType;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function HotspotButton({
  hotspot,
  isSelected = false,
  onClick,
  className,
}: HotspotButtonProps) {
  const IconComponent = HOTSPOT_ICON_COMPONENTS[hotspot.id as keyof typeof HOTSPOT_ICON_COMPONENTS];

  return (
    <button
      className={cn(
        'flex flex-1 flex-col items-center justify-center gap-[10px] rounded-[10px] bg-white px-[10px] pb-[10px] pt-[15px] transition-all hover:shadow-md',
        isSelected && 'ring-2 ring-[#111]',
        className
      )}
      onClick={onClick}
    >
      <div className="relative h-[50px] w-[50px] overflow-hidden flex items-center justify-center">
        {IconComponent && <IconComponent className="w-full h-full" />}
      </div>
      <span className="text-[11px] leading-[20px] text-[#111] capitalize">
        {hotspot.name}
      </span>
    </button>
  );
}
