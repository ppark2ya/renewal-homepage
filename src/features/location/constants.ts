/**
 * Location 페이지 관련 상수
 */

import type { LocationItem, HotspotButton, ServiceBadgeInfo, ServiceType, FilterResponseItem } from './types';

// 서비스 배지 정보
export const SERVICE_BADGES: Record<ServiceType, ServiceBadgeInfo> = {
  foreignToKrw: {
    type: 'foreignToKrw',
    label: 'Foreign Currency → KRW',
    bgColor: 'bg-[#FFD300]',
    textColor: 'text-[#111]',
  },
  krwToForeign: {
    type: 'krwToForeign',
    label: 'KRW → Foreign currency',
    bgColor: 'bg-[#FFAA00]',
    textColor: 'text-[#111]',
  },
  taxRefund: {
    type: 'taxRefund',
    label: 'TAX REFUND',
    bgColor: 'bg-[#AFE139]',
    textColor: 'text-[#111]',
  },
  ezlCardTopup: {
    type: 'ezlCardTopup',
    label: 'EZL Card Top-up',
    bgColor: 'bg-[#111]',
    textColor: 'text-white',
  },
};

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

// 샘플 위치 데이터
export const SAMPLE_LOCATIONS: LocationItem[] = [
  {
    id: 1,
    name: 'Musinsa Standard Myeongdong',
    placeType: 'shopping',
    operatingHours: 'everyday 11:00 ~ 21:30',
    services: ['foreignToKrw', 'taxRefund'],
    latitude: 37.5636,
    longitude: 126.9869,
  },
  {
    id: 2,
    name: 'Front Of Exit 1 Of Sinchon Station',
    placeType: 'outdoor',
    operatingHours: 'Open year-round',
    services: ['foreignToKrw', 'krwToForeign', 'taxRefund', 'ezlCardTopup'],
    latitude: 37.5559,
    longitude: 126.9369,
  },
  {
    id: 3,
    name: 'Apgujeong ONYOO Plastic Surgery',
    placeType: 'hospital',
    operatingHours: 'Monday~Friday AM 10:00 ~ PM 19:00, Saturday 10:00 ~ 17:00',
    services: ['foreignToKrw', 'taxRefund'],
    latitude: 37.5271,
    longitude: 127.0286,
  },
  {
    id: 4,
    name: 'Hotel The Designers LYJ Gangnam Premie',
    placeType: 'hotel',
    operatingHours: 'Open year-round',
    services: ['foreignToKrw', 'krwToForeign', 'taxRefund', 'ezlCardTopup'],
    latitude: 37.4979,
    longitude: 127.0276,
  },
  {
    id: 5,
    name: 'Busan Gamcheon Culture Village',
    placeType: 'outdoor',
    operatingHours: 'Mon~Fri AM 10:30 - PM 20:30, Sat ~ Sun 10:00 ~ 17:00',
    services: ['foreignToKrw', 'krwToForeign', 'taxRefund', 'ezlCardTopup'],
    latitude: 35.0972,
    longitude: 129.0110,
  },
  {
    id: 6,
    name: 'Busan Gamcheon Culture Village',
    placeType: 'outdoor',
    operatingHours: 'Mon~Fri AM 10:30 - PM 20:30, Sat ~ Sun 10:00 ~ 17:00',
    services: ['foreignToKrw', 'krwToForeign', 'taxRefund', 'ezlCardTopup'],
    latitude: 37.5559,
    longitude: 129.0110,
  },
];

// 장소 타입별 아이콘 (HotspotIcons.tsx에서 인라인 SVG로 관리)

