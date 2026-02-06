import { CurrencyCode } from '@/graphql/generated/graphql';

/**
 * CurrencyCode를 국기 이미지 경로로 매핑
 */
const CURRENCY_FLAG_MAP: Record<CurrencyCode, string> = {
  [CurrencyCode.Jpy]: '/images/flags/jp.svg',
  [CurrencyCode.Usd]: '/images/flags/us.svg',
  [CurrencyCode.Cny]: '/images/flags/cn.svg',
  [CurrencyCode.Twd]: '/images/flags/tw.svg',
  [CurrencyCode.Sgd]: '/images/flags/sg.svg',
  [CurrencyCode.Hkd]: '/images/flags/hk.svg',
  [CurrencyCode.Eur]: '/images/flags/eu.svg',
  [CurrencyCode.Aud]: '/images/flags/au.svg',
  [CurrencyCode.Thb]: '/images/flags/th.svg',
  [CurrencyCode.Php]: '/images/flags/ph.svg',
  [CurrencyCode.Gbp]: '/images/flags/gb.svg',
  [CurrencyCode.Vnd]: '/images/flags/vn.svg',
  [CurrencyCode.Cad]: '/images/flags/ca.svg',
  [CurrencyCode.Myr]: '/images/flags/my.svg',
  [CurrencyCode.Idr]: '/images/flags/id.svg',
  [CurrencyCode.Krw]: '/images/flags/kr.svg',
};

/**
 * CurrencyCode를 국기 이미지 경로로 변환
 */
export function getFlagPath(currencyCode: CurrencyCode): string {
  return CURRENCY_FLAG_MAP[currencyCode] ?? '/images/flags/kr.svg';
}

/**
 * 문자열 통화 코드를 국기 이미지 경로로 변환
 */
export function getFlagPathFromString(code: string): string {
  const currencyCode = code.toUpperCase() as CurrencyCode;
  return CURRENCY_FLAG_MAP[currencyCode] ?? '/images/flags/kr.svg';
}
