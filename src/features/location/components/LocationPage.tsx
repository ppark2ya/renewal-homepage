'use client';

import LocationSidebar from './LocationSidebar';
import MapView from './MapView';
import MobileSearchBox from './MobileSearchBox';
import MobileBottomSheet from './MobileBottomSheet';
import LocationFilterModal from './LocationFilterModal';
import { useLocationState } from '../hooks/useLocationState';
import { useGetKioskListQuery, useGetKioskFilterQuery } from '@/graphql/generated/graphql';
import type { SelectedFilters } from '../types';

/**
 * appliedFilters의 모든 값을 하나의 string[]로 합쳐서 filterList로 전달
 */
function buildFilterList(filters: SelectedFilters): string[] {
  return [
    ...filters.regions,
    ...filters.detailedRegions,
    ...filters.services,
    ...filters.currencies,
    ...filters.operatingHours,
  ].filter((v) => v && v !== 'all');
}

export default function LocationPage() {
  const {
    selectedLocation,
    selectedHotspot,
    mapCenter,
    isListExpanded,
    isFilterModalOpen,
    appliedFilters,
    searchKeyword,
    selectLocation,
    selectHotspot,
    selectMarker,
    closeMarker,
    toggleListExpanded,
    openFilterModal,
    closeFilterModal,
    applyFilters,
  } = useLocationState();

  const filterList = buildFilterList(appliedFilters);

  const { data: filterQueryData, loading: filterLoading } = useGetKioskFilterQuery();
  const filterData = filterQueryData?.getKioskFilter ?? [];

  const { data } = useGetKioskListQuery({
    variables: {
      page: 1,
      size: 100000,
      ...(filterList.length > 0 ? { filterList } : {}),
      ...(searchKeyword ? { keyword: searchKeyword } : {}),
    },
  });

  const locations = data?.getKioskList.list ?? [];

  return (
    <div className="relative h-[calc(100vh-60px)] w-full">
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-full">
        {/* Sidebar - Left */}
        <div className="w-[500px] h-full overflow-hidden shrink-0 z-10 shadow-lg">
          <LocationSidebar
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationSelect={selectLocation}
            onHotspotSelect={selectHotspot}
            onFilterClick={openFilterModal}
            className="h-full"
          />
        </div>

        {/* Map - Right */}
        <div className="flex-1 h-full">
          <MapView
            locations={locations}
            selectedLocation={selectedLocation}
            onMarkerClick={selectMarker}
            onMarkerClose={closeMarker}
            center={mapCenter}
            zoom={12}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col h-full">
        {/* Search Box - Top (Fixed) */}
        <div className="shrink-0 z-20">
          <MobileSearchBox
            onHotspotSelect={selectHotspot}
            onFilterClick={openFilterModal}
            selectedHotspot={selectedHotspot}
          />
        </div>

        {/* Map - Main area */}
        <div className="flex-1 relative">
          <MapView
            locations={locations}
            selectedLocation={selectedLocation}
            onMarkerClick={selectMarker}
            onMarkerClose={closeMarker}
            center={mapCenter}
            zoom={12}
            className="w-full h-full"
          />
        </div>

        {/* Bottom Sheet with List */}
        <MobileBottomSheet
          locations={locations}
          isExpanded={isListExpanded}
          onToggle={toggleListExpanded}
          onLocationSelect={selectLocation}
          selectedLocation={selectedLocation}
        />
      </div>

      {/* Filter Modal */}
      <LocationFilterModal
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
        onApply={applyFilters}
        initialFilters={appliedFilters}
        filterData={filterData}
        filterLoading={filterLoading}
      />
    </div>
  );
}
