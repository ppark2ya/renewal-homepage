'use client';

import { cn } from '@/lib/utils';
import ServiceBadge from './ServiceBadge';
import type { LocationItem } from '../types';

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
  // 운영시간 조합
  const operatingHours =
    location.openTime && location.closeTime
      ? `${location.operationDay} ${location.openTime} ~ ${location.closeTime}`
      : location.operationDay;

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
      {/* Title */}
      <h3 className="text-[18px] font-medium leading-[26px] text-[#111] mb-2">
        {location.terminalName}
      </h3>

      {/* Operating Hours */}
      <p className="text-[14px] leading-[20px] text-[#717895] mb-4">
        {operatingHours}
      </p>

      {/* Service Badges */}
      <div className="flex flex-wrap gap-2">
        {location.serviceList.map((service) => (
          <ServiceBadge key={service.code} service={service} className="text-[13px] px-3 py-1" />
        ))}
      </div>
    </div>
  );
}
