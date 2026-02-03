"use client";

import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { Button } from "@/components/ui/button";

const R2_BASE_URL = process.env.NEXT_PUBLIC_R2_BASE_URL;

const categories = [
  {
    id: "customer-center",
    title: "Customer",
    subtitle: "Service Center",
    icon: `${R2_BASE_URL}/customer_service_center_icon.png`,
    hasBadge: false,
    badgeText: "Up to 100% discount",
  },
  {
    id: "location",
    title: "Kiosk",
    subtitle: "Location",
    icon: `${R2_BASE_URL}/krw_kiosk_localtion_icon.png`,
    hasBadge: false,
    badgeText: "Up to 100% discount",
  },
  {
    id: "exchange",
    title: "KRW →",
    subtitle: "Foreign Currency",
    icon: `${R2_BASE_URL}/foreign_currency_icon.png`,
    hasBadge: true,
    badgeText: "Up to 100% discount",
  },
  {
    id: "rate",
    title: "Real-Time",
    subtitle: "Exchange Rate",
    icon: `${R2_BASE_URL}/real_time_exchange_rate_icon.png`,
    hasBadge: false,
    badgeText: "Up to 100% discount",
  },
  {
    id: "card",
    title: "Tax Free",
    subtitle: "Refund Code",
    icon: `${R2_BASE_URL}/the_free_prepaid_card_icon.png`,
    hasBadge: false,
    badgeText: "Up to 100% discount",
  },
];

function CategoryIcon({ icon, name }: { icon: string; name: string }) {
  return (
    <div className="relative h-[80px] w-[140px] md:h-[120px] md:w-[200px]">
      <ImageWithFallback
        src={icon}
        alt={name}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 140px, 200px"
      />
    </div>
  );
}

export default function CategorySection() {
  return (
    <section >
      {/* Desktop: w-[1920px] centered with px-[320px] py-[100px] */}
      <div className="mx-auto flex w-full items-center justify-center gap-[10px] overflow-x-auto px-4 py-8 2xl:px-[180px] py-8 lg:py-[100px]!">
        {/* Desktop: 5 cards in a row */}
        <div className="hidden w-full gap-[10px] lg:flex">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="relative flex h-[320px] flex-col items-center pt-[10px] flex-1 min-w-[160px] w-[240px]"
            >
              {/* Badge */}
              {cat.hasBadge && (
                <div className="absolute -top-[11px] left-1/2 z-10 -translate-x-1/2">
                  <div className="relative flex h-[50px] w-[175px] flex-col items-start overflow-hidden">
                    <div className="relative h-[40px] w-[167px]">
                      <div className="absolute left-0 top-0 flex h-[30px] items-center justify-center rounded-[100px] bg-[#FF2C2C] px-[20px] py-[10px]">
                        <p className="whitespace-nowrap text-center text-[14px] capitalize leading-[30px] text-white">
                          {cat.badgeText}
                        </p>
                      </div>
                      <div className="absolute left-1/2 top-[30px] -translate-x-1/2">
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                          <path d="M6 10L0 0H12L6 10Z" fill="#FF2C2C" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <Button
                variant="ghost"
                className="flex h-[300px] w-full flex-col items-center justify-center gap-[20px] rounded-[20px] border border-white bg-[#FFF2B2] px-[10px] py-[60px] transition-transform hover:scale-[1.02] hover:bg-[#FFF2B2]/80"
              >
                <CategoryIcon icon={cat.icon} name={cat.title} />
                <div className="text-center text-[0px] capitalize leading-[30px] text-[#111]">
                  <p className="mb-0 text-[20px]">{cat.title}</p>
                  <p className="text-[16px]">{cat.subtitle}</p>
                </div>
              </Button>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet: 2 cols, 3rd item full width */}
        <div className="grid w-full grid-cols-2 gap-3 lg:hidden">
          {categories.map((cat, index) => (
            <div
              key={cat.id}
              className={`relative pt-[10px] ${index === 2 ? "col-span-2" : ""}`}
            >
              {cat.hasBadge && (
                <div className="absolute -top-[1px] left-1/2 z-10 -translate-x-1/2">
                  <div className="relative">
                    <div className="whitespace-nowrap rounded-full bg-[#FF2C2C] px-3 py-1 text-[11px] text-white shadow-md">
                      {cat.badgeText}
                    </div>
                    <div className="mx-auto size-0 border-x-[5px] border-t-[5px] border-x-transparent border-t-[#FF2C2C]" />
                  </div>
                </div>
              )}
              <Button
                variant="ghost"
                className={`flex w-full flex-col items-center justify-center gap-2 rounded-[16px] bg-[#FFF2B2] px-3 py-5 hover:bg-[#FFF2B2]/80 ${
                  index === 2 ? "h-[130px]" : "h-[160px]"
                }`}
              >
                <CategoryIcon icon={cat.icon} name={cat.title} />
                <div className="text-center text-[13px] leading-[20px] text-[#111]">
                  <p className="mb-0">{cat.title}</p>
                  <p>{cat.subtitle}</p>
                </div>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
