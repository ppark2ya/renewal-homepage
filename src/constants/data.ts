/**
 * 정적 데이터 상수
 * 컴포넌트에서 사용되는 하드코딩된 데이터를 중앙 관리
 */

import { R2_BASE_URL } from './index';
import type {
  Category,
  Brand,
  Review,
  Kiosk,
  KoreaEvent,
  Currency,
  NavItem,
  FamilySite,
  CategoryAction,
} from '@/types';
import {CurrencyCode} from "@/graphql/generated/graphql";

// 카테고리별 액션 정의
export const CATEGORY_ACTIONS: Record<string, CategoryAction> = {
  'customer-center': {
    type: 'phone',
    phoneNumber: '1666-6921',
    fallbackHref: '/customer-center',
  },
  location: {
    type: 'navigate',
    href: '/location',
  },
  exchange: {
    type: 'navigate-with-currencies',
    href: '/location',
    currencies: ['TWD', 'JPY', 'USD', 'HKD', 'CNY', 'SGD'],
    services: ['krw_to_foreign'],
  },
  rate: {
    type: 'scroll',
    targetId: 'exchange-rate-section',
  },
  card: {
    type: 'navigate',
    href: '/the-free',
  },
};

// 카테고리 데이터
export const CATEGORIES: Category[] = [
  {
    id: 'customer-center',
    title: 'Customer',
    subtitle: 'Service Center',
    icon: `/images/icons/customer_service_center_icon.png`,
    action: CATEGORY_ACTIONS['customer-center'],
  },
  {
    id: 'location',
    title: 'Kiosk',
    subtitle: 'Location',
    icon: `/images/icons/krw_kiosk_localtion_icon.png`,
    action: CATEGORY_ACTIONS['location'],
  },
  {
    id: 'exchange',
    title: 'KRW →',
    subtitle: 'Foreign Currency',
    icon: `/images/icons/foreign_currency_icon.png`,
    badgeText: 'Up to 100% discount',
    action: CATEGORY_ACTIONS['exchange'],
  },
  {
    id: 'rate',
    title: 'Real-Time',
    subtitle: 'Exchange Rate',
    icon: `/images/icons/real_time_exchange_rate_icon.png`,
    action: CATEGORY_ACTIONS['rate'],
  },
  {
    id: 'card',
    title: 'Tax Free',
    subtitle: 'Refund Code',
    icon: `/images/icons/the_free_prepaid_card_icon.png`,
    action: CATEGORY_ACTIONS['card'],
  },
];

// 브랜드 로고 데이터
export const BRANDS: Brand[] = [
  { name: 'OLIVE YOUNG', logo: `/images/brands/olive_young_logo.png`, width: 266, height: 30 },
  { name: 'DAISO', logo: `/images/brands/daiso_logo.png`, width: 169, height: 40 },
  { name: 'GS25', logo: `/images/brands/gs_25_logo.png`, width: 127, height: 40 },
  { name: 'CU', logo: `/images/brands/cu_logo.png`, width: 74, height: 46 },
  { name: 'eSIM', logo: `/images/brands/esim_logo.png`, width: 150, height: 51 },
];

