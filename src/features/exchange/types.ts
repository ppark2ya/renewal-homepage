import type { ExchangeRateInfo } from '@/generated/graphql';
import type { AnimationState } from '@/types';

export type ExchangeDirection = 'buy' | 'sell';

export interface CurrencyCardProps {
  rateInfo: ExchangeRateInfo;
  index: number;
  animationState: AnimationState;
  totalExtraCards: number;
  initialDisplayCount: number;
}

export interface UseExchangeRatesReturn {
  currencies: ExchangeRateInfo[];
  isLoading: boolean;
  refetch: () => void;
}
