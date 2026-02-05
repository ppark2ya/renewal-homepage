'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { X, Clock, Share2, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { LocationItem } from '../../types';

interface MapThumbnailProps {
  location: LocationItem;
  onClose: () => void;
  className?: string;
}

// 서비스 라벨 변환
function getServiceLabel(service: string): string {
  switch (service) {
    case 'foreignToKrw':
      return 'Foreign → KRW';
    case 'krwToForeign':
      return 'KRW → Foreign';
    case 'taxRefund':
      return 'TAX REFUND';
    case 'ezlCardTopup':
      return 'Prepaid card';
    default:
      return service;
  }
}

export default function MapThumbnail({
  location,
  onClose,
  className,
}: MapThumbnailProps) {
  const locale = useLocale();

  // 서비스 목록을 문자열로 변환
  const servicesText = location.services
    .map(getServiceLabel)
    .join(' / ');

  // 공유 버튼 클릭 시 링크 복사
  const handleShare = async () => {
    const url = `${window.location.origin}/${locale}/kiosk/${location.id}`;

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

        {/* 외화 국기들 */}
        <div className="w-9 h-6 overflow-hidden rounded-sm">
          <Image
            src="/images/flags/cn.svg"
            alt="CNY"
            width={36}
            height={24}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-9 h-6 overflow-hidden rounded-sm">
          <Image
            src="/images/flags/us.svg"
            alt="USD"
            width={36}
            height={24}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-9 h-6 border border-[#c7cbda] overflow-hidden rounded-sm">
          <Image
            src="/images/flags/jp.svg"
            alt="JPY"
            width={36}
            height={24}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* 정보 영역 */}
      <div className="flex gap-4 items-start">
        {/* 왼쪽: 텍스트 정보 */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          {/* 장소명 */}
          <p className="text-[16px] font-bold leading-[30px] text-[#111] capitalize line-clamp-2">
            {location.name}
          </p>

          {/* 운영시간 */}
          <div className="flex items-start gap-2">
            <Clock className="w-5 h-5 text-primary shrink-0" />
            <p className="text-[13px] leading-5 text-[#717895] flex-1">
              {location.operatingHours}
            </p>
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
            <p className="text-[13px] leading-5 text-[#717895] flex-1">
              {servicesText}
            </p>
          </div>
        </div>

        {/* 오른쪽: 이미지 & 공유 버튼 */}
        <div className="flex flex-col items-end justify-between shrink-0 self-stretch">
          {/* 장소 이미지 */}
          {location.image ? (
            <div className="w-20 h-20 rounded-lg overflow-hidden">
              <Image
                src={location.image}
                alt={location.name}
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