// 리뷰 데이터
export const REVIEWS: Review[] = [
  {
    id: 1,
    currencyCode: CurrencyCode.Usd,
    location: 'Blue Line Park Cheongsapo Station',
    text: 'Absolutely impressed with Dozn Exchange!\nThe user-friendly kiosk made currency exchange a breeze, and the rates were competitive.\nWill definitely be using it again on my next trip!',
  },
  {
    id: 2,
    currencyCode: CurrencyCode.Jpy,
    location: '江南駅 荷物預かり所',
    text: '近くに両替する場所がないのに荷物も預けることができ、\n両替もできていいですね。',
  },
  {
    id: 3,
    currencyCode: CurrencyCode.Cny,
    location: '明洞站 5 号出口前',
    text: '中国朋友来拜访了，所以一起拜访了。\n因为很容易使用，所以很好！ 离地铁站也很近。',
  },
  {
    id: 4,
    currencyCode: CurrencyCode.Usd,
    location: 'Hongdae Square Lab Luggage Storage',
    text: "Dozn kiosk was very easy to use, and the entire exchange process didn't take long.\nIt was fast, simple, and very convenient.\nIt was nice to be able to exchange money without having to line up or talk to the staff.",
  },
  {
    id: 5,
    currencyCode: CurrencyCode.Jpy,
    location: '明洞スマートラゲージ',
    text: '無人両替機はとても使いやすく、操作が簡単で速いです。\n短い時間で両替が終わるので本当に便利でした。\n次の韓国旅行にまた訪れます！',
  },
  {
    id: 6,
    currencyCode: CurrencyCode.Cny,
    location: '新论岘站第一大药房',
    text: '不用排队、不用和工作人员沟通，\n自己就能轻松兑换。\n汇率也透明，让人用得很放心。',
  },
  {
    id: 7,
    currencyCode: CurrencyCode.Usd,
    location: 'Blue Line Park Cheongsapo Station',
    text: 'Absolutely impressed with Dozn Exchange!\nThe user-friendly kiosk made currency exchange a breeze, and the rates were competitive.\nWill definitely be using it again on my next trip!',
  },
  {
    id: 8,
    currencyCode: CurrencyCode.Jpy,
    location: '江南駅 荷物預かり所',
    text: '近くに両替する場所がないのに荷物も預けることができ、\n両替もできていいですね。',
  },
  {
    id: 9,
    currencyCode: CurrencyCode.Cny,
    location: '明洞站 5 号出口前',
    text: '中国朋友来拜访了，所以一起拜访了。\n因为很容易使用，所以很好！ 离地铁站也很近。',
  },
  {
    id: 10,
    currencyCode: CurrencyCode.Usd,
    location: 'Hongdae Square Lab Luggage Storage',
    text: "Dozn kiosk was very easy to use, and the entire exchange process didn't take long.\nIt was fast, simple, and very convenient.\nIt was nice to be able to exchange money without having to line up or talk to the staff.",
  },
  {
    id: 11,
    currencyCode: CurrencyCode.Jpy,
    location: '明洞スマートラゲージ',
    text: '無人両替機はとても使いやすく、操作が簡単で速いです。\n短い時間で両替が終わるので本当に便利でした。\n次の韓国旅行にまた訪れます！',
  },
  {
    id: 12,
    currencyCode: CurrencyCode.Cny,
    location: '新论岘站第一大药房',
    text: '不用排队、不用和工作人员沟通，\n自己就能轻松兑换。\n汇率也透明，让人用得很放心。',
  },
];

// 키오스크 데이터
export const KIOSKS: Kiosk[] = [
  {
    id: 1,
    name: 'GS25 Gwangan Bridge Branch',
    city: 'Busan',
    image: '/images/kiosks/kiosk-1.jpg',
  },
  {
    id: 2,
    name: 'GS25 Myeongdong Branch',
    city: 'Seoul',
    image: '/images/kiosks/kiosk-2.jpg',
  },
  {
    id: 3,
    name: 'GS25 Hongdae Branch',
    city: 'Seoul',
    image: '/images/kiosks/kiosk-3.jpg',
  },
  {
    id: 4,
    name: 'GS25 Jeju Airport Branch',
    city: 'Jeju',
    image: '/images/kiosks/kiosk-4.jpg',
  },
  {
    id: 5,
    name: 'GS25 Haeundae Branch',
    city: 'Busan',
    image: '/images/kiosks/kiosk-5.jpg',
  },
];

// 이벤트 데이터
export const EVENTS: KoreaEvent[] = [
  {
    id: 1,
    title: 'Pohang Yeongil Cheongteo Festival',
    subtitle: 'Event Information',
    image: '/images/events/event-1.svg',
    startAt: '2025-07-07',
    endAt: '2025-07-07',
  },
  {
    id: 2,
    title: 'Korea Beauty Festival',
    subtitle: 'Event Information',
    image: '/images/events/event-2.svg',
    startAt: '2025-07-07',
    endAt: '2025-07-07',
  },
  {
    id: 3,
    title: 'all nights INCHEON Wolmi·Gaekangjang night market',
    subtitle: 'Event Information',
    image: '/images/events/event-3.svg',
    startAt: '2025-07-07',
    endAt: '2025-07-07',
  },
  {
    id: 4,
    title: 'Lotteworld Adventure Korean Adventure',
    subtitle: 'Event Information',
    image: '/images/events/event-4.svg',
    startAt: '2025-07-07',
    endAt: '2025-07-07',
  },
  {
    id: 5,
    title: 'Han River Night Tour',
    subtitle: 'Event Information',
    image: '/images/events/event-5.svg',
    startAt: '2025-07-07',
    endAt: '2025-07-07',
  },
];

