'use client';

import { cn } from '@/lib/utils';

interface KioskServiceItem {
  code: string;
  name: string;
}

// 서비스 코드별 배지 스타일
const SERVICE_BADGE_STYLES: Record<string, { bgColor: string; textColor: string }> = {
  foreignToKrw: { bgColor: 'bg-[#FFD300]', textColor: 'text-[#111]' },
  foreign_to_krw: { bgColor: 'bg-[#FFD300]', textColor: 'text-[#111]' },
  krwToForeign: { bgColor: 'bg-[#FFAA00]', textColor: 'text-[#111]' },
  krw_to_foreign: { bgColor: 'bg-[#FFAA00]', textColor: 'text-[#111]' },
  taxRefund: { bgColor: 'bg-[#AFE139]', textColor: 'text-[#111]' },
  tax_refund: { bgColor: 'bg-[#AFE139]', textColor: 'text-[#111]' },
  ezlCardTopup: { bgColor: 'bg-[#111]', textColor: 'text-white' },
  ezl_topup: { bgColor: 'bg-[#111]', textColor: 'text-white' },
  prepaid_card: { bgColor: 'bg-[#111]', textColor: 'text-white' },
};

const DEFAULT_STYLE = { bgColor: 'bg-gray-200', textColor: 'text-[#111]' };

interface ServiceBadgeProps {
  service: KioskServiceItem;
  className?: string;
}

export default function ServiceBadge({ service, className }: ServiceBadgeProps) {
  const style = SERVICE_BADGE_STYLES[service.code] ?? DEFAULT_STYLE;

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded px-4 py-[5px] text-[14px] leading-[20px] whitespace-nowrap',
        style.bgColor,
        style.textColor,
        className
      )}
    >
      {service.name}
    </span>
  );
}
