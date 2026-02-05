'use client';

import { useEffect, useRef } from 'react';

interface UseBottomSheetProps {
  isExpanded: boolean;
}

interface UseBottomSheetReturn {
  listRef: React.RefObject<HTMLDivElement | null>;
  scrollToTop: () => void;
}

/**
 * Hook for managing bottom sheet behavior (scroll lock, scroll to top)
 */
export function useBottomSheet({ isExpanded }: UseBottomSheetProps): UseBottomSheetReturn {
  const listRef = useRef<HTMLDivElement>(null);

  // Scroll to top when expanded
  useEffect(() => {
    if (isExpanded && listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [isExpanded]);

  // Prevent body scroll when sheet is expanded
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  };

  return {
    listRef,
    scrollToTop,
  };
}
