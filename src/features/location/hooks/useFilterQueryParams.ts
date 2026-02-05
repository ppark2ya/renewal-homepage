'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import type { SelectedFilters } from '../types';

// Query parameter keys
const QUERY_KEYS = {
  regions: 'regions',
  detailedRegions: 'detailedRegions',
  services: 'services',
  currencies: 'currencies',
  operatingHours: 'operatingHours',
} as const;

/**
 * Filter out 'all' from array values for query string
 * 'all' is a UI-only state and should not be stored in URL
 */
function filterOutAll(values: string[]): string[] {
  return values.filter((v) => v !== 'all');
}

/**
 * Parse query string values into array
 */
function parseQueryArray(value: string | null): string[] {
  if (!value) return [];
  return value.split(',').filter(Boolean);
}

/**
 * Convert filters to query string
 * Excludes 'all' values as they are derived from selecting all items
 */
function filtersToQueryString(filters: SelectedFilters): string {
  const params = new URLSearchParams();

  const regions = filterOutAll(filters.regions);
  const detailedRegions = filterOutAll(filters.detailedRegions);
  const services = filterOutAll(filters.services);
  const currencies = filterOutAll(filters.currencies);
  const operatingHours = filterOutAll(filters.operatingHours);

  if (regions.length > 0) {
    params.set(QUERY_KEYS.regions, regions.join(','));
  }
  if (detailedRegions.length > 0) {
    params.set(QUERY_KEYS.detailedRegions, detailedRegions.join(','));
  }
  if (services.length > 0) {
    params.set(QUERY_KEYS.services, services.join(','));
  }
  if (currencies.length > 0) {
    params.set(QUERY_KEYS.currencies, currencies.join(','));
  }
  if (operatingHours.length > 0) {
    params.set(QUERY_KEYS.operatingHours, operatingHours.join(','));
  }

  return params.toString();
}

/**
 * Parse filters from search params
 */
export function parseFiltersFromSearchParams(
  searchParams: URLSearchParams
): SelectedFilters {
  return {
    regions: parseQueryArray(searchParams.get(QUERY_KEYS.regions)),
    detailedRegions: parseQueryArray(searchParams.get(QUERY_KEYS.detailedRegions)),
    services: parseQueryArray(searchParams.get(QUERY_KEYS.services)),
    currencies: parseQueryArray(searchParams.get(QUERY_KEYS.currencies)),
    operatingHours: parseQueryArray(searchParams.get(QUERY_KEYS.operatingHours)),
  };
}

/**
 * Hook for managing filter state with URL query parameters
 */
export function useFilterQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * Get current filters from URL
   */
  const getFiltersFromUrl = useCallback((): SelectedFilters => {
    return parseFiltersFromSearchParams(searchParams);
  }, [searchParams]);

  /**
   * Update URL with new filters
   */
  const updateFiltersInUrl = useCallback(
    (filters: SelectedFilters) => {
      const queryString = filtersToQueryString(filters);
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.push(newUrl, { scroll: false });
    },
    [router, pathname]
  );

  /**
   * Clear all filters from URL
   */
  const clearFiltersFromUrl = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  return {
    getFiltersFromUrl,
    updateFiltersInUrl,
    clearFiltersFromUrl,
    currentFilters: getFiltersFromUrl(),
  };
}
