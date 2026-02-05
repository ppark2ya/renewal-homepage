import type { SelectedFilters, FilterDetailItem, FilterResponseItem } from '../types';
import { REGION_TO_DETAILED_REGIONS, ALL_CURRENCY_CODES } from '../constants';

/**
 * 선택된 지역에 따라 표시할 상세 지역 필터링
 */
export function getVisibleDetailedRegions(
  selectedRegions: string[],
  allDetailedRegions: FilterDetailItem[]
): FilterDetailItem[] {
  if (selectedRegions.length === 0) {
    return [];
  }

  const visibleCodes = new Set<string>();
  selectedRegions.forEach((region) => {
    const detailedCodes = REGION_TO_DETAILED_REGIONS[region] || [];
    detailedCodes.forEach((code) => visibleCodes.add(code));
  });

  return allDetailedRegions.filter(
    (item) => item.code === 'all' || visibleCodes.has(item.code)
  );
}

/**
 * 필터 토글 로직 - 새로운 필터 상태 반환
 */
export function toggleFilterSelection(
  prev: SelectedFilters,
  category: keyof SelectedFilters,
  code: string,
  detailedRegionList: FilterDetailItem[]
): SelectedFilters {
  const current = prev[category];
  const isRemoving = current.includes(code);

  // 상세 지역에서 "All" 선택 시 해당 지역의 모든 상세 지역 선택/해제
  if (category === 'detailedRegions' && code === 'all') {
    if (isRemoving) {
      return { ...prev, detailedRegions: [] };
    }
    const visibleRegions = getVisibleDetailedRegions(prev.regions, detailedRegionList);
    return {
      ...prev,
      detailedRegions: visibleRegions.map((item) => item.code),
    };
  }

  // 통화에서 "All" 선택 시 모든 통화 선택/해제
  if (category === 'currencies' && code === 'all') {
    if (isRemoving) {
      return { ...prev, currencies: [] };
    }
    return { ...prev, currencies: ['all', ...ALL_CURRENCY_CODES] };
  }

  // KRW -> Foreign Currency 서비스가 해제되면 통화 선택도 초기화
  if (category === 'services' && code === 'krw_to_foreign' && isRemoving) {
    return {
      ...prev,
      services: current.filter((c) => c !== code),
      currencies: [],
    };
  }

  // 지역 선택/해제 시 상세 지역 초기화
  if (category === 'regions') {
    if (isRemoving) {
      return {
        ...prev,
        regions: current.filter((c) => c !== code),
        detailedRegions: [],
      };
    }
    return { ...prev, regions: [...current, code], detailedRegions: [] };
  }

  // 일반적인 토글 로직
  if (isRemoving) {
    // 통화에서 개별 통화 해제 시 All도 해제
    if (category === 'currencies' && code !== 'all') {
      return {
        ...prev,
        currencies: current.filter((c) => c !== code && c !== 'all'),
      };
    }
    // 상세 지역에서 개별 지역 해제 시 All도 해제
    if (category === 'detailedRegions' && code !== 'all') {
      return {
        ...prev,
        detailedRegions: current.filter((c) => c !== code && c !== 'all'),
      };
    }
    return { ...prev, [category]: current.filter((c) => c !== code) };
  }

  return { ...prev, [category]: [...current, code] };
}

/**
 * 필터 데이터에서 특정 타입의 필터 항목 찾기
 */
export function findFilterByType(filterData: FilterResponseItem[], type: string) {
  return filterData.find((f) => f.type === type);
}

/**
 * 필터 리스트에서 특정 ID의 필터 항목 찾기
 */
export function findFilterById(filterList: { id: number; name: string; filterDetailList: FilterDetailItem[] }[], id: number) {
  return filterList.find((f) => f.id === id);
}
