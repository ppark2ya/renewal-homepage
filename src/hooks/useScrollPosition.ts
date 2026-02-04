'use client';

import { useState, useEffect } from 'react';

interface UseScrollPositionOptions {
  threshold?: number;
}

interface UseScrollPositionReturn {
  isScrolled: boolean;
  scrollY: number;
}

/**
 * 스크롤 위치를 추적하는 커스텀 훅
 * @param options.threshold - 스크롤 임계값 (기본값: 0)
 * @returns isScrolled - 임계값을 초과했는지 여부, scrollY - 현재 스크롤 Y 위치
 */
export function useScrollPosition(
  options: UseScrollPositionOptions = {}
): UseScrollPositionReturn {
  const { threshold = 0 } = options;
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > threshold);
    };

    // 초기값 설정
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { isScrolled, scrollY };
}
