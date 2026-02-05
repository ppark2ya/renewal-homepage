'use client';

import LocationSidebar from './LocationSidebar';
import MapView from './MapView';
import MobileSearchBox from './MobileSearchBox';
import MobileBottomSheet from './MobileBottomSheet';
import LocationFilterModal from './LocationFilterModal';
import { useLocationState } from '../hooks/useLocationState';
import { SAMPLE_LOCATIONS } from '../constants';
import type { LocationItem } from '../types';

interface LocationPageProps {
  initialLocations?: LocationItem[];
}

export default function LocationPage({
  initialLocations = SAMPLE_LOCATIONS,
}: LocationPageProps) {
  const {
    selectedLocation,
    selectedHotspot,
    mapCenter,
    visibleCount,
    isListExpanded,
    isFilterModalOpen,
    appliedFilters,
    selectLocation,
    selectHotspot,
    selectMarker,
    closeMarker,
    setVisibleCount,
    toggleListExpanded,
    openFilterModal,
    closeFilterModal,
    applyFilters,
    selectedLocationData,
  } = useLocationState({ initialLocations });

  return (
    <div className="relative h-[calc(100vh-60px)] w-full">
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-full">
        {/* Sidebar - Left */}
        <div className="w-[500px] h-full overflow-hidden shrink-0 z-10 shadow-lg">
          <LocationSidebar
            locations={initialLocations}
            selectedLocation={selectedLocation}
            onLocationSelect={selectLocation}
            onHotspotSelect={selectHotspot}
            onFilterClick={openFilterModal}
            visibleCount={visibleCount}
            className="h-full"
          />
        </div>

        {/* Map - Right */}
        <div className="flex-1 h-full">
          <MapView
            locations={initialLocations}
            selectedLocation={selectedLocation}
            onMarkerClick={selectMarker}
            onMarkerClose={closeMarker}
            onVisibleLocationsChange={setVisibleCount}
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
            locations={initialLocations}
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
          locations={initialLocations}
          totalCount={visibleCount}
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
      />
    </div>
  );
}
