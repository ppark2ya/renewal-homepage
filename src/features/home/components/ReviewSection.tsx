'use client';

import { SectionTitle } from '@/components/ui/SectionTitle';
import { FlagIcon } from '@/components/ui/FlagIcon';
import { CarouselDots } from '@/components/ui/CarouselDots';
import { useCarouselWithAutoplay } from '@/hooks';
import { REVIEWS } from '@/constants/data';
import type { Review, ReviewCardVariant } from '@/types';
import { getFlagPath } from '@/lib/currency';

interface ReviewCardProps {
  review: Review;
  variant?: ReviewCardVariant;
}

function ReviewCard({ review, variant = 'default' }: ReviewCardProps) {
  const variantClasses: Record<ReviewCardVariant, string> = {
    default: 'w-full h-full p-[32px]',
    medium: 'w-full h-[410px] p-6 overflow-hidden',
    mobile: 'w-full h-full p-[32px] items-center text-center',
  };

  return (
    <article
      className={`flex flex-col gap-[8px] rounded-[16px] bg-white shadow-[0px_4px_12px_0px_rgba(255,115,0,0.25)] ${variantClasses[variant]}`}
    >
      <FlagIcon src={getFlagPath(review.currencyCode)} size="md" />
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

// 리뷰를 6개씩 그룹화하는 함수
function chunkReviews(reviews: Review[], chunkSize: number): Review[][] {
  const chunks: Review[][] = [];
  for (let i = 0; i < reviews.length; i += chunkSize) {
    chunks.push(reviews.slice(i, i + chunkSize));
  }
  return chunks;
}

/**
 * 고객 리뷰 섹션
 * - 데스크탑(xl+): 6개씩 3열 2행 그리드 캐러셀 + 자동 재생
 * - 태블릿(lg~xl): 6개씩 3열 2행 그리드 캐러셀 (작은 크기) + 자동 재생
 * - 모바일(<lg): 1개씩 Embla 캐러셀 + 자동 재생
 */
export default function ReviewSection() {
  // 모바일 캐러셀
  const {
    emblaRef: mobileEmblaRef,
    selectedIndex: mobileSelectedIndex,
    scrollTo: mobileScrollTo,
  } = useCarouselWithAutoplay({
    options: { loop: true, align: 'center', skipSnaps: false },
  });

  // 데스크탑 캐러셀 (6개씩 그룹)
  const {
    emblaRef: desktopEmblaRef,
    selectedIndex: desktopSelectedIndex,
    scrollTo: desktopScrollTo,
  } = useCarouselWithAutoplay({
    options: { loop: true, align: 'start', skipSnaps: false },
  });

  // 태블릿 캐러셀 (6개씩 그룹)
  const {
    emblaRef: tabletEmblaRef,
    selectedIndex: tabletSelectedIndex,
    scrollTo: tabletScrollTo,
  } = useCarouselWithAutoplay({
    options: { loop: true, align: 'start', skipSnaps: false },
  });

  const reviewGroups = chunkReviews(REVIEWS, 6);

  return (
    <section
      className="w-full overflow-hidden bg-[#FFD300] px-4 py-8 lg:py-[100px] 2xl:px-[320px]"
      aria-labelledby="review-section-title"
    >
      <div className="mx-auto flex w-full flex-col items-center gap-[30px] md:gap-[50px]">
        <SectionTitle>Why Everyone Chooses Dozn Exchange</SectionTitle>

        {/* Desktop (xl+): 6개씩 그룹화된 캐러셀 */}
        <div className="hidden w-full xl:block">
          <div className="overflow-hidden" ref={desktopEmblaRef}>
            <div className="flex">
              {reviewGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="min-w-0 flex-[0_0_100%]">
                  <div className="grid grid-cols-3 gap-[16px]" role="list">
                    {group.map((review) => (
                      <div key={review.id} role="listitem">
                        <ReviewCard review={review} variant="default" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <CarouselDots
            count={reviewGroups.length}
            selectedIndex={desktopSelectedIndex}
            onDotClick={desktopScrollTo}
            className="mt-6"
          />
        </div>

        {/* Tablet (lg~xl): 6개씩 그룹화된 캐러셀 (작은 크기) */}
        <div className="hidden w-full lg:block xl:hidden">
          <div className="overflow-hidden" ref={tabletEmblaRef}>
            <div className="flex">
              {reviewGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="min-w-0 flex-[0_0_100%]">
                  <div className="grid grid-cols-3 gap-[16px]" role="list">
                    {group.map((review) => (
                      <div key={review.id} role="listitem">
                        <ReviewCard review={review} variant="medium" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <CarouselDots
            count={reviewGroups.length}
            selectedIndex={tabletSelectedIndex}
            onDotClick={tabletScrollTo}
            className="mt-6"
          />
        </div>

        {/* Mobile (<lg): 1개씩 Embla carousel with autoplay */}
        <div className="w-full lg:hidden">
          <div className="overflow-hidden" ref={mobileEmblaRef}>
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
            selectedIndex={mobileSelectedIndex}
            onDotClick={mobileScrollTo}
            className="mt-4"
          />
        </div>
      </div>
    </section>
  );
}
