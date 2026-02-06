'use client';

import { useState, useEffect } from 'react';
import type { SelectedFilters } from '../types';
import { HOTSPOT_BUTTONS } from '../constants';
import { useFilterQueryParams } from './useFilterQueryParams';

interface MapCenter {
  lat: number;
  lng: number;
}

interface UseLocationStateProps {
  defaultCenter?: MapCenter;
  initialFilters?: SelectedFilters;
}

interface UseLocationStateReturn {
  // Selection state
  selectedLocation: number | null;
  selectedHotspot: string | null;
  mapCenter: MapCenter;
  isListExpanded: boolean;
  isFilterModalOpen: boolean;
  appliedFilters: SelectedFilters;
  searchKeyword: string;

  // Selection handlers
  selectLocation: (id: number) => void;
  selectHotspot: (hotspotId: string) => void;
  selectMarker: (id: number) => void;
  closeMarker: () => void;

  // UI handlers
  toggleListExpanded: () => void;
  openFilterModal: () => void;
  closeFilterModal: () => void;
  applyFilters: (filters: SelectedFilters) => void;
  setSearchKeyword: (keyword: string) => void;

  // Computed values
  selectedLocationData: null;
}

const DEFAULT_CENTER: MapCenter = { lat: 37.5665, lng: 126.978 };

export function useLocationState(
  props?: UseLocationStateProps
): UseLocationStateReturn {
  const { defaultCenter = DEFAULT_CENTER, initialFilters } = props ?? {};
  const { currentFilters, updateFiltersInUrl } = useFilterQueryParams();

  // Selection state
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<MapCenter>(defaultCenter);

  // UI state
  const [isListExpanded, setIsListExpanded] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  // Filter state - use URL params or initial filters
  const [appliedFilters, setAppliedFilters] = useState<SelectedFilters>(
    initialFilters ?? currentFilters
  );

  // Sync with URL params when they change
  useEffect(() => {
    setAppliedFilters(currentFilters);
  }, [currentFilters]);

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
    updateFiltersInUrl(filters);
  };

  return {
    // Selection state
    selectedLocation,
    selectedHotspot,
    mapCenter,
    isListExpanded,
    isFilterModalOpen,
    appliedFilters,
    searchKeyword,

    // Selection handlers
    selectLocation,
    selectHotspot,
    selectMarker,
    closeMarker,

    // UI handlers
    toggleListExpanded,
    openFilterModal,
    closeFilterModal,
    applyFilters,
    setSearchKeyword,

    // Computed values
    selectedLocationData: null,
  };
}
