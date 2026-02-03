"use client";

import ImageWithFallback from "@/components/ui/ImageWithFallback";

const R2_BASE_URL = process.env.NEXT_PUBLIC_R2_BASE_URL;

const brands = [
  { name: "OLIVE YOUNG", logo: `${R2_BASE_URL}/olive_young_logo.png`, width: 266, height: 30 },
  { name: "DAISO", logo: `${R2_BASE_URL}/daiso_logo.png`, width: 169, height: 40 },
  { name: "GS25", logo: `${R2_BASE_URL}/gs_25_logo.png`, width: 127, height: 40 },
  { name: "CU", logo: `${R2_BASE_URL}/cu_logo.png`, width: 74, height: 46 },
  { name: "eSIM", logo: `${R2_BASE_URL}/esim_logo.png`, width: 150, height: 51 },
];

export default function ProductSection() {
  return (
      <section
          className="w-full overflow-hidden py-12 md:gap-[70px] md:py-[100px]"
          style={{
            background: "radial-gradient(ellipse at center, #111111 0%, #2a2409 50%, #443800 100%)",
          }}
      >

        <div className="flex w-full flex-col items-center gap-[20px] text-center md:gap-[30px] 2xl:px-[360px] px-4">
          {/* Main title: text-[40px] leading-[60px] */}
          <h2 className="text-[24px] font-normal capitalize leading-[1.4] text-white md:text-[32px] lg:text-[40px] lg:leading-[60px]">
            Before You Travel, Stop By Dozn Exchange!
          </h2>
          {/* Subtitle: text-[20px] leading-[40px] */}
          <p className="text-[14px] leading-[1.6] text-white md:text-[18px] lg:text-[20px] lg:leading-[40px]">
            Exchange your money and grab Olive Young, GS25, CU, and Daiso gift cards
            <br className="hidden md:block"/>
            Even eSIMs are ready to go!
          </p>
        </div>

        <div className="h-[70px]" />

        {/* Brand Logos: gap-[50px] */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-[50px] 2xl:px-[460px] px-4 xl:px-[140px]">
          {brands.map((brand) => (
              <div
                  key={brand.name}
                  className="relative flex items-center justify-center"
              >
                <ImageWithFallback
                    src={brand.logo}
                    alt={brand.name}
                    width={Math.round(brand.width * 0.5)}
                    height={Math.round(brand.height * 0.5)}
                    className="object-contain"
                />
              </div>
          ))}
        </div>

        {/* Container: px-[360px] py-[100px] w-[1920px] gap-[70px] */}
        {/*<div*/}
        {/*    className="mx-auto flex w-full max-w-[1920px] flex-col items-center gap-[40px] px-4 py-12 md:gap-[70px] md:px-[360px] md:py-[100px]">*/}
        {/*  /!* Title: gap-[30px] *!/*/}



        {/*</div>*/}
      </section>
  );
}
