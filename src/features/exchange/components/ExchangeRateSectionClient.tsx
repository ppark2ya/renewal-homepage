'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ChevronDown } from 'lucide-react';
import { useToggleAnimation } from '@/hooks';
import { EXCHANGE_RATE } from '@/constants';
import type { ExchangeRateInfo } from '@/generated/graphql';
import { sortCurrencies } from '../utils/currency';
import { BUY_CURRENCY_ORDER, SELL_CURRENCY_ORDER } from '../constants';
import { CurrencyCard } from './CurrencyCard';
import { CurrencyCardSkeleton } from './CurrencyCardSkeleton';
import type { ExchangeDirection } from '../types';

interface ExchangeRateSectionClientProps {
  initialBuyRates: ExchangeRateInfo[];
  initialSellRates: ExchangeRateInfo[];
}

export function ExchangeRateSectionClient({
  initialBuyRates,
  initialSellRates,
}: ExchangeRateSectionClientProps) {
  const [activeTab, setActiveTab] = useState<ExchangeDirection>('buy');
  const [buyRates, setBuyRates] = useState(initialBuyRates);
  const [sellRates, setSellRates] = useState(initialSellRates);
  const [isRefetching, setIsRefetching] = useState(false);

  const rawCurrencies = activeTab === 'buy' ? buyRates : sellRates;
  const currencies = sortCurrencies(
    rawCurrencies,
    activeTab === 'buy' ? BUY_CURRENCY_ORDER : SELL_CURRENCY_ORDER
  );

  const totalExtraCards = Math.max(0, currencies.length - EXCHANGE_RATE.INITIAL_DISPLAY_COUNT);
  const hasMore = currencies.length > EXCHANGE_RATE.INITIAL_DISPLAY_COUNT;

  const { showAll, animationState, isAnimating, handleToggle, reset } = useToggleAnimation({
    itemCount: currencies.length,
    initialDisplayCount: EXCHANGE_RATE.INITIAL_DISPLAY_COUNT,
  });

  const handleTabChange = async (tab: string) => {
    const newTab = tab as ExchangeDirection;
    setActiveTab(newTab);
    reset();

    // Refetch data via API route
    setIsRefetching(true);
    try {
      const response = await fetch(`/api/exchange-rates?direction=${newTab}`);
      const data = await response.json();

      if (newTab === 'buy') {
        setBuyRates(data.currencyRates);
      } else {
        setSellRates(data.currencyRates);
      }
    } catch (error) {
      console.error('Failed to refetch exchange rates:', error);
    } finally {
      setIsRefetching(false);
    }
  };

  const isLoading = isRefetching;

  return (
    <section className="w-full overflow-hidden bg-[#FFF9DF]" aria-labelledby="exchange-rate-title">
      <div className="mx-auto flex w-full flex-col items-center gap-[30px] px-4 py-8 md:gap-[50px] md:py-[100px] 2xl:px-[320px]">
        <SectionTitle>Spot The Best Exchange Rates In Seconds!</SectionTitle>

        <ExchangeTypeTabs activeTab={activeTab} onTabChange={handleTabChange} />

        <CurrencyGrid
          currencies={currencies}
          isLoading={isLoading}
          showAll={showAll}
          animationState={animationState}
          totalExtraCards={totalExtraCards}
        />

        {hasMore && !isLoading && (
          <ToggleButton
            showAll={showAll}
            animationState={animationState}
            isAnimating={isAnimating}
            onToggle={handleToggle}
          />
        )}

        <Disclaimer />
      </div>
    </section>
  );
}

function ExchangeTypeTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: ExchangeDirection;
  onTabChange: (tab: string) => void;
}) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-[300px] lg:w-auto">
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
  );
}

function CurrencyGrid({
  currencies,
  isLoading,
  showAll,
  animationState,
  totalExtraCards,
}: {
  currencies: ExchangeRateInfo[];
  isLoading: boolean;
  showAll: boolean;
  animationState: 'idle' | 'opening' | 'closing';
  totalExtraCards: number;
}) {
  return (
    <div
      className="grid w-full max-w-[1280px] grid-cols-2 gap-3 lg:grid-cols-6 lg:gap-4"
      role="list"
    >
      {isLoading
        ? Array.from({ length: EXCHANGE_RATE.INITIAL_DISPLAY_COUNT }).map((_, index) => (
            <div key={index} role="listitem">
              <CurrencyCardSkeleton />
            </div>
          ))
        : currencies.map((rateInfo, index) => {
            const isExtraCard = index >= EXCHANGE_RATE.INITIAL_DISPLAY_COUNT;
            if (isExtraCard && !showAll) return null;

            return (
              <div key={`${rateInfo.currencyCode}`} role="listitem">
                <CurrencyCard
                  rateInfo={rateInfo}
                  index={index}
                  animationState={animationState}
                  totalExtraCards={totalExtraCards}
                  initialDisplayCount={EXCHANGE_RATE.INITIAL_DISPLAY_COUNT}
                />
              </div>
            );
          })}
    </div>
  );
}

function ToggleButton({
  showAll,
  animationState,
  isAnimating,
  onToggle,
}: {
  showAll: boolean;
  animationState: 'idle' | 'opening' | 'closing';
  isAnimating: boolean;
  onToggle: () => void;
}) {
  const isExpanded = showAll && animationState !== 'closing';

  return (
    <Button
      variant="ghost"
      onClick={onToggle}
      disabled={isAnimating}
      className={`flex items-center gap-2 text-[14px] text-[#111] hover:bg-transparent hover:text-[#111]/70 md:text-[16px] ${
        isAnimating ? 'cursor-not-allowed opacity-50' : ''
      }`}
      aria-expanded={showAll}
    >
      <ChevronDown
        className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
      />
      <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
    </Button>
  );
}

function Disclaimer() {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <p className="text-[12px] leading-[1.6] text-[#111]/50 md:text-[14px]">
        The above exchange rates are based on the lowest-rate device. Available currencies and rates
        may vary by branch.
      </p>
      <p className="text-[12px] leading-[1.6] text-[#111]/50 md:text-[14px]">
        Daily foreign currency purchase limit : {EXCHANGE_RATE.DAILY_PURCHASE_LIMIT}
      </p>
    </div>
  );
}
