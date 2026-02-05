'use client';

import Image from 'next/image';
import { AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import type { LocationItem } from '../../types';
import MapThumbnail from './MapThumbnail';

interface LocationMarkerProps {
  location: LocationItem;
  isSelected: boolean;
  onClick: () => void;
  onClose?: () => void;
}

export default function LocationMarker({
  location,
  isSelected,
  onClick,
  onClose,
}: LocationMarkerProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const width = isSelected ? 40 : 32;
  const height = isSelected ? 50 : 40;

  const handleClose = () => {
    onClose?.();
  };

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: location.latitude, lng: location.longitude }}
        title={location.name}
        onClick={onClick}
      >
        <Image
          src="/images/location/marker.png"
          alt={location.name}
          width={width}
          height={height}
          style={{
            width,
            height,
            transition: 'all 0.2s ease',
            filter: isSelected
              ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
              : 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
          }}
        />
      </AdvancedMarker>

      {isSelected && marker && (
        <InfoWindow
          anchor={marker}
          onCloseClick={handleClose}
          headerDisabled
          className="map-thumbnail-info-window"
        >
          <MapThumbnail
            location={location}
            onClose={handleClose}
          />
        </InfoWindow>
      )}
    </>
  );
}
