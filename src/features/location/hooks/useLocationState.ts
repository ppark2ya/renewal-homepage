'use client';

import { useState, useEffect } from 'react';
import type { LocationItem, SelectedFilters } from '../types';
import { HOTSPOT_BUTTONS } from '../constants';

interface MapCenter {
  lat: number;
  lng: number;
}

interface UseLocationStateProps {
  initialLocations: LocationItem[];
  defaultCenter?: MapCenter;
}

interface UseLocationStateReturn {
  // Selection state
  selectedLocation: number | null;
  selectedHotspot: string | null;
  mapCenter: MapCenter;
  visibleCount: number;
  isListExpanded: boolean;
  isFilterModalOpen: boolean;
  appliedFilters: SelectedFilters;

  // Selection handlers
  selectLocation: (id: number) => void;
  selectHotspot: (hotspotId: string) => void;
  selectMarker: (id: number) => void;
  closeMarker: () => void;

  // UI handlers
  setVisibleCount: (count: number) => void;
  toggleListExpanded: () => void;
  openFilterModal: () => void;
  closeFilterModal: () => void;
  applyFilters: (filters: SelectedFilters) => void;

  // Computed values
  selectedLocationData: LocationItem | null;
}

const DEFAULT_FILTERS: SelectedFilters = {
  regions: [],
  detailedRegions: [],
  services: [],
  currencies: [],
  operatingHours: [],
};

const DEFAULT_CENTER: MapCenter = { lat: 37.5665, lng: 126.978 };

export function useLocationState({
  initialLocations,
  defaultCenter = DEFAULT_CENTER,
}: UseLocationStateProps): UseLocationStateReturn {
  // Selection state
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<MapCenter>(defaultCenter);

  // UI state
  const [visibleCount, setVisibleCount] = useState<number>(initialLocations.length);
  const [isListExpanded, setIsListExpanded] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Filter state
  const [appliedFilters, setAppliedFilters] = useState<SelectedFilters>(DEFAULT_FILTERS);

  // 현재 위치 가져오기
  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          // 위치 권한 거부 또는 오류 시 서울(기본값) 유지
          setMapCenter(DEFAULT_CENTER);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  }, []);

  // Selection handlers
  const selectLocation = (id: number) => {
    setSelectedLocation(id);
    const location = initialLocations.find((l) => l.id === id);
    if (location) {
      setMapCenter({ lat: location.latitude, lng: location.longitude });
    }
  };

  const selectHotspot = (hotspotId: string) => {
    setSelectedHotspot((prev) => {
      const newSelected = hotspotId === prev ? null : hotspotId;

      if (newSelected) {
        const hotspot = HOTSPOT_BUTTONS.find((h) => h.id === newSelected);
        if (hotspot) {
          setMapCenter({ lat: hotspot.latitude, lng: hotspot.longitude });
        }
      }

      return newSelected;
    });
  };

  const selectMarker = (id: number) => {
    setSelectedLocation(id);
  };

  const closeMarker = () => {
    setSelectedLocation(null);
  };

  // UI handlers
  const toggleListExpanded = () => {
    setIsListExpanded((prev) => !prev);
  };

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const applyFilters = (filters: SelectedFilters) => {
    setAppliedFilters(filters);
  };

  // Computed values
  const selectedLocationData = selectedLocation
    ? initialLocations.find((l) => l.id === selectedLocation) ?? null
    : null;

  return {
    // Selection state
    selectedLocation,
    selectedHotspot,
    mapCenter,
    visibleCount,
    isListExpanded,
    isFilterModalOpen,
    appliedFilters,

    // Selection handlers
    selectLocation,
    selectHotspot,
    selectMarker,
    closeMarker,

    // UI handlers
    setVisibleCount,
    toggleListExpanded,
    openFilterModal,
    closeFilterModal,
    applyFilters,

    // Computed values
    selectedLocationData,
  };
}
