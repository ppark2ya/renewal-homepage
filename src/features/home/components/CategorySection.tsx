'use client';

import { useRouter } from 'next/navigation';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/constants/data';
import type { Category, CategoryAction } from '@/types';

/**
 * 모바일 기기 여부를 확인하는 함수
 */
function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * 카테고리 액션을 처리하는 커스텀 훅
 */
function useCategoryAction() {
  const router = useRouter();

  const handleAction = (action: CategoryAction | undefined) => {
    if (!action) return;

    switch (action.type) {
      case 'phone':
        if (isMobileDevice()) {
          window.location.href = `tel:${action.phoneNumber}`;
        } else {
          router.push(action.fallbackHref);
        }
        break;

      case 'navigate':
        router.push(action.href);
        break;

      case 'navigate-with-currencies':
        const params = new URLSearchParams();
        params.set('currencies', action.currencies.join(','));
        if (action.services.length > 0) {
          params.set('services', action.services.join(','));
        }
        router.push(`${action.href}?${params.toString()}`);
        break;

      case 'scroll':
        const element = document.getElementById(action.targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        break;
    }
  };

  return handleAction;
}

interface CategoryIconProps {
  icon: string;
  name: string;
}

function CategoryIcon({ icon, name }: CategoryIconProps) {
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

interface BadgeProps {
  text: string;
  variant?: 'desktop' | 'mobile';
}

function Badge({ text, variant = 'desktop' }: BadgeProps) {
  if (variant === 'mobile') {
    return (
      <div className="absolute -top-[1px] left-1/2 z-10 -translate-x-1/2">
        <div className="relative">
          <div className="whitespace-nowrap rounded-full bg-[#FF2C2C] px-3 py-1 text-[11px] text-white shadow-md">
            {text}
          </div>
          <div
            className="mx-auto size-0 border-x-[5px] border-t-[5px] border-x-transparent border-t-[#FF2C2C]"
            aria-hidden="true"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute -top-[11px] left-1/2 z-10 -translate-x-1/2">
      <div className="relative flex h-[50px] w-[175px] flex-col items-start overflow-hidden">
        <div className="relative h-[40px] w-[167px]">
          <div className="absolute left-0 top-0 flex h-[30px] items-center justify-center rounded-[100px] bg-[#FF2C2C] px-[20px] py-[10px]">
            <p className="whitespace-nowrap text-center text-[14px] capitalize leading-[30px] text-white">
              {text}
            </p>
          </div>
          <div className="absolute left-1/2 top-[30px] -translate-x-1/2" aria-hidden="true">
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path d="M6 10L0 0H12L6 10Z" fill="#FF2C2C" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CategoryCardProps {
  category: Category;
  variant: 'desktop' | 'mobile';
  isFullWidth?: boolean;
  onClick?: () => void;
}

function CategoryCard({ category, variant, isFullWidth = false, onClick }: CategoryCardProps) {
  const isDesktop = variant === 'desktop';

  const cardClassName = isDesktop
    ? 'flex h-[300px] w-full flex-col items-center justify-center gap-[20px] rounded-[20px] border border-white bg-[#FFF2B2] px-[10px] py-[60px] transition-transform hover:scale-[1.02] hover:bg-[#FFF2B2]/80 cursor-pointer'
    : `flex w-full flex-col items-center justify-center gap-2 rounded-[16px] bg-[#FFF2B2] px-3 py-5 hover:bg-[#FFF2B2]/80 cursor-pointer ${
        isFullWidth ? 'h-[130px]' : 'h-[160px]'
      }`;

  return (
    <Button variant="ghost" className={cardClassName} onClick={onClick}>
      <CategoryIcon icon={category.icon} name={category.title} />
      <div
        className={
          isDesktop
            ? 'text-center text-[0px] capitalize leading-[30px] text-[#111]'
            : 'text-center text-[13px] leading-[20px] text-[#111]'
        }
      >
        <p className={isDesktop ? 'mb-0 text-[20px]' : 'mb-0'}>{category.title}</p>
        <p className={isDesktop ? 'text-[16px]' : ''}>{category.subtitle}</p>
      </div>
    </Button>
  );
}

/**
 * 카테고리 섹션 - 서비스 카테고리 버튼 그리드
 * Client Component - 버튼 인터랙션 필요
 */
export default function CategorySection() {
  const handleAction = useCategoryAction();

  return (
    <section aria-label="서비스 카테고리">
      <div className="mx-auto flex w-full items-center justify-center gap-[10px] overflow-x-auto px-4 py-8 lg:py-[100px] 2xl:px-[180px]">
        {/* Desktop: 5 cards in a row */}
        <div className="hidden w-full gap-[10px] lg:flex" role="list">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="relative flex h-[320px] min-w-[160px] w-[240px] flex-1 flex-col items-center pt-[10px]"
              role="listitem"
            >
              {cat.badgeText && <Badge text={cat.badgeText} variant="desktop" />}
              <CategoryCard
                category={cat}
                variant="desktop"
                onClick={() => handleAction(cat.action)}
              />
            </div>
          ))}
        </div>

        {/* Mobile/Tablet: 2 cols, 3rd item full width */}
        <div className="grid w-full grid-cols-2 gap-3 lg:hidden" role="list">
          {CATEGORIES.map((cat, index) => (
            <div
              key={cat.id}
              className={`relative pt-[10px] ${index === 2 ? 'col-span-2' : ''}`}
              role="listitem"
            >
              {cat.badgeText && <Badge text={cat.badgeText} variant="mobile" />}
              <CategoryCard
                category={cat}
                variant="mobile"
                isFullWidth={index === 2}
                onClick={() => handleAction(cat.action)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
