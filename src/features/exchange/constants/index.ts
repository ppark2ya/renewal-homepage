import { CurrencyCode } from '@/graphql/generated/graphql';

/** Currency display order for KRW → Foreign Currency */
export const BUY_CURRENCY_ORDER: CurrencyCode[] = [
  CurrencyCode.Twd,
  CurrencyCode.Jpy,
  CurrencyCode.Usd,
  CurrencyCode.Cny,
  CurrencyCode.Sgd,
  CurrencyCode.Hkd,
];

/** Currency display order for Foreign Currency → KRW */
export const SELL_CURRENCY_ORDER: CurrencyCode[] = [
  CurrencyCode.Jpy,
  CurrencyCode.Usd,
  CurrencyCode.Cny,
  CurrencyCode.Twd,
  CurrencyCode.Sgd,
  CurrencyCode.Hkd,
  CurrencyCode.Eur,
  CurrencyCode.Aud,
  CurrencyCode.Thb,
  CurrencyCode.Php,
  CurrencyCode.Gbp,
  CurrencyCode.Vnd,
  CurrencyCode.Cad,
  CurrencyCode.Myr,
  CurrencyCode.Idr,
];

/** Currencies that should display rate per 100 units */
export const PER_100_CURRENCIES: CurrencyCode[] = [
  CurrencyCode.Jpy,
  CurrencyCode.Vnd,
  CurrencyCode.Idr,
];
