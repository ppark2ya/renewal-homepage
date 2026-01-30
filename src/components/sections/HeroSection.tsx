export default function HeroSection() {
  return (
    <section className="relative flex h-[812px] w-full items-center justify-center overflow-hidden bg-[#FFD900] md:h-[1080px]">
      {/* Background placeholder */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFD900] via-[#FFD900]/90 to-[#FFD900]" />

      {/* Background image placeholder */}
      <div className="absolute inset-0 opacity-30">
        <div className="flex size-full items-center justify-center">
          <div className="size-full bg-[url('/images/hero-bg.jpg')] bg-cover bg-center" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-[1280px] flex-col items-center gap-4 px-4 text-center text-[#111] md:gap-[30px]">
        <p className="text-[18px] leading-normal md:text-[30px] md:leading-[36px]">
          At the best exchange rate at the moment you want
        </p>
        <h1 className="text-[40px] font-extrabold leading-[1.2] md:text-[70px] md:leading-[1.3]">
          BEST RATE,
          <br />
          FASTER EXCHANGE
        </h1>
        <p className="max-w-[351px] text-[14px] leading-[1.4] md:max-w-[956px] md:text-[24px]">
          &quot;365 days, 24 hours, the closest unmanned exchange kiosk&quot;
          <br className="hidden md:inline" />
          {" "}Exchange foreign currency quickly and safely anywhere in the
          country at Dozn Exchange.
        </p>
      </div>

      {/* Pager dots */}
      <div className="absolute bottom-6 left-4 flex items-center gap-4 md:bottom-[56px] md:left-[360px]">
        <div className="h-[10px] w-[60px] rounded-full bg-[#111] md:h-[16px] md:w-[80px]" />
        <div className="size-[10px] rounded-full bg-[#111]/50 md:size-[16px]" />
      </div>

      {/* Chevron down */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:bottom-[30px]">
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#111"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-[40px] animate-bounce md:size-[50px]"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
