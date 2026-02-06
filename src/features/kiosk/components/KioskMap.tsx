'use client';

import { cn } from '@/lib/utils';

interface KioskMapProps {
  lat: string;
  lon: string;
  terminalName: string;
  className?: string;
}

export default function KioskMap({
  lat,
  lon,
  terminalName,
  className,
}: KioskMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  if (!apiKey) {
    return (
      <div
        className={cn(
          'w-full aspect-[16/9] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400',
          className
        )}
      >
        Map unavailable
      </div>
    );
  }

  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat},${lon}&zoom=16`;

  return (
    <div className={cn('w-full overflow-hidden rounded-xl', className)}>
      <iframe
        src={mapSrc}
        title={`${terminalName} location`}
        className="w-full aspect-[16/9] border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
