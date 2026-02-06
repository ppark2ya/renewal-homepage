'use client';

import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { cn } from '@/lib/utils';

interface KioskImageGalleryProps {
  image01: string;
  image02: string;
  terminalName: string;
  className?: string;
}

export default function KioskImageGallery({
  image01,
  image02,
  terminalName,
  className,
}: KioskImageGalleryProps) {
  return (
    <div className={cn('flex gap-2 md:gap-3', className)}>
      <div className="relative flex-1 aspect-[4/3] overflow-hidden rounded-lg md:rounded-xl">
        <ImageWithFallback
          src={image01}
          alt={`${terminalName} 1`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 40vw, 500px"
        />
      </div>
      <div className="relative flex-1 aspect-[4/3] overflow-hidden rounded-lg md:rounded-xl">
        <ImageWithFallback
          src={image02}
          alt={`${terminalName} 2`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 40vw, 500px"
        />
      </div>
    </div>
  );
}
