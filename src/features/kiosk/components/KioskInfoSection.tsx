'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Clock, Copy, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { KioskService } from '@/graphql/generated/graphql';

interface KioskInfoSectionProps {
  addr: string;
  memo?: string | null;
  openTime?: string | null;
  closeTime?: string | null;
  operationDay: string;
  serviceList: KioskService[];
  className?: string;
}

export default function KioskInfoSection({
  addr,
  memo,
  openTime,
  closeTime,
  operationDay,
  serviceList,
  className,
}: KioskInfoSectionProps) {
  const t = useTranslations('KioskDetailPage');

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(addr);
      toast.success(t('addressCopied'));
    } catch {
      toast.error(t('copyFailed'));
    }
  };

  const operatingHoursText = openTime && closeTime
    ? `${operationDay} ${openTime} ~ ${closeTime}`
    : operationDay;

  const servicesText = serviceList.map((s) => s.name).join(' / ');

  return (
    <div className={cn('flex flex-col gap-4 md:gap-5', className)}>
      {/* Address */}
      <InfoRow
        icon={<MapPin className="w-5 h-5 text-[#FFD300] shrink-0" />}
        label={t('address')}
      >
        <div className="flex items-start gap-2">
          <span className="text-[13px] md:text-[14px] leading-5 text-[#111]">{addr}</span>
          <button
            type="button"
            onClick={handleCopyAddress}
            className="shrink-0 p-0.5 hover:bg-gray-100 rounded transition-colors"
            aria-label={t('copyAddress')}
          >
            <Copy className="w-4 h-4 text-[#717895]" />
          </button>
        </div>
      </InfoRow>

      {/* Location Details (memo) */}
      {memo && (
        <InfoRow
          icon={<Building2 className="w-5 h-5 text-[#FFD300] shrink-0" />}
          label={t('locationDetails')}
        >
          <span className="text-[13px] md:text-[14px] leading-5 text-[#111]">{memo}</span>
        </InfoRow>
      )}

      {/* Operating Hours */}
      <InfoRow
        icon={<Clock className="w-5 h-5 text-[#FFD300] shrink-0" />}
        label={t('operatingHours')}
      >
        <span className="text-[13px] md:text-[14px] leading-5 text-[#111]">
          {operatingHoursText}
        </span>
      </InfoRow>

      {/* Available Services */}
      <InfoRow
        icon={
          <svg className="w-5 h-5 text-[#FFD300] shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
          </svg>
        }
        label={t('availableServices')}
      >
        <span className="text-[13px] md:text-[14px] leading-5 text-[#111]">
          {servicesText}
        </span>
      </InfoRow>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center gap-2 shrink-0 min-w-[100px] md:min-w-[130px]">
        {icon}
        <span className="text-[13px] md:text-[14px] leading-5 text-[#717895] font-medium">
          {label}
        </span>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
