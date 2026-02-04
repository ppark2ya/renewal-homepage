import { ChevronDown } from 'lucide-react';
import { R2_BASE_URL } from '@/constants';

/**
 * 히어로 섹션 - 전체 화면 비디오 배경과 메인 헤드라인
 * Server Component - 상태나 이벤트 핸들러가 필요 없음
 */
export default function HeroSection() {
  return (
    <section
      className="relative h-[100vh] w-full overflow-hidden bg-white"
      aria-label="Dozn Exchange 메인 배너"
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src={`${R2_BASE_URL}/home_video.mp4`} type="video/mp4" />
        </video>
        {/* Overlay with gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(50% 50% at 50% 50%, rgba(255, 247, 209, 0.30) 0%, rgba(255, 211, 0, 0.30) 100%), linear-gradient(0deg, rgba(255, 211, 0, 0.60) 0%, rgba(255, 211, 0, 0.60) 100%)`,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Content - centered */}
      <div className="absolute left-1/2 top-1/2 flex w-full max-w-[1200px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[20px] px-4 text-center text-[#111] md:gap-[30px] lg:px-0">
        {/* Subtitle */}
        <p className="text-[16px] leading-normal md:text-[24px] lg:text-[30px]">
          At the best exchange rate at the moment you want
        </p>

        {/* Main Title */}
        <h1 className="whitespace-pre-wrap text-[36px] font-extrabold leading-[1.3] md:text-[50px] lg:text-[70px]">
          <span>BEST RATE, </span>
          <br />
          <span>FASTER EXCHANGE</span>
        </h1>

        {/* Description */}
        <p className="text-[14px] leading-[1.4] md:text-[20px] lg:text-[24px]">
          &quot;365 days, 24 hours, the closest unmanned exchange kiosk&quot;
          <br />
          Exchange foreign currency quickly and safely anywhere in the country at Dozn Exchange.
        </p>
      </div>

      {/* Pager dots - indicates multiple slides (future enhancement) */}
      <div
        className="absolute bottom-[40px] left-4 flex items-center gap-4 md:bottom-[56px] 2xl:left-[320px]"
        aria-hidden="true"
      >
        <div className="h-[12px] w-[60px] rounded-[8px] bg-[#111] md:h-[16px] md:w-[80px]" />
        <div className="size-[12px] rounded-[8px] bg-[#111]/50 md:size-[16px]" />
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-[20px] left-1/2 -translate-x-1/2 md:bottom-[30px]"
        aria-label="아래로 스크롤"
      >
        <ChevronDown className="size-6 animate-bounce text-[#111]" />
      </div>
    </section>
  );
}
