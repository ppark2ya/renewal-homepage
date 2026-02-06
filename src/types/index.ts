/**
 * 공통 타입 정의
 */
import {CurrencyCode} from "@/graphql/generated/graphql";

// 통화 관련 타입
export interface Currency {
  flag: string;
  code: string;
  rate: string;
  change: 'up' | 'down';
}

export type ExchangeDirection = 'buy' | 'sell';

// 리뷰 타입
export interface Review {
  id: number;
  location: string;
  text: string;
  currencyCode: CurrencyCode
}

// 키오스크 타입
export interface Kiosk {
  id: number;
  name: string;
  city: string;
  image: string;
}

// 이벤트 타입
export interface KoreaEvent {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  startAt: string;
  endAt: string;
}

// 카테고리 액션 타입
export type CategoryAction =
  | { type: 'phone'; phoneNumber: string; fallbackHref: string }
  | { type: 'navigate'; href: string }
  | { type: 'navigate-with-currencies'; href: string; currencies: string[]; services: string[] }
  | { type: 'scroll'; targetId: string };

// 카테고리 타입
export interface Category {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  badgeText?: string;
  action?: CategoryAction;
}

// 브랜드 타입
export interface Brand {
  name: string;
  logo: string;
  width: number;
  height: number;
}

// 네비게이션 타입
export interface NavItem {
  label: string;
  href: string;
  subItems?: NavSubItem[];
}

export interface NavSubItem {
  label: string;
  href: string;
}

// Family Site 타입
export interface FamilySite {
  name: string;
  url: string;
}

// 폼 데이터 타입
export interface InquiryFormData {
  name: string;
  company: string;
  email: string;
  contactNumber: string;
  inquiry: string;
}

// 컴포넌트 공통 Props
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 애니메이션 상태 타입
export type AnimationState = 'idle' | 'opening' | 'closing';

// 리뷰 카드 변형 타입
export type ReviewCardVariant = 'default' | 'medium' | 'mobile';

// Placeholder 타입
export type FallbackType = 'image' | 'icon' | 'skeleton';
export type PlaceholderType = 'skeleton' | 'blur' | 'icon';
