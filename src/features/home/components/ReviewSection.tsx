'use client';

import { SectionTitle } from '@/components/ui/SectionTitle';
import { FlagIcon } from '@/components/ui/FlagIcon';
import { CarouselDots } from '@/components/ui/CarouselDots';
import { useCarouselWithAutoplay } from '@/hooks';
import { REVIEWS } from '@/constants/data';
import type { Review, ReviewCardVariant } from '@/types';

interface ReviewCardProps {
  review: Review;
  variant?: ReviewCardVariant;
}

function ReviewCard({ review, variant = 'default' }: ReviewCardProps) {
  const variantClasses: Record<ReviewCardVariant, string> = {
    default: 'w-[413px] h-full p-[32px]',
    medium: 'w-[300px] h-[410px] p-6 overflow-hidden',
    mobile: 'w-full h-full p-[32px] items-center text-center',
  };

  return (
    <article
      className={`flex flex-col gap-[8px] rounded-[16px] bg-white shadow-[0px_4px_12px_0px_rgba(255,115,0,0.25)] ${variantClasses[variant]}`}
    >
      <FlagIcon src={review.flag} />
      <p
        className="text-[16px] font-bold capitalize leading-[30px] tracking-[-1px] text-[#FF8C00] lg:text-[20px]"
        aria-label="5점 만점"
      >
        ★ ★ ★ ★ ★
      </p>
      <h3 className="text-[14px] font-bold capitalize leading-[30px] text-[#111] lg:text-[16px]">
        {review.location}
      </h3>
      <p
        className={`whitespace-pre-wrap text-[14px] leading-[24px] text-[#111] lg:text-[16px] lg:leading-[30px] ${
          variant === 'medium' ? 'line-clamp-6' : ''
        }`}
      >
        {review.text}
      </p>
    </article>
  );
}

/**
 * 고객 리뷰 섹션
 * - 데스크탑(xl+): 3열 2행 그리드
 * - 태블릿(lg~xl): 3열 2행 그리드 (작은 크기)
 * - 모바일(<lg): Embla 캐러셀 + 자동 재생
 */
export default function ReviewSection() {
  const { emblaRef, selectedIndex, scrollTo } = useCarouselWithAutoplay({
    options: { loop: true, align: 'center', skipSnaps: false },
  });

  return (
    <section
      className="w-full overflow-hidden bg-[#FFD300] px-4 py-8 lg:py-[100px] 2xl:px-[320px]"
      aria-labelledby="review-section-title"
    >
      <div className="mx-auto flex w-full flex-col items-center gap-[30px] md:gap-[50px]">
        <SectionTitle>Why Everyone Chooses Dozn Exchange</SectionTitle>

        {/* Desktop (xl+): 3-column grid with default size */}
        <div className="hidden xl:grid xl:grid-cols-3 xl:gap-[16px]" role="list">
          {REVIEWS.map((review) => (
            <div key={review.id} role="listitem">
              <ReviewCard review={review} variant="default" />
            </div>
          ))}
        </div>

        {/* Tablet (lg~xl): 3-column grid with medium size */}
        <div className="hidden lg:grid xl:hidden lg:grid-cols-3 lg:gap-[16px]" role="list">
          {REVIEWS.map((review) => (
            <div key={review.id} role="listitem">
              <ReviewCard review={review} variant="medium" />
            </div>
          ))}
        </div>

        {/* Mobile (<lg): Embla carousel with autoplay */}
        <div className="w-full lg:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex" role="list">
              {REVIEWS.map((review) => (
                <div key={review.id} className="min-w-0 flex-[0_0_100%] px-2" role="listitem">
                  <ReviewCard review={review} variant="mobile" />
                </div>
              ))}
            </div>
          </div>

          <CarouselDots
            count={REVIEWS.length}
            selectedIndex={selectedIndex}
            onDotClick={scrollTo}
            className="mt-4"
          />
        </div>
      </div>
    </section>
  );
}
