'use client';

import { useState, useCallback } from 'react';
import type { AnimationState } from '@/types';
import { ANIMATION } from '@/constants';

interface UseToggleAnimationOptions {
  itemCount: number;
  initialDisplayCount?: number;
  staggerDelay?: number;
  animationDuration?: number;
}

interface UseToggleAnimationReturn {
  showAll: boolean;
  animationState: AnimationState;
  isAnimating: boolean;
  handleToggle: () => void;
  reset: () => void;
}

/**
 * Show More/Show Less 토글 애니메이션을 관리하는 커스텀 훅
 * ExchangeRateSection 등에서 펼침/접힘 애니메이션에 사용
 */
export function useToggleAnimation(
  options: UseToggleAnimationOptions
): UseToggleAnimationReturn {
  const {
    itemCount,
    initialDisplayCount = 6,
    staggerDelay = ANIMATION.STAGGER_DELAY,
    animationDuration = ANIMATION.FADE_DURATION,
  } = options;

  const [showAll, setShowAll] = useState(false);
  const [animationState, setAnimationState] = useState<AnimationState>('idle');

  const extraItemCount = Math.max(0, itemCount - initialDisplayCount);
  const totalAnimationTime = animationDuration + extraItemCount * staggerDelay;

  const handleToggle = useCallback(() => {
    if (animationState !== 'idle') return;

    if (!showAll) {
      // Opening
      setShowAll(true);
      setAnimationState('opening');
      setTimeout(() => {
        setAnimationState('idle');
      }, totalAnimationTime);
    } else {
      // Closing
      setAnimationState('closing');
      setTimeout(() => {
        setShowAll(false);
        setAnimationState('idle');
      }, totalAnimationTime);
    }
  }, [showAll, animationState, totalAnimationTime]);

  const reset = useCallback(() => {
    setShowAll(false);
    setAnimationState('idle');
  }, []);

  return {
    showAll,
    animationState,
    isAnimating: animationState !== 'idle',
    handleToggle,
    reset,
  };
}
