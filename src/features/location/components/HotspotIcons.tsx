'use client';

import Image from 'next/image';

interface IconProps {
  className?: string;
}

// Hotspot icons - using PNG images
export function MyeongdongIcon({ className }: IconProps) {
  return (
    <div className={className}>
      <Image
        src="/images/location/myeongdong.png"
        alt="Myeongdong"
        width={50}
        height={50}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export function HongdaeIcon({ className }: IconProps) {
  return (
    <div className={className}>
      <Image
        src="/images/location/hongdae.png"
        alt="Hongdae"
        width={50}
        height={50}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export function SeongsuIcon({ className }: IconProps) {
  return (
    <div className={className}>
      <Image
        src="/images/location/seongsu.png"
        alt="Seongsu"
        width={50}
        height={50}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export function HaeundaeIcon({ className }: IconProps) {
  return (
    <div className={className}>
      <Image
        src="/images/location/haeundae.png"
        alt="Haeundae"
        width={50}
        height={50}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

// Place type icons - using PNG images
export function HotelIcon({ className }: IconProps) {
  return (
    <div className={className}>
      <Image
        src="/images/location/hotel.png"
        alt="Hotel"
        width={24}
        height={24}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export function HospitalIcon({ className }: IconProps) {
  return (
    <div className={className}>
      <Image
        src="/images/location/hospital.png"
        alt="Hospital"
        width={24}
        height={24}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export function ShoppingIcon({ className }: IconProps) {
  return (
    <div className={className}>
      <Image
        src="/images/location/shopping.png"
        alt="Shopping"
        width={24}
        height={24}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export function OutdoorIcon({ className }: IconProps) {
  return (
    <div className={className}>
      <Image
        src="/images/location/outdoor.png"
        alt="Outdoor"
        width={24}
        height={24}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

// Export mapping
export const HOTSPOT_ICON_COMPONENTS = {
  myeongdong: MyeongdongIcon,
  hongdae: HongdaeIcon,
  seongsu: SeongsuIcon,
  haeundae: HaeundaeIcon,
} as const;

export const PLACE_TYPE_ICON_COMPONENTS = {
  hotel: HotelIcon,
  hospital: HospitalIcon,
  shopping: ShoppingIcon,
  outdoor: OutdoorIcon,
} as const;
