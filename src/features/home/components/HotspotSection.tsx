'use client';

import { useState } from 'react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ViewAllButton } from '@/components/ui/ViewAllButton';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { KIOSKS, LOCATION_FILTERS } from '@/constants/data';
import type { LocationFilter } from '@/constants/data';
import type { Kiosk } from '@/types';
import styles from './HotspotSection.module.css';

interface KioskCardProps {
  kiosk: Kiosk;
}

function KioskCard({ kiosk }: KioskCardProps) {
  return (
    <article className="flex w-[288px] flex-col items-center gap-3 md:w-[360px] md:gap-4">
      {/* Image with rounded corners - ratio 360:230 */}
      <div className="relative aspect-[360/230] w-full overflow-hidden rounded-[20px] bg-[#E5E5E5]">
        <ImageWithFallback
          src={kiosk.image}
          alt={kiosk.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 288px, 360px"
          fallbackType="icon"
        />
      </div>
      {/* City tag */}
      <span className="rounded-[8px] bg-[#F5F5F5] px-4 py-2 text-[14px] font-medium text-[#111] md:text-[16px]">
        {kiosk.city}
      </span>
      {/* Branch name */}
      <h3 className="text-center text-[16px] font-medium text-[#111] md:text-[18px]">
        {kiosk.name}
      </h3>
    </article>
  );
}

interface LocationFilterButtonProps {
  location: LocationFilter;
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

/**
 * 핫스팟 키오스크 섹션
 * - 위치 필터 버튼
 * - 자동 스크롤 캐러셀
 */
export default function HotspotSection() {
  const [activeLocation, setActiveLocation] = useState<LocationFilter>('All');

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

  // 필터링된 키오스크 (향후 API 연동 시 사용)
  // const filteredKiosks = activeLocation === 'All'
  //   ? KIOSKS
  //   : KIOSKS.filter(kiosk => kiosk.city === activeLocation);

  return (
    <section className="w-full overflow-hidden bg-white" aria-labelledby="hotspot-title">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col items-center gap-[30px] py-8 md:gap-[50px] md:py-[100px]">
        {/* Title & Location filters */}
        <div className="flex w-full flex-col items-center gap-[30px] px-4 md:gap-[50px] xl:px-[32px] 2xl:px-[360px]">
          <SectionTitle>Kiosks in Hotspot</SectionTitle>

          {/* Location filters */}
          <div className="flex w-full flex-wrap justify-center gap-3 md:gap-[16px]" role="group" aria-label="위치 필터">
            {LOCATION_FILTERS.map((loc) => (
              <LocationFilterButton
                key={loc}
                location={loc}
                isActive={activeLocation === loc}
                onClick={() => setActiveLocation(loc)}
              />
            ))}
          </div>
        </div>

        {/* Kiosk cards - Embla Carousel */}
        <div className={styles.embla} ref={emblaRef}>
          <div className={styles.embla__container} role="list">
            {KIOSKS.map((kiosk) => (
              <div key={kiosk.id} className={styles.embla__slide} role="listitem">
                <KioskCard kiosk={kiosk} />
              </div>
            ))}
          </div>
        </div>

        {/* See More button */}
        <div className="flex justify-center">
          <ViewAllButton>View All Kiosks {'>>'}</ViewAllButton>
        </div>
      </div>
    </section>
  );
}
