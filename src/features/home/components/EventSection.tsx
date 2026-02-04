'use client';

import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ViewAllButton } from '@/components/ui/ViewAllButton';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { EVENTS } from '@/constants/data';
import type { KoreaEvent } from '@/types';

interface EventCardProps {
  event: KoreaEvent;
}

function EventCard({ event }: EventCardProps) {
  return (
    <article className="min-w-0 flex-[0_0_100%] cursor-pointer px-4 sm:flex-[0_0_320px] sm:px-0 w-[320px] h-[400px]">
      {/* Thumbnail */}
      <div className="relative aspect-square w-full overflow-hidden rounded-[16px] bg-[#D4D4D4] sm:aspect-auto sm:h-[320px]">
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) calc(100vw - 2rem), 320px"
          fallbackType="icon"
        />
      </div>
      {/* Info */}
      <div className="mt-4 flex flex-col gap-1">
        <time
          className="text-center text-[12px] font-bold text-[#FA0] md:text-[14px]"
          dateTime={event.startAt}
        >
          {event.startAt} ~ {event.endAt}
        </time>
        <h3 className="line-clamp-2 text-[14px] font-medium leading-[20px] text-[#111] md:text-[16px] md:leading-[24px]">
          {event.title}
        </h3>
      </div>
    </article>
  );
}

/**
 * 이벤트 섹션 - 한국 이벤트 캐러셀
 */
export default function EventSection() {
  const [emblaRef] = useEmblaCarousel(
    {
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: false,
      slidesToScroll: 1,
    },
    [
      WheelGesturesPlugin({
        forceWheelAxis: 'x',
      }),
    ]
  );

  return (
    <section className="w-full bg-[#F5F5F5]" aria-labelledby="events-title">
      <div className="mx-auto flex w-full flex-col items-center gap-[30px] py-8 md:gap-[50px] md:py-[100px]">
        <SectionTitle className="px-4">Events To Watch In Korea Right Now</SectionTitle>

        {/* Event cards - Embla Carousel */}
        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div
            className="flex sm:gap-4 sm:pl-4 md:gap-[30px] md:pl-[max(1rem,calc((100vw-1720px)/2))]"
            role="list"
          >
            {EVENTS.map((event) => (
              <div key={event.id} role="listitem">
                <EventCard event={event} />
              </div>
            ))}
            {/* Right spacer for proper end alignment */}
            <div
              className="w-4 shrink-0 md:w-[max(1rem,calc((100vw-1720px)/2-30px))]"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* See More button */}
        <div className="flex justify-center">
          <ViewAllButton>View All {'>>'}</ViewAllButton>
        </div>
      </div>
    </section>
  );
}
