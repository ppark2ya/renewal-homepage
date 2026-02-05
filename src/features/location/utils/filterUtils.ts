import type { SelectedFilters, FilterDetailItem, FilterResponseItem } from '../types';
import { REGION_TO_DETAILED_REGIONS, ALL_CURRENCY_CODES } from '../constants';

/**
 * Check if all items (excluding 'all') are selected
 */
export function areAllItemsSelected(
  selectedItems: string[],
  allItems: string[]
): boolean {
  const itemsWithoutAll = allItems.filter((item) => item !== 'all');
  const selectedWithoutAll = selectedItems.filter((item) => item !== 'all');
  return (
    itemsWithoutAll.length > 0 &&
    itemsWithoutAll.every((item) => selectedWithoutAll.includes(item))
  );
}

/**
 * Normalize filters to include/exclude 'all' based on selection state
 * - Add 'all' if all items are selected
 * - Remove 'all' if not all items are selected
 */
export function normalizeFiltersWithAll(
  filters: SelectedFilters,
  visibleDetailedRegionCodes: string[]
): SelectedFilters {
  const normalizedFilters = { ...filters };

  // Normalize detailed regions
  const detailedRegionCodesWithoutAll = visibleDetailedRegionCodes.filter(
    (code) => code !== 'all'
  );
  if (detailedRegionCodesWithoutAll.length > 0) {
    const allDetailedSelected = areAllItemsSelected(
      filters.detailedRegions,
      detailedRegionCodesWithoutAll
    );
    if (allDetailedSelected && !filters.detailedRegions.includes('all')) {
      normalizedFilters.detailedRegions = ['all', ...filters.detailedRegions];
    } else if (!allDetailedSelected && filters.detailedRegions.includes('all')) {
      normalizedFilters.detailedRegions = filters.detailedRegions.filter(
        (c) => c !== 'all'
      );
    }
  }

  // Normalize currencies
  const allCurrenciesSelected = areAllItemsSelected(
    filters.currencies,
    ALL_CURRENCY_CODES
  );
  if (allCurrenciesSelected && !filters.currencies.includes('all')) {
    normalizedFilters.currencies = ['all', ...filters.currencies];
  } else if (!allCurrenciesSelected && filters.currencies.includes('all')) {
    normalizedFilters.currencies = filters.currencies.filter((c) => c !== 'all');
  }

  return normalizedFilters;
}

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

  // 개별 항목 추가 시 - 전체가 선택되면 'all'도 자동 추가
  const newSelection = [...current, code];

  // 통화에서 개별 통화 추가 시 전체가 선택되면 'all'도 추가
  if (category === 'currencies' && code !== 'all') {
    const selectedWithoutAll = newSelection.filter((c) => c !== 'all');
    if (areAllItemsSelected(selectedWithoutAll, ALL_CURRENCY_CODES)) {
      return { ...prev, currencies: ['all', ...selectedWithoutAll] };
    }
  }

  // 상세 지역에서 개별 지역 추가 시 전체가 선택되면 'all'도 추가
  if (category === 'detailedRegions' && code !== 'all') {
    const visibleRegions = getVisibleDetailedRegions(prev.regions, detailedRegionList);
    const visibleCodesWithoutAll = visibleRegions
      .map((r) => r.code)
      .filter((c) => c !== 'all');
    const selectedWithoutAll = newSelection.filter((c) => c !== 'all');
    if (areAllItemsSelected(selectedWithoutAll, visibleCodesWithoutAll)) {
      return { ...prev, detailedRegions: ['all', ...selectedWithoutAll] };
    }
  }

  return { ...prev, [category]: newSelection };
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
