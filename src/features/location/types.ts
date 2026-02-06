/**
 * Location 페이지 관련 타입 정의
 */

import type { GetKioskListQuery, GetKioskFilterQuery } from '@/graphql/generated/graphql';

// KioskInfo 타입 (getKioskList 응답의 list item)
export type LocationItem = GetKioskListQuery['getKioskList']['list'][number];

// 핫스팟 버튼
export interface HotspotButton {
  id: string;
  name: string;
  icon: string;
  latitude: number;
  longitude: number;
}

// 필터 응답 데이터 (GraphQL 생성 타입에서 파생)
export type FilterResponseItem = GetKioskFilterQuery['getKioskFilter'][number];

// 필터 항목
export type FilterItem = FilterResponseItem['filterList'][number];

// 필터 상세 항목
export type FilterDetailItem = FilterItem['filterDetailList'][number];

// 선택된 필터 상태
export interface SelectedFilters {
  regions: string[];
  detailedRegions: string[];
  services: string[];
  currencies: string[];
  operatingHours: string[];
}
