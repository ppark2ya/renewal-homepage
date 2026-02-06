'use client';

import {
  APIProvider,
  Map,
  useApiLoadingStatus,
  APILoadingStatus,
} from '@vis.gl/react-google-maps';
import { cn } from '@/lib/utils';
import type { LocationItem } from '../types';
import LocationMarker from './map/LocationMarker';
import MapController from './map/MapController';
import MapErrorPlaceholder from './map/MapErrorPlaceholder';
import MapFallback from './map/MapFallback';

interface MapViewProps {
  locations: LocationItem[];
  selectedLocation?: number | null;
  onMarkerClick?: (id: number) => void;
  onMarkerClose?: () => void;
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
}

// Default center (Seoul)
const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 };
const DEFAULT_ZOOM = 12;

export default function MapView({
  locations,
  selectedLocation = null,
  onMarkerClick,
  onMarkerClose,
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  className,
}: MapViewProps) {
  const status = useApiLoadingStatus();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;



  // Fallback UI when API key is not available
  if (!apiKey) {
    return (
      <MapFallback
        locations={locations}
        selectedLocation={selectedLocation}
        onMarkerClick={onMarkerClick}
        onMarkerClose={onMarkerClose}
        className={className}
      />
    );
  }

  // Handle API loading errors
  if (
    status === APILoadingStatus.AUTH_FAILURE ||
    status === APILoadingStatus.FAILED ||
    status === APILoadingStatus.NOT_LOADED
  ) {
    return <MapErrorPlaceholder status={status} className={className} />;
  }

  return (
    <div className={cn('w-full h-full', className)}>
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={center}
          defaultZoom={zoom}
          mapId="dozn_location_map"
          gestureHandling="greedy"
          disableDefaultUI={false}
          zoomControl={true}
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl={false}
          style={{ width: '100%', height: '100%' }}
        >
          <MapController
            center={center}
            selectedLocation={selectedLocation}
            locations={locations}
          />

          {locations.map((location) => (
            <LocationMarker
              key={location.id}
              location={location}
              isSelected={selectedLocation === location.id}
              onClick={() => onMarkerClick?.(location.id)}
              onClose={onMarkerClose}
            />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}
