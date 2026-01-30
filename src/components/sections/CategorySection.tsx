const categories = [
  {
    id: "customer-center",
    label: "Customer\nService Center",
    icon: "headphones",
    hasBadge: false,
  },
  {
    id: "location",
    label: "ATM\nLocation",
    icon: "map-pin",
    hasBadge: false,
  },
  {
    id: "exchange",
    label: "Online\nForeign Currency",
    icon: "exchange",
    hasBadge: true,
    badgeText: "Up to 100% discount",
    isWide: true,
  },
  {
    id: "rate",
    label: "Kiosk\nExchange Rate",
    icon: "trending-up",
    hasBadge: false,
  },
  {
    id: "card",
    label: "Tax Free\nRefund Code",
    icon: "credit-card",
    hasBadge: false,
  },
];

function CategoryIcon({ icon }: { icon: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    headphones: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
    "map-pin": (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    exchange: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
    "trending-up": (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    "credit-card": (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  };
  return <>{iconMap[icon] || null}</>;
}

export default function CategorySection() {
  return (
    <section className="w-full bg-white py-8 md:py-[100px]">
      <div className="mx-auto max-w-[1280px] px-4">
        {/* Desktop: 5 cards in a row */}
        <div className="hidden gap-[10px] md:flex">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="relative flex flex-1 flex-col items-center pt-[10px]"
            >
              {/* Badge */}
              {cat.hasBadge && (
                <div className="absolute -top-[1px] left-1/2 z-10 -translate-x-1/2">
                  <div className="relative">
                    <div className="rounded-full bg-[#FF2C2C] px-5 py-1 text-[14px] text-white shadow-md">
                      {cat.badgeText}
                    </div>
                    <div className="mx-auto size-0 border-x-[6px] border-t-[6px] border-x-transparent border-t-[#FF2C2C]" />
                  </div>
                </div>
              )}
              <button className="flex h-[300px] w-full flex-col items-center justify-center gap-5 rounded-[20px] border border-white bg-[#FFF2B2] px-[10px] py-[60px] transition-transform hover:scale-[1.02]">
                <div className="flex size-[100px] items-center justify-center">
                  <CategoryIcon icon={cat.icon} />
                </div>
                <span className="whitespace-pre-line text-center text-[20px] leading-[30px] text-[#111]">
                  {cat.label}
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Mobile: 2x2 grid + 1 full width */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {categories
            .filter((c) => !c.isWide)
            .map((cat) => (
              <button
                key={cat.id}
                className="flex h-[150px] flex-col items-center justify-center gap-2 rounded-[16px] bg-[#FFF2B2] px-3 py-5"
              >
                <div className="flex size-[60px] items-center justify-center">
                  <CategoryIcon icon={cat.icon} />
                </div>
                <span className="whitespace-pre-line text-center text-[13px] leading-[20px] text-[#111]">
                  {cat.label}
                </span>
              </button>
            ))}
          {/* Full width exchange card */}
          {categories
            .filter((c) => c.isWide)
            .map((cat) => (
              <div key={cat.id} className="relative col-span-2">
                {cat.hasBadge && (
                  <div className="absolute -top-[1px] left-1/2 z-10 -translate-x-1/2">
                    <div className="relative">
                      <div className="rounded-full bg-[#FF2C2C] px-4 py-1 text-[13px] text-white shadow-md">
                        {cat.badgeText}
                      </div>
                      <div className="mx-auto size-0 border-x-[6px] border-t-[6px] border-x-transparent border-t-[#FF2C2C]" />
                    </div>
                  </div>
                )}
                <button className="flex h-[130px] w-full flex-col items-center justify-center gap-2 rounded-[16px] bg-[#FFF2B2] px-3 py-5">
                  <div className="flex size-[60px] items-center justify-center">
                    <CategoryIcon icon={cat.icon} />
                  </div>
                  <span className="text-center text-[13px] leading-[20px] text-[#111]">
                    {cat.label}
                  </span>
                </button>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
