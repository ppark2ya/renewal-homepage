const LOCALE_MAP: Record<string, string> = {
  ko: 'ko',
  kr: 'ko',
  cn: 'cng',
  cng: 'cng',
  zh: 'cng',
  cnb: 'CNB',
  jp: 'jp',
  ja: 'jp',
};

/**
 * locale 문자열을 API용 언어 코드로 변환
 *
 * @param locale - 원본 언어 코드 (예: 'ko', 'KR', 'zh', 'JA', 'CNB' 등)
 * @returns API에서 사용하는 언어 코드 ('ko' | 'cng' | 'CNB' | 'jp' | 'en')
 */
export function convertLang(locale: string): string {
  const key = locale.toLowerCase();

  if (key === 'cnb') return 'CNB';

  return LOCALE_MAP[key] ?? 'en';
}
