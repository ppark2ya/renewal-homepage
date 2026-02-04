import Image from 'next/image';
import { BRANDS } from '@/constants/data';
import { SectionTitle } from '@/components/ui/SectionTitle';

/**
 * 제휴 브랜드를 보여주는 섹션
 * Server Component - 상태나 이벤트 핸들러가 필요 없음
 */
export default function ProductSection() {
  return (
    <section
      className="w-full overflow-hidden py-12 md:gap-[70px] md:py-[100px]"
      style={{
        background: 'radial-gradient(ellipse at center, #111111 0%, #2a2409 50%, #443800 100%)',
      }}
    >
      <div className="flex w-full flex-col items-center gap-[20px] px-4 text-center md:gap-[30px] 2xl:px-[360px]">
        <SectionTitle className="text-white">
          Before You Travel, Stop By Dozn Exchange!
        </SectionTitle>
        <p className="text-[14px] leading-[1.6] text-white md:text-[18px] lg:text-[20px] lg:leading-[40px]">
          Exchange your money and grab Olive Young, GS25, CU, and Daiso gift cards
          <br className="hidden md:block" />
          Even eSIMs are ready to go!
        </p>
      </div>

      <div className="h-[70px]" aria-hidden="true" />

      {/* Brand Logos */}
      <div
        className="flex flex-wrap items-center justify-center gap-4 px-4 md:gap-[50px] xl:px-[140px] 2xl:px-[460px]"
        role="list"
        aria-label="제휴 브랜드"
      >
        {BRANDS.map((brand) => (
          <div
            key={brand.name}
            className="relative flex items-center justify-center"
            role="listitem"
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              width={Math.round(brand.width * 0.5)}
              height={Math.round(brand.height * 0.5)}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
