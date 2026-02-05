'use client';

import { cn } from '@/lib/utils';
import { PLACE_TYPE_ICON_COMPONENTS } from './HotspotIcons';
import ServiceBadge from './ServiceBadge';
import type { LocationItem, PlaceType } from '../types';

interface MobileListItemProps {
  location: LocationItem;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function MobileListItem({
  location,
  isSelected = false,
  onClick,
  className,
}: MobileListItemProps) {
  const PlaceIconComponent = PLACE_TYPE_ICON_COMPONENTS[location.placeType as PlaceType];

  return (
    <div
      className={cn(
        'border-b border-[#EDEDED] px-5 py-6 cursor-pointer transition-colors',
        'active:bg-gray-50',
        isSelected && 'bg-[#FFFEF5]',
        className
      )}
      onClick={onClick}
    >
      {/* Place Icon */}
      {PlaceIconComponent && (
        <div className="w-6 h-6 mb-3">
          <PlaceIconComponent className="w-full h-full" />
        </div>
      )}

      {/* Title */}
      <h3 className="text-[18px] font-medium leading-[26px] text-[#111] mb-2">
        {location.name}
      </h3>

      {/* Operating Hours */}
      <p className="text-[14px] leading-[20px] text-[#717895] mb-4">
        {location.operatingHours}
      </p>

      {/* Service Badges */}
      <div className="flex flex-wrap gap-2">
        {location.services.map((service) => (
          <ServiceBadge key={service} type={service} className="text-[13px] px-3 py-1" />
        ))}
      </div>
    </div>
  );
}
