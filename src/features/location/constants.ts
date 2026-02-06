/**
 * Location 페이지 관련 상수
 */

import type { HotspotButton } from './types';

// 핫스팟 버튼 데이터 (icon은 HotspotIcons.tsx에서 인라인 SVG로 관리)
export const HOTSPOT_BUTTONS: HotspotButton[] = [
  {
    id: 'myeongdong',
    name: 'Myeongdong',
    icon: '', // 인라인 SVG 사용
    latitude: 37.5636,
    longitude: 126.9869,
  },
  {
    id: 'hongdae',
    name: 'Hongdae',
    icon: '', // 인라인 SVG 사용
    latitude: 37.5563,
    longitude: 126.9237,
  },
  {
    id: 'seongsu',
    name: 'Seongsu',
    icon: '', // 인라인 SVG 사용
    latitude: 37.5445,
    longitude: 127.0559,
  },
  {
    id: 'haeundae',
    name: 'Haeundae',
    icon: '', // 인라인 SVG 사용
    latitude: 35.1587,
    longitude: 129.1600,
  },
];

// 장소 타입별 아이콘 (HotspotIcons.tsx에서 인라인 SVG로 관리)

// 운영시간 필터 옵션
export const OPERATING_HOURS_OPTIONS = [
  { code: 'year_round', name: 'Open year-round' },
];

// 통화 플래그 이미지 매핑
export const CURRENCY_FLAGS: Record<string, string> = {
  TWD: '/images/flags/tw.svg',
  JPY: '/images/flags/jp.svg',
  USD: '/images/flags/us.svg',
  CNY: '/images/flags/cn.svg',
  HKD: '/images/flags/hk.svg',
  SGD: '/images/flags/sg.svg',
};
