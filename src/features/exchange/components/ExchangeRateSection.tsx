'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { FlagIcon } from '@/components/ui/FlagIcon';
import { ChevronDown } from 'lucide-react';
import { useToggleAnimation } from '@/hooks';
import { BUY_CURRENCIES, SELL_CURRENCIES } from '@/constants/data';
import { EXCHANGE_RATE } from '@/constants';
import type { Currency, ExchangeDirection, AnimationState } from '@/types';

interface CurrencyCardProps {
  currency: Currency;
  index: number;
  animationState: AnimationState;
  totalExtraCards: number;
}

function CurrencyCard({ currency, index, animationState, totalExtraCards }: CurrencyCardProps) {
  const isExtraCard = index >= EXCHANGE_RATE.INITIAL_DISPLAY_COUNT;
  const extraCardIndex = index - EXCHANGE_RATE.INITIAL_DISPLAY_COUNT;

  const getAnimationDelay = () => {
    if (!isExtraCard || animationState === 'idle') return undefined;
    if (animationState === 'opening') {
      return `${extraCardIndex * 50}ms`;
    }
    // 역순: 마지막 카드가 먼저 사라짐
    const reverseIndex = totalExtraCards - 1 - extraCardIndex;
    return `${reverseIndex * 50}ms`;
  };

  const getAnimationClass = () => {
    if (!isExtraCard) return '';
    if (animationState === 'opening') return 'animate-fadeSlideIn';
    if (animationState === 'closing') return 'animate-fadeSlideOut';
    return '';
  };

  return (
    <article
      className={`flex w-full flex-col items-center justify-center overflow-hidden rounded-[20px] bg-white ${getAnimationClass()}`}
      style={{
        animationDelay: getAnimationDelay(),
        animationFillMode: animationState === 'opening' ? 'backwards' : 'forwards',
      }}
    >
      {/* Rate info */}
      <div className="flex w-full flex-col items-center gap-[10px] py-4 md:py-[20px]">
        <div className="flex flex-col items-center gap-[10px]">
          <FlagIcon src={currency.flag} alt={currency.code} size="md" />
          <span className="text-center text-[14px] leading-[16px] tracking-[-0.5px] text-[#111] md:text-[16px]">
            {currency.code}
          </span>
        </div>
        <div className="flex items-end gap-1 text-center">
          <span className="text-[20px] font-bold leading-[30px] tracking-[-0.5px] text-[#111] md:text-[24px]">
            {currency.rate}
          </span>
          <span className="text-[12px] leading-[20px] text-[#C7CBDA] md:text-[14px]">KRW</span>
        </div>
      </div>
      {/* Change indicator */}
      <div
        className={`flex w-full items-center justify-center gap-2 text-[12px] capitalize leading-[30px] text-white md:text-[14px] ${
          currency.change === 'up' ? 'bg-[#FF2C2C]' : 'bg-[#2C7CFF]'
        }`}
      >
        <span aria-hidden="true">{currency.change === 'up' ? '▲' : '▼'}</span>
        <span>An hour ago</span>
      </div>
    </article>
  );
}

/**
 * 환율 섹션 - 실시간 환율 정보 표시
 * - 탭 전환 (구매/판매)
 * - Show More/Less 애니메이션
 */
export default function ExchangeRateSection() {
  const [activeTab, setActiveTab] = useState<ExchangeDirection>('buy');

  const currencies = activeTab === 'buy' ? BUY_CURRENCIES : SELL_CURRENCIES;
  const totalExtraCards = currencies.length - EXCHANGE_RATE.INITIAL_DISPLAY_COUNT;
  const hasMore = currencies.length > EXCHANGE_RATE.INITIAL_DISPLAY_COUNT;

  const { showAll, animationState, isAnimating, handleToggle, reset } = useToggleAnimation({
    itemCount: currencies.length,
    initialDisplayCount: EXCHANGE_RATE.INITIAL_DISPLAY_COUNT,
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as ExchangeDirection);
    reset();
  };

  return (
    <section className="w-full overflow-hidden bg-[#FFF9DF]" aria-labelledby="exchange-rate-title">
      <div className="mx-auto flex w-full flex-col items-center gap-[30px] px-4 py-8 md:gap-[50px] md:py-[100px] 2xl:px-[320px]">
        <SectionTitle>Spot The Best Exchange Rates In Seconds!</SectionTitle>

        {/* Tab toggle */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-[300px] lg:w-auto">
          <TabsList className="flex h-auto w-full flex-col gap-2 rounded-[20px] bg-[#FFD300] p-4 lg:flex-row lg:gap-0 lg:rounded-full lg:p-1">
            <TabsTrigger
              value="buy"
              className="w-full rounded-full px-6 py-3 text-[14px] font-bold data-[state=active]:bg-white data-[state=active]:text-[#111] data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#111]/50 lg:w-auto lg:px-8 lg:py-2 lg:text-[16px]"
            >
              KRW → Foreign Currency
            </TabsTrigger>
            <TabsTrigger
              value="sell"
              className="w-full rounded-full px-6 py-3 text-[14px] font-bold data-[state=active]:bg-white data-[state=active]:text-[#111] data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#111]/50 lg:w-auto lg:px-8 lg:py-2 lg:text-[16px]"
            >
              Foreign Currency → KRW
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Currency cards grid */}
        <div className="grid w-full max-w-[1280px] grid-cols-2 gap-3 lg:grid-cols-6 lg:gap-4" role="list">
          {currencies.map((currency, index) => {
            const isExtraCard = index >= EXCHANGE_RATE.INITIAL_DISPLAY_COUNT;
            if (isExtraCard && !showAll) return null;

            return (
              <div key={`${currency.code}-${index}`} role="listitem">
                <CurrencyCard
                  currency={currency}
                  index={index}
                  animationState={animationState}
                  totalExtraCards={totalExtraCards}
                />
              </div>
            );
          })}
        </div>

        {/* Show More / Show Less button */}
        {hasMore && (
          <Button
            variant="ghost"
            onClick={handleToggle}
            disabled={isAnimating}
            className={`flex items-center gap-2 text-[14px] text-[#111] hover:bg-transparent hover:text-[#111]/70 md:text-[16px] ${
              isAnimating ? 'cursor-not-allowed opacity-50' : ''
            }`}
            aria-expanded={showAll}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                showAll && animationState !== 'closing' ? 'rotate-180' : ''
              }`}
            />
            <span>{showAll && animationState !== 'closing' ? 'Show Less' : 'Show More'}</span>
          </Button>
        )}

        {/* Disclaimer text */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-[12px] leading-[1.6] text-[#111]/50 md:text-[14px]">
            The above exchange rates are based on the lowest-rate device. Available currencies and
            rates may vary by branch.
          </p>
          <p className="text-[12px] leading-[1.6] text-[#111]/50 md:text-[14px]">
            Daily foreign currency purchase limit : {EXCHANGE_RATE.DAILY_PURCHASE_LIMIT}
          </p>
        </div>
      </div>
    </section>
  );
}
