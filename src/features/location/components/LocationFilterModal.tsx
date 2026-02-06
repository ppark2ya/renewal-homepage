'use client';

import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { CURRENCY_FLAGS, OPERATING_HOURS_OPTIONS } from '../constants';
import type { FilterResponseItem, SelectedFilters } from '../types';
import {
  findFilterByType,
  getVisibleDetailedRegions,
  normalizeFiltersWithAll,
  toggleFilterSelection,
  buildRegionToDetailedRegions,
  buildAllDetailedRegions,
  buildServiceList,
  buildCurrencyList,
  buildAllCurrencyCodes,
  findKrwToForeignCode,
} from '../utils/filterUtils';
import FilterButton from './filter/FilterButton';
import CurrencyFilterButton from './filter/CurrencyFilterButton';
import FilterSection from './filter/FilterSection';

interface LocationFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: SelectedFilters) => void;
  initialFilters?: SelectedFilters;
  filterData: FilterResponseItem[];
  filterLoading?: boolean;
}

const DEFAULT_FILTERS: SelectedFilters = {
  regions: [],
  detailedRegions: [],
  services: [],
  currencies: [],
  operatingHours: [],
};

export default function LocationFilterModal({
  isOpen,
  onClose,
  onApply,
  initialFilters = DEFAULT_FILTERS,
  filterData,
  filterLoading = false,
}: LocationFilterModalProps) {
  const t = useTranslations('LocationPage.filter');
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(initialFilters);

  // API 데이터에서 필터 구조 파생 - useMemo로 참조 안정화
  const {
    locationFilterList,
    regionToDetailedRegions,
    allDetailedRegions,
    serviceList,
    currencyList,
    allCurrencyCodes,
    krwToForeignCode,
  } = useMemo(() => {
    const locationData = findFilterByType(filterData, 'LOCATION');
    const locationList = locationData?.filterList || [];

    const serviceData = findFilterByType(filterData, 'SERVICE');
    const serviceFilterList = serviceData?.filterList || [];

    const currencyData = findFilterByType(filterData, 'CURRENCY');
    const currencyFilterList = currencyData?.filterList || [];

    return {
      locationFilterList: locationList,
      regionToDetailedRegions: buildRegionToDetailedRegions(locationList),
      allDetailedRegions: buildAllDetailedRegions(locationList),
      serviceList: buildServiceList(serviceFilterList),
      currencyList: buildCurrencyList(currencyFilterList),
      allCurrencyCodes: buildAllCurrencyCodes(currencyFilterList),
      krwToForeignCode: findKrwToForeignCode(serviceFilterList),
    };
  }, [filterData]);

  // Normalize filters when modal opens or initialFilters change
  useEffect(() => {
    if (isOpen) {
      const visibleRegions = getVisibleDetailedRegions(
        initialFilters.regions,
        allDetailedRegions,
        regionToDetailedRegions
      );
      const visibleCodes = visibleRegions.map((r) => r.code);
      const normalizedFilters = normalizeFiltersWithAll(initialFilters, visibleCodes, allCurrencyCodes);
      setSelectedFilters(normalizedFilters);
    }
  }, [isOpen, initialFilters, allDetailedRegions, regionToDetailedRegions, allCurrencyCodes]);

  // Handle dialog open state change
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  // Toggle filter handler
  const toggleFilter = (category: keyof SelectedFilters, code: string) => {
    setSelectedFilters((prev) =>
      toggleFilterSelection(
        prev,
        category,
        code,
        allDetailedRegions,
        regionToDetailedRegions,
        allCurrencyCodes,
        krwToForeignCode
      )
    );
  };

  // Check if filter is selected
  const isSelected = (category: keyof SelectedFilters, code: string): boolean => {
    return selectedFilters[category].includes(code);
  };

  // Computed values
  const isKrwToForeignSelected = krwToForeignCode
    ? selectedFilters.services.includes(krwToForeignCode)
    : false;
  const visibleDetailedRegions = getVisibleDetailedRegions(
    selectedFilters.regions,
    allDetailedRegions,
    regionToDetailedRegions
  );

  const handleApply = () => {
    // 지역은 선택했지만 상세 지역을 선택하지 않은 경우, 해당 지역의 모든 상세 지역을 자동 선택
    let filtersToApply = selectedFilters;
    if (selectedFilters.regions.length > 0 && selectedFilters.detailedRegions.length === 0) {
      const allVisibleRegions = getVisibleDetailedRegions(
        selectedFilters.regions,
        allDetailedRegions,
        regionToDetailedRegions
      );
      filtersToApply = {
        ...selectedFilters,
        detailedRegions: allVisibleRegions.map((item) => item.code),
      };
    }
    onApply(filtersToApply);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="flex h-full max-h-[100vh] w-full max-w-[778px] flex-col gap-0 rounded-none p-0 md:h-[600px] md:max-h-[90vh] md:rounded-2xl [&>button]:hidden overflow-clip">
        {/* Header */}
        <DialogHeader className="flex h-[54px] shrink-0 flex-row items-center justify-between border-b-0 px-4">
          <div className="flex items-end gap-2">
            <DialogTitle className="text-[24px] font-normal leading-[40px] text-[#111] capitalize">
              {t('title')}
            </DialogTitle>
            <span className="text-[14px] leading-[30px] text-[#717895]">
              {t('multipleSelections')}
            </span>
          </div>
          <DialogClose asChild>
            <button
              type="button"
              className="rounded-full p-2 opacity-70 transition-opacity hover:opacity-100"
            >
              <X className="h-6 w-6" />
            </button>
          </DialogClose>
        </DialogHeader>

        {/* Filter Content */}
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pb-8 pt-4">
          {filterLoading ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#FFD300]" />
            </div>
          ) : (
          <>
          {/* Region */}
          {locationFilterList.length > 0 && (
            <FilterSection title={t('region')}>
              {locationFilterList.map((item) => (
                <FilterButton
                  key={item.id}
                  label={item.name}
                  isSelected={isSelected('regions', String(item.id))}
                  onClick={() => toggleFilter('regions', String(item.id))}
                />
              ))}
            </FilterSection>
          )}

          {/* Detailed Region */}
          {visibleDetailedRegions.length > 0 && (
            <FilterSection title={t('detailedRegion')}>
              {visibleDetailedRegions.map((item) => (
                <FilterButton
                  key={item.code}
                  label={item.name}
                  isSelected={isSelected('detailedRegions', item.code)}
                  onClick={() => toggleFilter('detailedRegions', item.code)}
                />
              ))}
            </FilterSection>
          )}

          {/* Services Provided */}
          {serviceList.length > 0 && (
            <FilterSection title={t('servicesProvided')}>
              {serviceList.map((item) => (
                <FilterButton
                  key={item.code}
                  label={item.name}
                  isSelected={isSelected('services', item.code)}
                  onClick={() => toggleFilter('services', item.code)}
                />
              ))}
            </FilterSection>
          )}

          {/* Currency Selection */}
          {currencyList.length > 0 && isKrwToForeignSelected && (
            <FilterSection title={t('currencySelection')}>
              {currencyList.map((item) => (
                <CurrencyFilterButton
                  key={item.code}
                  code={item.code}
                  label={item.name}
                  isSelected={isSelected('currencies', item.code)}
                  onClick={() => toggleFilter('currencies', item.code)}
                  flagSrc={CURRENCY_FLAGS[item.code]}
                />
              ))}
            </FilterSection>
          )}

          {/* Operating Hours */}
          <FilterSection title={t('operatingHours')}>
            {OPERATING_HOURS_OPTIONS.map((item) => (
              <FilterButton
                key={item.code}
                label={item.name}
                isSelected={isSelected('operatingHours', item.code)}
                onClick={() => toggleFilter('operatingHours', item.code)}
              />
            ))}
          </FilterSection>
          </>
          )}
        </div>

        {/* Apply Button */}
        <div className="mt-auto shrink-0 px-4 pb-4 md:px-0 md:pb-0">
          <Button
            type="button"
            onClick={handleApply}
            className="h-[50px] w-full rounded-full bg-[#FFD300] text-[16px] leading-[24px] text-[#111] hover:bg-[#FFD300]/90 md:rounded-none"
          >
            {t('apply')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
