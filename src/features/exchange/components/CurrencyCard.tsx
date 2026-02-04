import { FlagIcon } from '@/components/ui/FlagIcon';
import { getFlagPath } from '@/lib/currency';
import { formatRate, getCurrencyLabel, getChangeDirection } from '../utils/currency';
import type { CurrencyCardProps } from '../types';

export function CurrencyCard({
  rateInfo,
  index,
  animationState,
  totalExtraCards,
  initialDisplayCount,
}: CurrencyCardProps) {
  const isExtraCard = index >= initialDisplayCount;
  const extraCardIndex = index - initialDisplayCount;

  const getAnimationDelay = () => {
    if (!isExtraCard || animationState === 'idle') return undefined;
    if (animationState === 'opening') {
      return `${extraCardIndex * 50}ms`;
    }
    const reverseIndex = totalExtraCards - 1 - extraCardIndex;
    return `${reverseIndex * 50}ms`;
  };

  const getAnimationClass = () => {
    if (!isExtraCard) return '';
    if (animationState === 'opening') return 'animate-fadeSlideIn';
    if (animationState === 'closing') return 'animate-fadeSlideOut';
    return '';
  };

  const change = getChangeDirection(rateInfo.spreadRate, rateInfo.prevSpreadRate);
  const flagPath = getFlagPath(rateInfo.currencyCode);

  return (
    <article
      className={`flex w-full flex-col items-center justify-center overflow-hidden rounded-[20px] bg-white ${getAnimationClass()}`}
      style={{
        animationDelay: getAnimationDelay(),
        animationFillMode: animationState === 'opening' ? 'backwards' : 'forwards',
      }}
    >
      <div className="flex w-full flex-col items-center gap-[10px] py-4 md:py-[20px]">
        <div className="flex flex-col items-center gap-[10px]">
          <FlagIcon src={flagPath} alt={rateInfo.currencyCode} size="md" />
          <span className="text-center text-[14px] leading-[16px] tracking-[-0.5px] text-[#111] md:text-[16px]">
            {getCurrencyLabel(rateInfo.currencyCode)}
          </span>
        </div>
        <div className="flex items-end gap-1 text-center">
          <span className="text-[20px] font-bold leading-[30px] tracking-[-0.5px] text-[#111] md:text-[24px]">
            {formatRate(rateInfo.spreadRate, rateInfo.currencyCode)}
          </span>
          <span className="text-[12px] leading-[20px] text-[#C7CBDA] md:text-[14px]">KRW</span>
        </div>
      </div>
      <div
        className={`flex w-full items-center justify-center gap-2 text-[12px] capitalize leading-[30px] text-white md:text-[14px] ${
          change === 'up' ? 'bg-[#FF2C2C]' : 'bg-[#2C7CFF]'
        }`}
      >
        <span aria-hidden="true">{change === 'up' ? '▲' : '▼'}</span>
        <span>An hour ago</span>
      </div>
    </article>
  );
}
