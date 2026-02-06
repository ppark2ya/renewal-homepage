'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Share2 } from 'lucide-react';
import ServiceBadge from './ServiceBadge';
import type { LocationItem } from '../types';

interface LocationCardProps {
  location: LocationItem;
  isSelected?: boolean;
  onClick?: () => void;
  variant?: 'desktop' | 'mobile';
  className?: string;
}

export default function LocationCard({
  location,
  isSelected = false,
  onClick,
  variant = 'desktop',
  className,
}: LocationCardProps) {
  // 운영시간 조합
  const operatingHours =
    location.openTime && location.closeTime
      ? `${location.operationDay} ${location.openTime} ~ ${location.closeTime}`
      : location.operationDay;

  if (variant === 'mobile') {
    return (
      <div
        className={cn(
          'bg-white rounded-lg p-4 shadow-lg cursor-pointer',
          isSelected && 'ring-2 ring-[#FFD300]',
          className
        )}
        onClick={onClick}
      >
        <div className="flex gap-3">
          <div className="flex-1">
            {/* Flags - shows supported currencies */}
            <div className="flex items-center gap-1 mb-2">
              <span className="text-xs text-gray-500">*</span>
              <span className="text-gray-400 mx-1">→</span>
              <Image
                src="/images/flags/cn.svg"
                alt="CNY"
                width={16}
                height={12}
                className="object-cover rounded-sm"
              />
              <Image
                src="/images/flags/us.svg"
                alt="USD"
                width={16}
                height={12}
                className="object-cover rounded-sm"
              />
              <Image
                src="/images/flags/jp.svg"
                alt="JPY"
                width={16}
                height={12}
                className="object-cover rounded-sm"
              />
            </div>

            {/* Title */}
            <h3 className="text-[16px] font-medium leading-[24px] text-[#111] mb-2 line-clamp-2">
              {location.terminalName}
            </h3>

            {/* Operating Hours */}
            <p className="text-[12px] leading-[18px] text-[#717895] mb-2">{operatingHours}</p>

            {/* Services */}
            <div className="flex flex-wrap gap-1 text-[12px] text-[#717895]">
              {location.serviceList.map((service, idx) => (
                <span key={service.code}>
                  {service.name}
                  {idx < location.serviceList.length - 1 && ' / '}
                </span>
              ))}
            </div>
          </div>

          {/* Image */}
          {location.image01 && (
            <div className="relative w-[60px] h-[60px] rounded-lg overflow-hidden shrink-0">
              <Image
                src={location.image01}
                alt={location.terminalName}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Share Button */}
        <button className="absolute bottom-4 right-4 p-1 hover:bg-gray-100 rounded">
          <Share2 className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'border-b border-[#D8DCE9] p-[30px] cursor-pointer transition-colors hover:bg-gray-50',
        isSelected && 'bg-[#FFFEF5]',
        className
      )}
      onClick={onClick}
    >
      {/* Title */}
      <div className="flex flex-col gap-2 mb-5">
        <h3 className="text-[20px] font-normal leading-[30px] text-[#111] capitalize">
          {location.terminalName}
        </h3>
        <p className="text-[14px] leading-[20px] text-[#717895]">{operatingHours}</p>
      </div>

      {/* Service Badges */}
      <div className="flex flex-wrap gap-4">
        {location.serviceList.map((service) => (
          <ServiceBadge key={service.code} service={service} />
        ))}
      </div>
    </div>
  );
}
