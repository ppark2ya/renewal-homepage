'use client';

import { cn } from '@/lib/utils';
import type { LocationItem } from '../../types';
import MapThumbnail from './MapThumbnail';

interface MapFallbackProps {
  locations: LocationItem[];
  selectedLocation: number | null;
  onMarkerClick?: (id: number) => void;
  onMarkerClose?: () => void;
  className?: string;
}

/**
 * Fallback component when Google Maps API key is not available.
 * Displays a grid-based placeholder with simplified markers.
 */
export default function MapFallback({
  locations,
  selectedLocation,
  onMarkerClick,
  onMarkerClose,
  className,
}: MapFallbackProps) {
  // 선택된 위치 데이터
  const selectedLocationData = selectedLocation
    ? locations.find((l) => l.id === selectedLocation)
    : null;

  // 선택된 마커의 위치 인덱스
  const selectedIndex = selectedLocation
    ? locations.findIndex((l) => l.id === selectedLocation)
    : -1;

  return (
    <div className={cn('relative w-full h-full bg-gray-200', className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-green-100">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(#999 1px, transparent 1px), linear-gradient(90deg, #999 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Markers */}
        {locations.map((location, index) => (
          <div
            key={location.id}
            className="absolute cursor-pointer transition-transform hover:scale-110"
            style={{
              left: `${20 + (index % 4) * 20}%`,
              top: `${15 + Math.floor(index / 4) * 25}%`,
              transform: 'translate(-50%, -100%)',
            }}
            onClick={() => onMarkerClick?.(location.id)}
          >
            <svg
              width={selectedLocation === location.id ? 40 : 32}
              height={selectedLocation === location.id ? 50 : 40}
              viewBox="0 0 32 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                'drop-shadow-lg transition-all',
                selectedLocation === location.id && 'scale-125'
              )}
            >
              <path
                d="M16 0C7.164 0 0 7.164 0 16C0 28 16 40 16 40C16 40 32 28 32 16C32 7.164 24.836 0 16 0Z"
                fill={selectedLocation === location.id ? '#FF8C00' : '#FFD300'}
              />
              <circle cx="16" cy="16" r="6" fill="#111" />
            </svg>
          </div>
        ))}

        {/* MapThumbnail popup for selected marker */}
        {selectedLocationData && selectedIndex >= 0 && (
          <div
            className="absolute z-10"
            style={{
              left: `${20 + (selectedIndex % 4) * 20}%`,
              top: `${15 + Math.floor(selectedIndex / 4) * 25}%`,
              transform: 'translate(-50%, -100%) translateY(-80px)',
            }}
          >
            <MapThumbnail
              location={selectedLocationData}
              onClose={() => onMarkerClose?.()}
            />
          </div>
        )}

        {/* Loading indicator */}
        <div className="absolute bottom-4 left-4 bg-white/80 px-3 py-2 rounded-lg text-sm text-gray-600">
          Google Maps API key required
        </div>
      </div>
    </div>
  );
}
