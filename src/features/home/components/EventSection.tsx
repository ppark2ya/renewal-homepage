"use client";

import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import {WheelGesturesPlugin} from "embla-carousel-wheel-gestures";

const events = [
  {
    id: 1,
    title: "Pohang Yeongil Cheongteo Festival",
    subtitle: "Event Information",
    image: "/images/events/event-1.svg",
    startAt: "2025-07-07",
    endAt: "2025-07-07",
  },
  {
    id: 2,
    title: "Korea Beauty Festival",
    subtitle: "Event Information",
    image: "/images/events/event-2.svg",
    startAt: "2025-07-07",
    endAt: "2025-07-07",
  },
  {
    id: 3,
    title: "all nights INCHEON Wolmi·Gaekangjang night market",
    subtitle: "Event Information",
    image: "/images/events/event-3.svg",
    startAt: "2025-07-07",
    endAt: "2025-07-07",
  },
  {
    id: 4,
    title: "Lotteworld Adventure Korean Adventure",
    subtitle: "Event Information",
    image: "/images/events/event-4.svg",
    startAt: "2025-07-07",
    endAt: "2025-07-07",
  },
  {
    id: 5,
    title: "Han River Night Tour",
    subtitle: "Event Information",
    image: "/images/events/event-5.svg",
    startAt: "2025-07-07",
    endAt: "2025-07-07",
  },
];

export default function EventSection() {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    slidesToScroll: 1,

  }, [
    WheelGesturesPlugin({
      forceWheelAxis: "x",
    }),
  ]);

  return (
    <section className="w-full bg-[#F5F5F5]">
      {/* Container: py-[100px] w-[1920px] */}
      <div className="mx-auto flex w-full flex-col items-center gap-[30px] py-8 md:gap-[50px] md:py-[100px]">
        {/* Title: text-[40px] leading-[60px] */}
        <h2 className="px-4 text-center text-[24px] font-normal capitalize leading-[1.3] text-[#111] md:text-[32px] lg:text-[40px] lg:leading-[60px]">
          Events To Watch In Korea Right Now
        </h2>

        {/* Event cards - Embla Carousel */}
        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div className="flex sm:gap-4 sm:pl-4 md:gap-[30px] md:pl-[max(1rem,calc((100vw-1720px)/2))]">
            {events.map((event) => (
              <div
                key={event.id}
                className="min-w-0 flex-[0_0_100%] cursor-pointer px-4 sm:flex-[0_0_320px] sm:px-0"
              >
                {/* Thumbnail: h-[260px] */}
                <div className="relative aspect-square w-full overflow-hidden rounded-[16px] bg-[#D4D4D4] sm:h-[320px] sm:aspect-auto">
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
                  <span className="text-[12px] text-[#111]/40 md:text-[14px] font-bold text-center text-[#FA0]">
                    {event.startAt} ~ {event.endAt}
                  </span>
                  <h4 className="line-clamp-2 text-[14px] font-medium leading-[20px] text-[#111] md:text-[16px] md:leading-[24px]">
                    {event.title}
                  </h4>
                </div>
              </div>
            ))}
            {/* Right spacer for proper end alignment */}
            <div className="shrink-0 w-4 md:w-[max(1rem,calc((100vw-1720px)/2-30px))]" />
          </div>
        </div>

        {/* See More button */}
        <div className="flex justify-center">
          <Button className="h-[50px] rounded-full border border-[#FFD300] bg-[#FFD300] px-8 text-[14px] font-medium text-[#111] hover:bg-[#111] hover:text-white md:text-[16px]">
            View All {">>"}
          </Button>
        </div>
      </div>
    </section>
  );
}
