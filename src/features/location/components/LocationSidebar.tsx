'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import SearchBox from './SearchBox';
import LocationCard from './LocationCard';
import { useLocationSearch } from '../hooks/useLocationSearch';
import type { LocationItem } from '../types';

interface LocationSidebarProps {
  locations: LocationItem[];
  selectedLocation?: number | null;
  onLocationSelect?: (id: number) => void;
  onHotspotSelect?: (hotspotId: string) => void;
  onFilterClick?: () => void;
  className?: string;
}

export default function LocationSidebar({
  locations,
  selectedLocation,
  onLocationSelect,
  onHotspotSelect,
  onFilterClick,
  className,
}: LocationSidebarProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const { filteredLocations, handleSearch } = useLocationSearch({ locations });

  const handleHotspotSelect = (hotspotId: string) => {
    setSelectedHotspot(hotspotId === selectedHotspot ? null : hotspotId);
    onHotspotSelect?.(hotspotId);
  };

  return (
    <div className={cn('bg-white flex flex-col', className)}>
      {/* Search Box */}
      <SearchBox
        onSearch={handleSearch}
        onHotspotSelect={handleHotspotSelect}
        onFilterClick={onFilterClick}
        selectedHotspot={selectedHotspot}
      />

      {/* Total Count */}
      <div className="px-4 py-3 border-b border-gray-100">
        <span className="text-sm font-medium text-gray-700">Total : {locations.length} Kiosks</span>
      </div>

      {/* Location List */}
      <div className="flex-1 overflow-y-auto">
        {filteredLocations.map((location) => (
          <LocationCard
            key={location.id}
            location={location}
            isSelected={selectedLocation === location.id}
            onClick={() => onLocationSelect?.(location.id)}
          />
        ))}
      </div>
    </div>
  );
}
