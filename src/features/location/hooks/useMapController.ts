'use client';

import { useEffect } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import type { LocationItem } from '../types';

interface MapCenter {
  lat: number;
  lng: number;
}

interface UseMapControllerProps {
  center: MapCenter;
  selectedLocation: number | null;
  locations: LocationItem[];
  onVisibleLocationsChange?: (count: number) => void;
}

/**
 * Hook for controlling Google Maps pan, zoom, and bounds tracking
 */
export function useMapController({
  center,
  selectedLocation,
  locations,
  onVisibleLocationsChange,
}: UseMapControllerProps): void {
  const map = useMap();

  // Track bounds changes and calculate visible locations
  useEffect(() => {
    if (!map || !onVisibleLocationsChange) return;

    const calculateVisibleLocations = () => {
      const bounds = map.getBounds();
      if (!bounds) {
        onVisibleLocationsChange(locations.length);
        return;
      }

      const visibleCount = locations.filter((location) =>
        bounds.contains({ lat: parseFloat(location.lat), lng: parseFloat(location.lon) })
      ).length;

      onVisibleLocationsChange(visibleCount);
    };

    const handleIdle = () => calculateVisibleLocations();

    map.addListener('idle', handleIdle);
    calculateVisibleLocations();

    return () => {
      google.maps.event.clearListeners(map, 'idle');
    };
  }, [map, locations, onVisibleLocationsChange]);

  // Pan to selected location
  useEffect(() => {
    if (!map || !selectedLocation) return;

    const location = locations.find((l) => l.id === selectedLocation);
    if (location) {
      map.panTo({ lat: parseFloat(location.lat), lng: parseFloat(location.lon) });
    }
  }, [map, selectedLocation, locations]);

  // Update center when it changes
  useEffect(() => {
    if (!map) return;
    map.panTo(center);
  }, [map, center]);
}
