'use client';

import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import type { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import { ANIMATION } from '@/constants';

interface UseCarouselWithAutoplayOptions {
  options?: EmblaOptionsType;
  autoplayDelay?: number;
  stopOnInteraction?: boolean;
}

interface UseCarouselWithAutoplayReturn {
  emblaRef: ReturnType<typeof useEmblaCarousel>[0];
  emblaApi: EmblaCarouselType | undefined;
  selectedIndex: number;
  scrollSnaps: number[];
  scrollTo: (index: number) => void;
}

/**
 * Autoplay 기능이 포함된 Embla Carousel 커스텀 훅
 * ReviewSection 등 자동 재생이 필요한 캐러셀에서 사용
 */
export function useCarouselWithAutoplay(
  options: UseCarouselWithAutoplayOptions = {}
): UseCarouselWithAutoplayReturn {
  const {
    options: emblaOptions = { loop: true, align: 'center' },
    autoplayDelay = ANIMATION.CAROUSEL_AUTOPLAY_DELAY,
    stopOnInteraction = false,
  } = options;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, [
    Autoplay({ delay: autoplayDelay, stopOnInteraction }),
  ]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onInit = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onInit();
    onSelect();

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onInit);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onInit);
    };
  }, [emblaApi, onInit, onSelect]);

  return {
    emblaRef,
    emblaApi,
    selectedIndex,
    scrollSnaps,
    scrollTo,
  };
}