// 환율 데이터 - 구매 (KRW → Foreign Currency)
export const BUY_CURRENCIES: Currency[] = [
  { flag: '/images/flags/tw.svg', code: 'TWD', rate: '43.32', change: 'up' },
  { flag: '/images/flags/jp.svg', code: 'JPY', rate: '930.00', change: 'up' },
  { flag: '/images/flags/us.svg', code: 'USD', rate: '1,450.02', change: 'down' },
  { flag: '/images/flags/hk.svg', code: 'HKD', rate: '191.73', change: 'down' },
  { flag: '/images/flags/cn.svg', code: 'CNY', rate: '192.84', change: 'up' },
  { flag: '/images/flags/sg.svg', code: 'SGD', rate: '98.31', change: 'up' },
  { flag: '/images/flags/th.svg', code: 'THB', rate: '42.15', change: 'up' },
  { flag: '/images/flags/vn.svg', code: 'VND', rate: '0.058', change: 'down' },
  { flag: '/images/flags/ph.svg', code: 'PHP', rate: '25.12', change: 'up' },
  { flag: '/images/flags/my.svg', code: 'MYR', rate: '326.45', change: 'down' },
  { flag: '/images/flags/id.svg', code: 'IDR', rate: '0.089', change: 'up' },
  { flag: '/images/flags/eu.svg', code: 'EUR', rate: '1,580.32', change: 'up' },
  { flag: '/images/flags/gb.svg', code: 'GBP', rate: '1,845.67', change: 'down' },
  { flag: '/images/flags/au.svg', code: 'AUD', rate: '945.23', change: 'up' },
  { flag: '/images/flags/ca.svg', code: 'CAD', rate: '1,078.90', change: 'down' },
];

// 환율 데이터 - 판매 (Foreign Currency → KRW)
export const SELL_CURRENCIES: Currency[] = [
  { flag: '/images/flags/tw.svg', code: 'TWD', rate: '42.85', change: 'down' },
  { flag: '/images/flags/jp.svg', code: 'JPY', rate: '925.50', change: 'down' },
  { flag: '/images/flags/us.svg', code: 'USD', rate: '1,445.00', change: 'up' },
  { flag: '/images/flags/hk.svg', code: 'HKD', rate: '190.25', change: 'up' },
  { flag: '/images/flags/cn.svg', code: 'CNY', rate: '191.50', change: 'down' },
  { flag: '/images/flags/sg.svg', code: 'SGD', rate: '97.80', change: 'down' },
];

// 네비게이션 아이템
export const NAV_ITEMS: NavItem[] = [
  { label: 'Location', href: '/location' },
  { label: 'Benefit', href: '/benefit', subItems: [
      { label: 'Event', href: '/benefit/event' },
      { label: 'Coupon', href: '/benefit/coupon' },
    ] },
  {
    label: 'THE Free',
    href: '/the-free',
    subItems: [
      { label: 'About', href: '/the-free/about' },
      { label: 'Top-up / Usage History', href: '/the-free/usage-history' },
    ],
  },
  { label: 'Customer Center', href: '/customer-center' },
];

export const RIGHT_NAV_ITEMS: NavItem[] = [
  { label: 'About Dozn', href: '/about' },
  { label: 'Contact us', href: '/contact' },
];

// Family Site 데이터
export const FAMILY_SITES: FamilySite[] = [
  { name: 'Dozn Homepage', url: 'https://dozn.co.kr' },
  { name: 'Dozn Exchange', url: 'https://exchange.dozn.co.kr' },
  { name: '더아파트', url: 'https://theapt-dozn.co.kr' },
  { name: '아보카도', url: 'https://avo-kado.co.kr' },
];
