'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Clock, ImageIcon, Share2, X } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { LocationItem } from '../../types';

// CurrencyCode → 국기 이미지 경로 매핑
const CURRENCY_FLAG_MAP: Record<string, { src: string; alt: string }> = {
  AUD: { src: '/images/flags/au.svg', alt: 'AUD' },
  CAD: { src: '/images/flags/ca.svg', alt: 'CAD' },
  CNY: { src: '/images/flags/cn.svg', alt: 'CNY' },
  EUR: { src: '/images/flags/eu.svg', alt: 'EUR' },
  GBP: { src: '/images/flags/gb.svg', alt: 'GBP' },
  HKD: { src: '/images/flags/hk.svg', alt: 'HKD' },
  IDR: { src: '/images/flags/id.svg', alt: 'IDR' },
  JPY: { src: '/images/flags/jp.svg', alt: 'JPY' },
  MYR: { src: '/images/flags/my.svg', alt: 'MYR' },
  PHP: { src: '/images/flags/ph.svg', alt: 'PHP' },
  SGD: { src: '/images/flags/sg.svg', alt: 'SGD' },
  THB: { src: '/images/flags/th.svg', alt: 'THB' },
  TWD: { src: '/images/flags/tw.svg', alt: 'TWD' },
  USD: { src: '/images/flags/us.svg', alt: 'USD' },
  VND: { src: '/images/flags/vn.svg', alt: 'VND' },
};

interface MapThumbnailProps {
  location: LocationItem;
  onClose: () => void;
  className?: string;
}

export default function MapThumbnail({ location, onClose, className }: MapThumbnailProps) {
  const locale = useLocale();

  // 서비스 목록을 문자열로 변환
  const servicesText = location.serviceList.map((s) => s.name).join(' / ');

  // 운영시간 조합
  const operatingHours =
    location.openTime && location.closeTime
      ? `${location.operationDay} ${location.openTime} ~ ${location.closeTime}`
      : location.operationDay;

  // terminalCurrencyList에서 중복 제거된 통화 코드 목록 (KRW 제외)
  const uniqueCurrencies = [
    ...new Set(
      location.terminalCurrencyList.map((c) => c.currencyCode).filter((code) => code !== 'KRW')
    ),
  ];

  // 공유 버튼 클릭 시 링크 복사
  const handleShare = async () => {
    const url = `${window.location.origin}/${locale}/kiosk/${location.terminalId}`;

    try {
      await navigator.clipboard.writeText(url);
      toast.success('링크가 복사되었습니다.');
    } catch {
      toast.error('링크 복사에 실패했습니다.');
    }
  };

  return (
    <div
      className={cn(
        'relative bg-white flex flex-col gap-2 p-4 rounded-[20px] w-[360px]',
        className
      )}
    >
      {/* 통화 표시 영역 */}
      {uniqueCurrencies.length > 0 && (
        <div className="flex items-center gap-2">
          {/* 한국 국기 (원화) */}
          <div className="w-9 h-6 border border-[#c7cbda] overflow-hidden rounded-sm">
            <Image
              src="/images/flags/kr.svg"
              alt="KRW"
              width={36}
              height={24}
              className="object-cover w-full h-full"
            />
          </div>

          {/* 화살표 */}
          <span className="text-[#717895] text-sm">→</span>

          {/* 외화 국기들 (terminalCurrencyList 기반) */}
          {uniqueCurrencies.map((code) => {
            const flag = CURRENCY_FLAG_MAP[code];
            if (!flag) return null;
            return (
              <div
                key={code}
                className="w-9 h-6 border border-[#c7cbda] overflow-hidden rounded-sm"
              >
                <Image
                  src={flag.src}
                  alt={flag.alt}
                  width={36}
                  height={24}
                  className="object-cover w-full h-full"
                />
              </div>
            );
          })}
        </div>
      )}

      {/* 정보 영역 */}
      <div className="flex gap-4 items-start">
        {/* 왼쪽: 텍스트 정보 */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          {/* 장소명 */}
          <Link
            href={`/${locale}/kiosk/${location.terminalId}`}
            className="text-[16px] font-bold leading-[30px] text-[#111] capitalize line-clamp-2 hover:underline"
          >
            {location.terminalName}
          </Link>

          {/* 운영시간 */}
          <div className="flex items-start gap-2">
            <Clock className="w-5 h-5 text-primary shrink-0" />
            <p className="text-[13px] leading-5 text-[#717895] flex-1">{operatingHours}</p>
          </div>

          {/* 서비스 */}
          <div className="flex items-start gap-2">
            <Image
              src="/images/icons/building.svg"
              alt="Services"
              width={20}
              height={20}
              className="shrink-0"
            />
            <p className="text-[13px] leading-5 text-[#717895] flex-1">{servicesText}</p>
          </div>
        </div>

        {/* 오른쪽: 이미지 & 공유 버튼 */}
        <div className="flex flex-col items-end justify-between shrink-0 self-stretch">
          {/* 장소 이미지 */}
          {location.image01 ? (
            <div className="w-20 h-20 rounded-lg overflow-hidden">
              <Image
                src={location.image01}
                alt={location.terminalName}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-gray-300" />
            </div>
          )}

          {/* 공유 버튼 */}
          <button
            type="button"
            onClick={handleShare}
            className="w-6 h-6 border border-[#d8dce9] rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Share2 className="w-4 h-4 text-[#717895]" />
          </button>
        </div>
      </div>

      {/* 닫기 버튼 (우측 상단) */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X className="w-4 h-4 text-[#717895]" />
      </button>
    </div>
  );
}
