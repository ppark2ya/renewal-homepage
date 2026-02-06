'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ViewAllButton } from '@/components/ui/ViewAllButton';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import {
  useGetKioskListQuery,
  type GetKioskListQuery,
} from '@/graphql/generated/graphql';
import styles from './HotspotSection.module.css';

type KioskInfo = GetKioskListQuery['getKioskList']['list'][number];

interface LocationFilterItem {
  code: string;
  name: string;
}

interface KioskCardProps {
  kiosk: KioskInfo;
}

function KioskCard({ kiosk }: KioskCardProps) {
  // 주소에서 도시명 추출 (첫 번째 단어)
  const city = kiosk.address.split(' ')[0] || '';


  return (
    <Link href={`/kiosk/${kiosk.id}`}>
      <article className="flex w-[288px] flex-col items-center gap-3 md:w-[360px] md:gap-4 cursor-pointer">
        {/* Image with rounded corners - ratio 360:230 */}
        <div className="relative aspect-[360/230] w-full overflow-hidden rounded-[20px] bg-[#E5E5E5]">
          <ImageWithFallback
            src={kiosk.image01}
            alt={kiosk.terminalName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 288px, 360px"
            fallbackType="icon"
          />
        </div>
        {/* City tag */}
        <span className="max-w-full truncate rounded-[8px] bg-[#F5F5F5] px-4 py-2 text-[14px] font-medium text-[#111] md:text-[16px]">
          {city}
        </span>
        {/* Branch name */}
        <h3 className="w-full truncate text-center text-[16px] font-medium text-[#111] md:text-[18px]">
          {kiosk.terminalName}
        </h3>
      </article>
    </Link>
  );
}

interface LocationFilterButtonProps {
  location: string;
  isActive: boolean;
  onClick: () => void;
}

function LocationFilterButton({ location, isActive, onClick }: LocationFilterButtonProps) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`h-[40px] rounded-[100px] px-4 py-2 text-[14px] capitalize md:h-[50px] md:px-[30px] md:py-[10px] md:text-[16px] ${
        isActive
          ? 'border border-[#FFD300] bg-[#FFF2B2] font-bold text-[#111] hover:bg-[#FFF2B2]'
          : 'bg-[#FFF9DF] font-normal text-[#111] hover:bg-[#FFF2B2]'
      }`}
      aria-pressed={isActive}
    >
      {location}
    </Button>
  );
}

interface HotspotSectionClientProps {
  initialKiosks: KioskInfo[];
  locationFilters: LocationFilterItem[];
}

/**
 * 핫스팟 키오스크 섹션 - Client Component
 * - 위치 필터 버튼
 * - 자동 스크롤 캐러셀
 */
export function HotspotSectionClient({ initialKiosks, locationFilters }: HotspotSectionClientProps) {
  const t = useTranslations('HotspotSection');
  const [activeFilterCode, setActiveFilterCode] = useState('');

  // 필터 선택 시 filterList arg로 전달하여 키오스크 목록 재조회
  const { data, loading } = useGetKioskListQuery({
    variables: {
      page: 1,
      size: 15,
      ...(activeFilterCode ? { filterList: [activeFilterCode] } : {}),
    },
  });

  const kiosks = data?.getKioskList.list ?? initialKiosks;

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      align: 'start',
      skipSnaps: true,
      duration: 30,
    },
    [
      AutoScroll({
        speed: 1,
        playOnInit: true,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
      WheelGesturesPlugin({
        forceWheelAxis: 'x',
      }),
    ]
  );


  return (
    <section className="w-full overflow-hidden bg-white" aria-labelledby="hotspot-title">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col items-center gap-[30px] py-8 md:gap-[50px] md:py-[100px]">
        {/* Title & Location filters */}
        <div className="flex w-full flex-col items-center gap-[30px] px-4 md:gap-[50px] xl:px-[32px] 2xl:px-[360px]">
          <SectionTitle>Kiosks in Hotspot</SectionTitle>

          {/* Location filters */}
          <div
            className="flex w-full flex-wrap justify-center gap-3 md:gap-[16px]"
            role="group"
            aria-label="위치 필터"
          >
            {locationFilters.map((filter) => (
              <LocationFilterButton
                key={filter.code}
                location={filter.name}
                isActive={activeFilterCode === filter.code}
                onClick={() => setActiveFilterCode(filter.code)}
              />
            ))}
          </div>
        </div>

        {/* Kiosk cards - Embla Carousel or Empty State */}
        {kiosks.length > 0 ? (
          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.embla__container} role="list">
              {kiosks.map((kiosk) => (
                <div key={kiosk.id} className={styles.embla__slide} role="listitem">
                  <KioskCard kiosk={kiosk} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-[269px] w-full items-center justify-center md:h-[329px]">
            <p className="text-[16px] text-[#999] md:text-[18px]">
              {t('noResults')}
            </p>
          </div>
        )}

        {/* See More button */}
        <div className="flex justify-center">
          <ViewAllButton>View All Kiosks {'>>'}</ViewAllButton>
        </div>
      </div>
    </section>
  );
}