// Mock 필터 데이터 (API 응답 기반)
export const MOCK_FILTER_DATA: FilterResponseItem[] = [
  {
    type: 'LOCATION',
    filterList: [
      {
        id: 1,
        name: 'Region',
        filterDetailList: [
          { code: 'seoul', name: 'Seoul' },
          { code: 'busan', name: 'Busan' },
          { code: 'other', name: 'Other' },
        ],
      },
      {
        id: 2,
        name: 'Detailed Region',
        filterDetailList: [
          { code: 'all', name: 'All' },
          // Seoul regions
          { code: 'myeongdong', name: 'Myeongdong/Euljiro' },
          { code: 'hongdae', name: 'Hongdae/Sinchon' },
          { code: 'chungmuro', name: 'Chungmu-ro' },
          { code: 'gyeongbokgung', name: 'Gyeongbokgung/Gwanghwamun' },
          { code: 'insadong', name: 'Insadong/Jongno' },
          { code: 'seoul_station', name: 'Seoul Station/Namdaemun' },
          { code: 'city_hall', name: 'City Hall Station' },
          { code: 'dongdaemun', name: 'Dongdaemun' },
          { code: 'daehakro', name: 'Daehak-ro/Hyehwa' },
          { code: 'gangnam', name: 'Gangnam/Samseong' },
          { code: 'apgujeong', name: 'Apgujeong/Sinsa' },
          { code: 'jamsil', name: 'Jamsil/Songpa' },
          { code: 'seongsu', name: 'Seongsu' },
          { code: 'guro', name: 'Guro' },
          { code: 'yongsan', name: 'Yongsan' },
          { code: 'yeouido', name: 'Yeongdeungpo/Yeouido' },
          // Busan regions
          { code: 'haeundae', name: 'Haeundae' },
          { code: 'seomyeon', name: 'Seomyeon' },
          { code: 'gwangalli', name: 'Gwangalli' },
          { code: 'nampo', name: 'Nampo-dong' },
          // Other regions
          { code: 'jeju', name: 'Jeju' },
          { code: 'incheon', name: 'Incheon' },
          { code: 'daegu', name: 'Daegu' },
          { code: 'daejeon', name: 'Daejeon' },
          { code: 'gwangju', name: 'Gwangju' },
        ],
      },
    ],
  },
  {
    type: 'SERVICE',
    filterList: [
      {
        id: 3,
        name: 'Services Provided',
        filterDetailList: [
          { code: 'krw_to_foreign', name: 'KRW → Foreign Currency' },
          { code: 'tax_refund', name: 'TAX REFUND' },
          { code: 'prepaid_card', name: 'Prepaid card' },
          { code: 'ezl_topup', name: 'EZL Card Top-up' },
        ],
      },
    ],
  },
  {
    type: 'CURRENCY',
    filterList: [
      {
        id: 4,
        name: 'Currency Selection',
        filterDetailList: [
          { code: 'all', name: 'All' },
          { code: 'TWD', name: 'TWD' },
          { code: 'JPY', name: 'JPY' },
          { code: 'USD', name: 'USD' },
          { code: 'CNY', name: 'CNY' },
          { code: 'HKD', name: 'HKD' },
          { code: 'SGD', name: 'SGD' },
        ],
      },
    ],
  },
];

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

// 지역별 상세 지역 매핑 (All 제외)
export const REGION_TO_DETAILED_REGIONS: Record<string, string[]> = {
  seoul: [
    'myeongdong',
    'hongdae',
    'chungmuro',
    'gyeongbokgung',
    'insadong',
    'seoul_station',
    'city_hall',
    'dongdaemun',
    'daehakro',
    'gangnam',
    'apgujeong',
    'jamsil',
    'seongsu',
    'guro',
    'yongsan',
    'yeouido',
  ],
  busan: ['haeundae', 'seomyeon', 'gwangalli', 'nampo'],
  other: ['jeju', 'incheon', 'daegu', 'daejeon', 'gwangju'],
};

// 모든 통화 코드 목록 (All 제외)
export const ALL_CURRENCY_CODES = ['TWD', 'JPY', 'USD', 'CNY', 'HKD', 'SGD'];
