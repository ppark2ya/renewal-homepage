/**
 * Location 페이지 관련 타입 정의
 */

// 서비스 타입
export type ServiceType =
  | 'foreignToKrw'
  | 'krwToForeign'
  | 'taxRefund'
  | 'ezlCardTopup';

// 장소 타입 (아이콘 구분용)
export type PlaceType = 'hotel' | 'hospital' | 'shopping' | 'outdoor';

// 위치 정보
export interface LocationItem {
  id: number;
  name: string;
  placeType: PlaceType;
  operatingHours: string;
  services: ServiceType[];
  latitude: number;
  longitude: number;
  image?: string;
}

// 핫스팟 버튼
export interface HotspotButton {
  id: string;
  name: string;
  icon: string;
  latitude: number;
  longitude: number;
}

// 서비스 배지 정보
export interface ServiceBadgeInfo {
  type: ServiceType;
  label: string;
  bgColor: string;
  textColor: string;
}

// 필터 타입
export type FilterType = 'LOCATION' | 'SERVICE' | 'CURRENCY';

// 필터 상세 항목
export interface FilterDetailItem {
  code: string;
  name: string;
}

// 필터 항목
export interface FilterItem {
  id: number;
  name: string;
  filterDetailList: FilterDetailItem[];
}

// 필터 응답 데이터
export interface FilterResponseItem {
  type: FilterType;
  filterList: FilterItem[];
}

// 선택된 필터 상태
export interface SelectedFilters {
  regions: string[];
  detailedRegions: string[];
  services: string[];
  currencies: string[];
  operatingHours: string[];
}
