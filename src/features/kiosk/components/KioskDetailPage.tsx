'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  useGetKioskDetailQuery,
  type GetKioskDetailQuery,
} from '@/graphql/generated/graphql';
import KioskImageGallery from './KioskImageGallery';
import KioskMap from './KioskMap';
import KioskInfoSection from './KioskInfoSection';
import KrwToForeignSection from './KrwToForeignSection';
import ForeignToKrwSection from './ForeignToKrwSection';

type KioskDetail = GetKioskDetailQuery['getKioskDetail'];

interface KioskDetailPageProps {
  terminalId: number;
  initialData: KioskDetail | null;
}

export default function KioskDetailPage({ terminalId, initialData }: KioskDetailPageProps) {
  const t = useTranslations('KioskDetailPage');
  const locale = useLocale();

  // SSR 데이터로 즉시 렌더링 후, 클라이언트에서 최신 데이터로 갱신 (재고 등 실시간 변동)
  const { data, loading, error } = useGetKioskDetailQuery({
    variables: { terminalId },
    fetchPolicy: 'cache-and-network',
  });

  const kiosk = data?.getKioskDetail ?? initialData ?? null;

  const handleShare = async () => {
    const url = `${window.location.origin}/${locale}/kiosk/${terminalId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success(t('linkCopied'));
    } catch {
      toast.error(t('copyFailed'));
    }
  };

  // SSR 데이터도 없고 클라이언트도 로딩 중일 때만 스켈레톤 표시
  if (!kiosk && loading) {
    return <KioskDetailSkeleton />;
  }

  if (!kiosk) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-[#717895]">
        Failed to load kiosk details.
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10 py-6 md:py-10">
      {/* Image Gallery */}
      <KioskImageGallery
        image01={kiosk.image01}
        image02={kiosk.image02}
        terminalName={kiosk.terminalName}
        className="mb-6 md:mb-8"
      />

      {/* Terminal Name */}
      <h1 className="text-[20px] md:text-[24px] lg:text-[28px] font-bold leading-[1.4] text-[#111] mb-6 md:mb-8">
        {kiosk.terminalName}
      </h1>

      {/* Map */}
      <KioskMap
        lat={kiosk.lat}
        lon={kiosk.lon}
        terminalName={kiosk.terminalName}
        className="mb-6 md:mb-8"
      />

      {/* Info Section */}
      <KioskInfoSection
        addr={kiosk.addr}
        memo={kiosk.memo}
        openTime={kiosk.openTime}
        closeTime={kiosk.closeTime}
        operationDay={kiosk.operationDay}
        serviceList={[...kiosk.serviceList]}
        className="mb-8 md:mb-10"
      />

      {/* Divider */}
      <hr className="border-[#D8DCE9] mb-8 md:mb-10" />

      {/* KRW → Foreign (Balance) */}
      <KrwToForeignSection
        foreignCurrencyList={[...kiosk.foreignCurrencyList]}
        className="mb-8 md:mb-10"
      />

      {/* Divider */}
      {kiosk.foreignCurrencyList.length > 0 && kiosk.currencyList.length > 0 && (
        <hr className="border-[#D8DCE9] mb-8 md:mb-10" />
      )}

      {/* Foreign → KRW */}
      <ForeignToKrwSection
        currencyList={[...kiosk.currencyList]}
        className="mb-8 md:mb-10"
      />

      {/* Bottom Actions */}
      <div className="flex items-center justify-center gap-4 pt-4 pb-8">
        <Link
          href={`/${locale}/location`}
          className="inline-flex items-center justify-center rounded-full border border-[#FFD300] bg-[#FFD300] px-8 py-3 text-[14px] md:text-[16px] font-medium text-[#111] hover:bg-[#FFC800] transition-colors"
        >
          {t('locationList')}
        </Link>
      </div>

      {/* Floating Share Button */}
      <button
        type="button"
        onClick={handleShare}
        className={cn(
          'fixed bottom-6 right-6 z-50',
          'flex items-center justify-center',
          'w-12 h-12 md:w-14 md:h-14 rounded-full',
          'bg-[#FFD300] shadow-lg hover:bg-[#FFC800] transition-colors'
        )}
        aria-label={t('share')}
      >
        <Share2 className="w-5 h-5 md:w-6 md:h-6 text-[#111]" />
      </button>
    </div>
  );
}

/** Loading skeleton */
function KioskDetailSkeleton() {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 xl:px-10 py-6 md:py-10 animate-pulse">
      {/* Image gallery skeleton */}
      <div className="flex gap-2 md:gap-3 mb-6 md:mb-8">
        <div className="flex-1 aspect-[4/3] bg-gray-200 rounded-lg md:rounded-xl" />
        <div className="flex-1 aspect-[4/3] bg-gray-200 rounded-lg md:rounded-xl" />
      </div>

      {/* Title skeleton */}
      <div className="h-8 w-3/4 bg-gray-200 rounded mb-6 md:mb-8" />

      {/* Map skeleton */}
      <div className="w-full aspect-[16/9] bg-gray-200 rounded-xl mb-6 md:mb-8" />

      {/* Info skeleton */}
      <div className="flex flex-col gap-4 mb-8 md:mb-10">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-3">
            <div className="w-[130px] h-5 bg-gray-200 rounded" />
            <div className="flex-1 h-5 bg-gray-200 rounded" />
          </div>
        ))}
      </div>

      <hr className="border-gray-200 mb-8 md:mb-10" />

      {/* Currency section skeleton */}
      <div className="h-6 w-1/3 bg-gray-200 rounded mb-4" />
      <div className="flex flex-wrap gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-[140px] h-10 bg-gray-200 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
