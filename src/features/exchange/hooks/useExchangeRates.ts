import {
  useGetWonForeignBestRatesQuery,
  useGetForeignWonBestRatesQuery,
} from '@/graphql/generated/graphql';
import { sortCurrencies } from '../utils/currency';
import { BUY_CURRENCY_ORDER, SELL_CURRENCY_ORDER } from '../constants';
import type { ExchangeDirection, UseExchangeRatesReturn } from '../types';

/**
 * Hook for fetching and managing exchange rate data
 */
export function useExchangeRates(direction: ExchangeDirection): UseExchangeRatesReturn {
  const {
    data: buyData,
    loading: buyLoading,
    refetch: refetchBuy,
  } = useGetWonForeignBestRatesQuery({
    skip: direction !== 'buy',
  });

  const {
    data: sellData,
    loading: sellLoading,
    refetch: refetchSell,
  } = useGetForeignWonBestRatesQuery({
    skip: direction !== 'sell',
  });

  const rawCurrencies =
    direction === 'buy'
      ? buyData?.getWonForeignBestRates.currencyRates ?? []
      : sellData?.getForeignWonBestRates.currencyRates ?? [];

  const currencies = sortCurrencies(
    rawCurrencies,
    direction === 'buy' ? BUY_CURRENCY_ORDER : SELL_CURRENCY_ORDER
  );

  const isLoading = direction === 'buy' ? buyLoading : sellLoading;

  const refetch = direction === 'buy' ? refetchBuy : refetchSell;

  return {
    currencies,
    isLoading,
    refetch,
  };
}
