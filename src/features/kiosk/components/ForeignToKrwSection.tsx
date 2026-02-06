'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { getFlagPath } from '@/lib/currency';
import type { CurrencyCode, ForeignWonEnableCurrency } from '@/graphql/generated/graphql';

interface ForeignToKrwSectionProps {
  currencyList: ForeignWonEnableCurrency[];
  className?: string;
}

export default function ForeignToKrwSection({
  currencyList,
  className,
}: ForeignToKrwSectionProps) {
  const t = useTranslations('KioskDetailPage');

  if (currencyList.length === 0) return null;

  return (
    <div className={cn('', className)}>
      {/* Section Title */}
      <h3 className="text-[16px] md:text-[18px] font-bold leading-[26px] text-[#111] mb-2">
        {t('foreignToKrw')}
      </h3>
      <p className="text-[12px] md:text-[13px] leading-[18px] text-[#717895] mb-4 md:mb-6">
        {t('foreignToKrwDesc')}
      </p>

      {/* Currency grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
        {currencyList.map((currency) => (
          <CurrencyCard
            key={currency.currencyCode}
            currencyCode={currency.currencyCode}
            currencyAmountList={currency.currencyAmountList}
          />
        ))}
      </div>
    </div>
  );
}

function CurrencyCard({
  currencyCode,
  currencyAmountList,
}: {
  currencyCode: CurrencyCode;
  currencyAmountList: string[];
}) {
  const flagSrc = getFlagPath(currencyCode);

  /** 권종 문자열에서 금액 파싱 (예: "JPY_1000" → "1,000") */
  function formatAmount(amountStr: string): string {
    const parts = amountStr.split('_');
    const amount = parts.length > 1 ? parts.slice(1).join('_') : parts[0];
    const num = Number(amount);
    return isNaN(num) ? amount : num.toLocaleString();
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-[#D8DCE9] bg-white p-3 md:p-4">
      {/* Flag + Currency Code */}
      <div className="flex items-center gap-2">
        <div className="relative w-6 h-4 overflow-hidden rounded-sm shrink-0">
          <Image
            src={flagSrc}
            alt={currencyCode}
            fill
            className="object-cover"
          />
        </div>
        <span className="text-[14px] md:text-[16px] font-bold text-[#111]">
          {currencyCode}
        </span>
      </div>

      {/* Denominations */}
      <div className="flex flex-col gap-0.5">
        {currencyAmountList.map((amount) => (
          <span
            key={amount}
            className="text-[12px] md:text-[13px] leading-[18px] text-[#717895]"
          >
            {formatAmount(amount)}
          </span>
        ))}
      </div>
    </div>
  );
}
