import { CurrencyCode, type ExchangeRateInfo } from '@/graphql/generated/graphql';
import { PER_100_CURRENCIES } from '../constants';

/**
 * Format exchange rate for display
 * Applies x100 multiplier for JPY, VND, IDR
 */
export function formatRate(rate: number, currencyCode: CurrencyCode): string {
  const displayRate = PER_100_CURRENCIES.includes(currencyCode) ? rate * 100 : rate;

  return displayRate.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Get currency label with "100" suffix for per-100 currencies
 */
export function getCurrencyLabel(currencyCode: CurrencyCode): string {
  if (PER_100_CURRENCIES.includes(currencyCode)) {
    return `${currencyCode} 100`;
  }
  return currencyCode;
}

/**
 * Sort currencies by specified order
 */
export function sortCurrencies(
  currencies: ExchangeRateInfo[],
  order: CurrencyCode[]
): ExchangeRateInfo[] {
  return [...currencies].sort((a, b) => {
    const indexA = order.indexOf(a.currencyCode);
    const indexB = order.indexOf(b.currencyCode);
    const posA = indexA === -1 ? order.length : indexA;
    const posB = indexB === -1 ? order.length : indexB;
    return posA - posB;
  });
}

/**
 * Determine rate change direction
 */
export function getChangeDirection(
  current: number,
  prev: number | null | undefined
): 'up' | 'down' {
  if (prev == null || current >= prev) return 'up';
  return 'down';
}
