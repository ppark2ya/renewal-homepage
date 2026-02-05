'use client';

import { useMapController } from '../../hooks/useMapController';
import type { LocationItem } from '../../types';

interface MapControllerProps {
  center: { lat: number; lng: number };
  selectedLocation: number | null;
  locations: LocationItem[];
  onVisibleLocationsChange?: (count: number) => void;
}

/**
 * Component for handling map center/zoom changes and bounds tracking.
 * Renders nothing - purely for side effects.
 */
export default function MapController({
  center,
  selectedLocation,
  locations,
  onVisibleLocationsChange,
}: MapControllerProps) {
  useMapController({
    center,
    selectedLocation,
    locations,
    onVisibleLocationsChange,
  });

  return null;
}
