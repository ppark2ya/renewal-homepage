'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { getFlagPath } from '@/lib/currency';
import type { CurrencyCode, WonForeignEnableCurrency } from '@/graphql/generated/graphql';

interface KrwToForeignSectionProps {
  foreignCurrencyList: WonForeignEnableCurrency[];
  className?: string;
}

/** 통화 코드에 따른 기호 */
function getCurrencySymbol(code: CurrencyCode): string {
  const symbols: Partial<Record<CurrencyCode, string>> = {
    JPY: '¥',
    USD: '$',
    EUR: '€',
    GBP: '£',
    CNY: '¥',
    HKD: 'HK$',
    TWD: 'NT$',
    SGD: 'S$',
    THB: '฿',
    AUD: 'A$',
    CAD: 'C$',
    PHP: '₱',
    VND: '₫',
    MYR: 'RM',
    IDR: 'Rp',
    KRW: '₩',
  };
  return symbols[code] ?? code;
}

/** 권종 금액 포맷 (예: JPY_10000 → "¥ 10,000") */
function formatDenomination(currencyAmount: string, currencyCode: CurrencyCode): string {
  const parts = currencyAmount.split('_');
  const amount = parts.length > 1 ? parts.slice(1).join('_') : parts[0];
  const numericAmount = Number(amount);
  const symbol = getCurrencySymbol(currencyCode);
  return `${symbol} ${numericAmount.toLocaleString()}`;
}

export default function KrwToForeignSection({
  foreignCurrencyList,
  className,
}: KrwToForeignSectionProps) {
  const t = useTranslations('KioskDetailPage');

  if (foreignCurrencyList.length === 0) return null;

  return (
    <div className={cn('', className)}>
      {/* Section Title */}
      <h3 className="text-[16px] md:text-[18px] font-bold leading-[26px] text-[#111] mb-2">
        {t('krwToForeign')}
      </h3>
      <p className="text-[12px] md:text-[13px] leading-[18px] text-[#717895] mb-4 md:mb-6">
        {t('krwToForeignDesc')}
      </p>

      {/* Currency denomination cards */}
      <div className="flex flex-wrap gap-2 md:gap-3">
        {foreignCurrencyList.map((currency) => {
          const flagSrc = getFlagPath(currency.currencyCode);
          const label = formatDenomination(
            currency.currencyAmount as string,
            currency.currencyCode
          );
          const isAvailable = currency.availableRelease && currency.usedCurrency;

          return (
            <div
              key={`${currency.currencyCode}_${currency.currencyAmount}`}
              className={cn(
                'flex items-center gap-2 rounded-lg border px-3 py-2 md:px-4 md:py-2.5',
                isAvailable
                  ? 'border-[#D8DCE9] bg-white'
                  : 'border-[#D8DCE9] bg-[#F6F8F9]'
              )}
            >
              <div className="relative w-6 h-4 overflow-hidden rounded-sm shrink-0">
                <Image
                  src={flagSrc}
                  alt={currency.currencyCode}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[13px] md:text-[14px] leading-5 text-[#111] whitespace-nowrap">
                {label}
              </span>
              <span
                className={cn(
                  'text-[11px] md:text-[12px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap',
                  isAvailable
                    ? 'bg-[#E8F5E9] text-[#2E7D32]'
                    : 'bg-[#FFEBEE] text-[#C62828]'
                )}
              >
                {isAvailable ? t('available') : t('unavailable')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
