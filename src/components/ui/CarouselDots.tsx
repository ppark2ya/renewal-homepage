'use client';

import { Button } from '@/components/ui/button';

interface CarouselDotsProps {
  count: number;
  selectedIndex: number;
  onDotClick: (index: number) => void;
  className?: string;
  activeColor?: string;
  inactiveColor?: string;
}

/**
 * 캐러셀 페이저 도트 공통 컴포넌트
 * ReviewSection, EventSection 등 캐러셀이 있는 섹션에서 사용
 */
export function CarouselDots({
  count,
  selectedIndex,
  onDotClick,
  className = '',
  activeColor = 'bg-[#111]',
  inactiveColor = 'bg-[#111]/20',
}: CarouselDotsProps) {
  return (
    <div className={`flex justify-center gap-2 ${className}`} role="tablist">
      {Array.from({ length: count }).map((_, index) => (
        <Button
          key={index}
          variant="ghost"
          size="icon"
          onClick={() => onDotClick(index)}
          className={`h-2 rounded-full p-0 transition-all hover:bg-[#111]/30 ${
            index === selectedIndex ? `w-6 ${activeColor}` : `w-2 ${inactiveColor}`
          }`}
          aria-label={`슬라이드 ${index + 1}로 이동`}
          aria-selected={index === selectedIndex}
          role="tab"
        />
      ))}
    </div>
  );
}
