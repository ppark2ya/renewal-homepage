import type { SelectedFilters, FilterDetailItem, FilterResponseItem, FilterItem } from '../types';

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
  visibleDetailedRegionCodes: string[],
  allCurrencyCodes: string[]
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
    allCurrencyCodes
  );
  if (allCurrenciesSelected && !filters.currencies.includes('all')) {
    normalizedFilters.currencies = ['all', ...filters.currencies];
  } else if (!allCurrenciesSelected && filters.currencies.includes('all')) {
    normalizedFilters.currencies = filters.currencies.filter((c) => c !== 'all');
  }

  return normalizedFilters;
}

/**
 * API filterData에서 지역별 상세 지역 매핑을 동적으로 생성
 * key: region id (string), value: 해당 지역의 상세 지역 code 배열
 */
export function buildRegionToDetailedRegions(
  locationFilterList: FilterItem[]
): Record<string, string[]> {
  const mapping: Record<string, string[]> = {};
  for (const region of locationFilterList) {
    const regionKey = String(region.id);
    mapping[regionKey] = region.filterDetailList.map((d) => d.code);
  }
  return mapping;
}

/**
 * API filterData에서 모든 상세 지역을 하나의 flat list로 합침 (All 포함)
 */
export function buildAllDetailedRegions(
  locationFilterList: FilterItem[]
): FilterDetailItem[] {
  const all: FilterDetailItem[] = [{ code: 'all', name: 'All' }];
  for (const region of locationFilterList) {
    all.push(...region.filterDetailList);
  }
  return all;
}

/**
 * API filterData에서 서비스 목록을 flat하게 추출 (filterDetailList가 비어있지 않은 것만)
 */
export function buildServiceList(
  serviceFilterList: FilterItem[]
): FilterDetailItem[] {
  return serviceFilterList
    .filter((item) => item.filterDetailList.length > 0)
    .map((item) => item.filterDetailList[0]);
}

/**
 * API filterData에서 통화 목록을 flat하게 추출
 */
export function buildCurrencyList(
  currencyFilterList: FilterItem[]
): FilterDetailItem[] {
  const all: FilterDetailItem[] = [{ code: 'all', name: 'All' }];
  for (const item of currencyFilterList) {
    if (item.filterDetailList.length > 0) {
      all.push(item.filterDetailList[0]);
    }
  }
  return all;
}

/**
 * API filterData에서 모든 통화 코드 목록 추출 (All 제외)
 */
export function buildAllCurrencyCodes(
  currencyFilterList: FilterItem[]
): string[] {
  return currencyFilterList
    .filter((item) => item.filterDetailList.length > 0)
    .map((item) => item.filterDetailList[0].code);
}

/**
 * 선택된 지역에 따라 표시할 상세 지역 필터링
 */
export function getVisibleDetailedRegions(
  selectedRegions: string[],
  allDetailedRegions: FilterDetailItem[],
  regionToDetailedRegions: Record<string, string[]>
): FilterDetailItem[] {
  if (selectedRegions.length === 0) {
    return [];
  }

  const visibleCodes = new Set<string>();
  selectedRegions.forEach((region) => {
    const detailedCodes = regionToDetailedRegions[region] || [];
    detailedCodes.forEach((code) => visibleCodes.add(code));
  });

  return allDetailedRegions.filter(
    (item) => item.code === 'all' || visibleCodes.has(item.code)
  );
}

/**
 * 원화→외화 환전 서비스의 code 찾기
 */
export function findKrwToForeignCode(
  serviceFilterList: FilterItem[]
): string | undefined {
  const item = serviceFilterList.find(
    (f) => f.filterDetailList.length > 0 && f.filterDetailList[0].code === 'WON_FOREIGN'
  );
  return item?.filterDetailList[0]?.code;
}

/**
 * 필터 토글 로직 - 새로운 필터 상태 반환
 */
export function toggleFilterSelection(
  prev: SelectedFilters,
  category: keyof SelectedFilters,
  code: string,
  allDetailedRegions: FilterDetailItem[],
  regionToDetailedRegions: Record<string, string[]>,
  allCurrencyCodes: string[],
  krwToForeignCode?: string
): SelectedFilters {
  const current = prev[category];
  const isRemoving = current.includes(code);

  // 상세 지역에서 "All" 선택 시 해당 지역의 모든 상세 지역 선택/해제
  if (category === 'detailedRegions' && code === 'all') {
    if (isRemoving) {
      return { ...prev, detailedRegions: [] };
    }
    const visibleRegions = getVisibleDetailedRegions(prev.regions, allDetailedRegions, regionToDetailedRegions);
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
    return { ...prev, currencies: ['all', ...allCurrencyCodes] };
  }

  // KRW -> Foreign Currency 서비스가 해제되면 통화 선택도 초기화
  if (category === 'services' && krwToForeignCode && code === krwToForeignCode && isRemoving) {
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
    if (areAllItemsSelected(selectedWithoutAll, allCurrencyCodes)) {
      return { ...prev, currencies: ['all', ...selectedWithoutAll] };
    }
  }

  // 상세 지역에서 개별 지역 추가 시 전체가 선택되면 'all'도 추가
  if (category === 'detailedRegions' && code !== 'all') {
    const visibleRegions = getVisibleDetailedRegions(prev.regions, allDetailedRegions, regionToDetailedRegions);
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
