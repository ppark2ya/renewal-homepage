'use client';

import { cn } from '@/lib/utils';
import { SERVICE_BADGES } from '../constants';
import type { ServiceType } from '../types';

interface ServiceBadgeProps {
  type: ServiceType;
  className?: string;
}

export default function ServiceBadge({ type, className }: ServiceBadgeProps) {
  const badge = SERVICE_BADGES[type];

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded px-4 py-[5px] text-[14px] leading-[20px] whitespace-nowrap',
        badge.bgColor,
        badge.textColor,
        className
      )}
    >
      {badge.label}
    </span>
  );
}
