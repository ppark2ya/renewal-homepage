'use client';

import ImageWithFallback from './ImageWithFallback';

interface FlagIconProps {
  src: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZES = {
  sm: { width: 24, height: 24, className: 'size-[24px]' },
  md: { width: 36, height: 24, className: 'h-[24px] w-[36px]' },
  lg: { width: 48, height: 32, className: 'h-[32px] w-[48px]' },
} as const;

/**
 * 국기 아이콘 공통 컴포넌트
 * ReviewSection, ExchangeRateSection 등에서 사용
 */
export function FlagIcon({
  src,
  alt = 'Country flag',
  size = 'sm',
  className = '',
}: FlagIconProps) {
  const { width, height, className: sizeClassName } = SIZES[size];
  const needsBorder = src.includes('jp.svg') || src.includes('sg.svg');

  return (
    <div
      className={`relative overflow-hidden bg-white ${sizeClassName} ${
        needsBorder ? 'border border-[#D8DCE9]' : ''
      } ${className}`}
    >
      <ImageWithFallback
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover"
        fallbackType="icon"
      />
    </div>
  );
}
