'use client';

import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBottomSheet } from '../hooks/useBottomSheet';
import type { LocationItem } from '../types';
import MobileListItem from './MobileListItem';

interface MobileBottomSheetProps {
  locations: LocationItem[];
  isExpanded: boolean;
  onToggle: () => void;
  onLocationSelect: (id: number) => void;
  selectedLocation: number | null;
  className?: string;
}

// Header height is 60px
const HEADER_HEIGHT = 60;
// Handle bar height
const HANDLE_HEIGHT = 56;

export default function MobileBottomSheet({
  locations,
  isExpanded,
  onToggle,
  onLocationSelect,
  selectedLocation,
  className,
}: MobileBottomSheetProps) {
  const { listRef } = useBottomSheet({ isExpanded });

  const handleLocationClick = (id: number) => {
    onLocationSelect(id);
    onToggle();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/30 z-20 transition-opacity duration-300',
          isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onToggle}
      />

      {/* Sheet */}
      <div
        className={cn(
          'fixed left-0 right-0 bg-white z-30',
          'shadow-[0_-4px_20px_rgba(0,0,0,0.1)]',
          'transition-transform duration-300 ease-out',
          className
        )}
        style={{
          top: HEADER_HEIGHT,
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          transform: isExpanded
            ? 'translateY(0)'
            : `translateY(calc(100% - ${HANDLE_HEIGHT}px))`,
        }}
      >
        {/* Handle Bar */}
        <button
          onClick={onToggle}
          className={cn(
            'w-full flex items-center justify-between px-5 py-4 border-b border-gray-100',
            'active:bg-gray-50 transition-colors'
          )}
        >
          <div className="flex items-center gap-2">
            <span className="text-[15px] text-[#111]">List</span>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            )}
          </div>
          <span className="text-[15px] text-[#111]">
            Total : <span className="font-semibold">{locations.length}</span> Kiosks
          </span>
        </button>

        {/* List Content */}
        <div
          ref={listRef}
          className="overflow-y-auto"
          style={{ height: `calc(100% - ${HANDLE_HEIGHT}px)` }}
        >
          {locations.map((location) => (
            <MobileListItem
              key={location.id}
              location={location}
              isSelected={selectedLocation === location.id}
              onClick={() => handleLocationClick(location.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
