"use client";

import { useState } from "react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import styles from "./HotspotSection.module.css";

const locations = [
  "All",
  "Myeongdong",
  "Gyeongbokgung / Gwanghwamun",
  "Insadong",
  "Seongsu",
  "Hongdae / Sinchon",
  "Apgujeong / Sinsa",
  "Busan",
  "Jeju",
];

const kiosks = [
  {
    id: 1,
    name: "GS25 Gwangan Bridge Branch",
    city: "Busan",
    image: "/images/kiosks/kiosk-1.jpg",
  },
  {
    id: 2,
    name: "GS25 Myeongdong Branch",
    city: "Seoul",
    image: "/images/kiosks/kiosk-2.jpg",
  },
  {
    id: 3,
    name: "GS25 Hongdae Branch",
    city: "Seoul",
    image: "/images/kiosks/kiosk-3.jpg",
  },
  {
    id: 4,
    name: "GS25 Jeju Airport Branch",
    city: "Jeju",
    image: "/images/kiosks/kiosk-4.jpg",
  },
  {
    id: 5,
    name: "GS25 Haeundae Branch",
    city: "Busan",
    image: "/images/kiosks/kiosk-5.jpg",
  },
];

export default function HotspotSection() {
  const [activeLocation, setActiveLocation] = useState("All");

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      align: "start",
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
        forceWheelAxis: "x",
      }),
    ]
  );

  return (
    <section className="w-full overflow-hidden bg-white">
      {/* Container: py-[100px] w-[1920px] gap-[50px] */}
      <div className="mx-auto flex w-full max-w-[1920px] flex-col items-center gap-[30px] py-8 md:gap-[50px] md:py-[100px]">
        {/* Title area: px-[360px] gap-[50px] */}
        <div className="flex w-full flex-col items-center gap-[30px] px-4 md:gap-[50px] 2xl:px-[360px] xl:px-[32px]">
          {/* Title: text-[40px] leading-[60px] */}
          <h2 className="text-center text-[24px] font-normal capitalize leading-[1.3] text-[#111] md:text-[32px] lg:text-[40px] lg:leading-[60px]">
            Kiosks in Hotspot
          </h2>

          {/* Location filters: w-[1200px] gap-[16px] */}
          <div className="flex w-full flex-wrap justify-center gap-3 md:gap-[16px]">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setActiveLocation(loc)}
                className={`h-[40px] cursor-pointer rounded-[100px] px-4 py-2 text-[14px] capitalize transition-colors md:h-[50px] md:px-[30px] md:py-[10px] md:text-[16px] ${
                  activeLocation === loc
                    ? "border border-[#FFD300] bg-[#FFF2B2] font-bold text-[#111]"
                    : "bg-[#FFF9DF] font-normal text-[#111]"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Kiosk cards - Embla Carousel */}
        <div className={styles.embla} ref={emblaRef}>
          <div className={styles.embla__container}>
            {kiosks.map((kiosk) => (
              <div key={kiosk.id} className={styles.embla__slide}>
                <div className="flex w-[288px] flex-col items-center gap-3 md:w-[360px] md:gap-4">
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
                  <div className="rounded-[8px] bg-[#F5F5F5] px-4 py-2">
                    <span className="text-[14px] font-medium text-[#111] md:text-[16px]">
                      {kiosk.city}
                    </span>
                  </div>
                  {/* Branch name */}
                  <h4 className="text-center text-[16px] font-medium text-[#111] md:text-[18px]">
                    {kiosk.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* See More button */}
        <div className="flex justify-center">
          <button className="h-[50px] rounded-full border border-[#FFD300] bg-[#FFD300] px-8 text-[14px] font-medium text-[#111] transition-colors hover:bg-[#111] hover:text-white md:text-[16px]">
            View All Kiosks {">>"}
          </button>
        </div>
      </div>
    </section>
  );
}
