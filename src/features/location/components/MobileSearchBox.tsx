'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { HOTSPOT_BUTTONS } from '../constants';
import { HOTSPOT_ICON_COMPONENTS } from './HotspotIcons';

interface MobileSearchBoxProps {
  onSearch?: (query: string) => void;
  onHotspotSelect?: (hotspotId: string) => void;
  onFilterClick?: () => void;
  selectedHotspot?: string | null;
  className?: string;
}

export default function MobileSearchBox({
  onSearch,
  onHotspotSelect,
  onFilterClick,
  selectedHotspot,
  className,
}: MobileSearchBoxProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <div className={cn('bg-[#FFD300] px-4 py-4 flex flex-col gap-3 h-[180px]', className)}>
      {/* Search Input */}
      <div className="flex gap-2 items-center">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Please Enter A Search Term."
            value={searchQuery}
            onChange={handleSearchChange}
            className="h-[44px] pl-4 pr-10 border-[#D8DCE9] bg-white rounded text-[14px] placeholder:text-[#BBC4D3]"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#111]" />
        </div>
        <button
          onClick={onFilterClick}
          className="w-[44px] h-[44px] bg-[#111] rounded flex items-center justify-center shrink-0"
        >
          <SlidersHorizontal className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Hotspot Buttons - 4 equal columns with 10px gap */}
      <div className="grid grid-cols-4 gap-[10px] h-full">
        {HOTSPOT_BUTTONS.map((hotspot) => {
          const IconComponent = HOTSPOT_ICON_COMPONENTS[hotspot.id as keyof typeof HOTSPOT_ICON_COMPONENTS];
          return (
            <button
              key={hotspot.id}
              className={cn(
                'flex flex-col items-center justify-center gap-[6px] rounded-lg bg-white py-2 transition-all min-w-fit',
                selectedHotspot === hotspot.id && 'ring-2 ring-[#111]'
              )}
              onClick={() => onHotspotSelect?.(hotspot.id)}
            >
              <div className="h-[36px] w-[36px] flex items-center justify-center">
                {IconComponent && <IconComponent className="w-full h-full" />}
              </div>
              <span className="text-[10px] leading-[14px] text-[#111] capitalize whitespace-nowrap">
                {hotspot.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
