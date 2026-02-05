'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import HotspotButton from './HotspotButton';
import { HOTSPOT_BUTTONS } from '../constants';

interface SearchBoxProps {
  onSearch?: (query: string) => void;
  onHotspotSelect?: (hotspotId: string) => void;
  onFilterClick?: () => void;
  selectedHotspot?: string | null;
  className?: string;
}

export default function SearchBox({
  onSearch,
  onHotspotSelect,
  onFilterClick,
  selectedHotspot,
  className,
}: SearchBoxProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <div className={cn('bg-[#FFD300] p-[30px] flex flex-col gap-5', className)}>
      {/* Search Input */}
      <div className="flex gap-4 items-start">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Please enter a search term."
            value={searchQuery}
            onChange={handleSearchChange}
            className="h-[50px] pl-4 pr-12 border-[#D8DCE9] bg-white rounded text-[16px] placeholder:text-[#BBC4D3]"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#111]" />
        </div>
        <button
          onClick={onFilterClick}
          className="w-[50px] h-[50px] bg-[#111] rounded flex items-center justify-center shrink-0"
        >
          <SlidersHorizontal className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Hotspot Buttons */}
      <div className="flex gap-[10px]">
        {HOTSPOT_BUTTONS.map((hotspot) => (
          <HotspotButton
            key={hotspot.id}
            hotspot={hotspot}
            isSelected={selectedHotspot === hotspot.id}
            onClick={() => onHotspotSelect?.(hotspot.id)}
          />
        ))}
      </div>
    </div>
  );
}
