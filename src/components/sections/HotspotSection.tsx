"use client";

import { useState } from "react";

const locations = [
  "All",
  "Myeongdong",
  "Emergency/Convenience",
  "Hotels",
  "Subway",
  "Airport/Visitors",
  "Hongdae/Sinchon",
  "Gangnam",
  "Busan",
];

const kiosks = [
  {
    id: 1,
    name: "Myeongdong GS25",
    address: "24/25 Myeongdong Building 1Floor",
    image: null,
  },
  {
    id: 2,
    name: "Gaon",
    address: "Arcade Building 1Floor",
    image: null,
  },
  {
    id: 3,
    name: "Dongdaemun (Doota)",
    address: "Doota Mall 3rd floor Exchange Counter, 275 Jangchungdan-ro, Jung-gu",
    image: null,
  },
  {
    id: 4,
    name: "JNP",
    address: "Insa-Tuk Passenger Terminal 1st Floor Entry",
    image: null,
  },
  {
    id: 5,
    name: "Gwanghwamun D.Compassman",
    address: "Seoul, Jongno-gu Area Underground Shopping Mall B1",
    image: null,
  },
];

export default function HotspotSection() {
  const [activeLocation, setActiveLocation] = useState("All");

  return (
    <section className="w-full bg-[#F5F5F5] py-8 md:py-[100px]">
      <div className="mx-auto max-w-[1920px] px-4 md:px-10 xl:px-[320px]">
        <h2 className="mb-6 text-center text-[24px] font-bold leading-[1.3] text-[#111] md:mb-10 md:text-[40px] md:leading-[60px]">
          Kiosks in Hotspot
        </h2>

        {/* Location filters - Desktop: pill buttons */}
        <div className="mb-8 hidden flex-wrap justify-center gap-3 md:flex">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setActiveLocation(loc)}
              className={`rounded-full border px-6 py-3 text-[14px] transition-colors ${
                activeLocation === loc
                  ? "border-[#111] bg-[#111] text-white"
                  : "border-[#D4D4D4] bg-white text-[#111] hover:border-[#111]"
              }`}
            >
              {loc}
            </button>
          ))}
        </div>

        {/* Location filters - Mobile: text links */}
        <div className="mb-6 flex flex-wrap justify-center gap-x-4 gap-y-2 md:hidden">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setActiveLocation(loc)}
              className={`text-[13px] transition-colors ${
                activeLocation === loc
                  ? "font-semibold text-[#111]"
                  : "text-[#111]/50"
              }`}
            >
              {loc}
            </button>
          ))}
        </div>

        {/* Kiosk cards - horizontal scroll */}
        <div className="scrollbar-hide -mx-4 flex gap-4 overflow-x-auto px-4 md:mx-0 md:gap-5 md:px-0">
          {kiosks.map((kiosk) => (
            <div
              key={kiosk.id}
              className="flex w-[280px] shrink-0 flex-col overflow-hidden rounded-[16px] bg-white shadow-sm md:w-[360px]"
            >
              {/* Image placeholder */}
              <div className="flex h-[200px] items-center justify-center bg-[#E5E5E5] md:h-[240px]">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#A3A3A3"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <div className="flex flex-col gap-1 p-4">
                <h4 className="text-[16px] font-semibold text-[#111]">
                  {kiosk.name}
                </h4>
                <p className="text-[13px] leading-[20px] text-[#111]/50">
                  {kiosk.address}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* See More button */}
        <div className="mt-8 flex justify-center">
          <button className="rounded-full border border-[#111] px-8 py-3 text-[14px] font-medium text-[#111] transition-colors hover:bg-[#111] hover:text-white">
            See More
          </button>
        </div>
      </div>
    </section>
  );
}
