'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import {
  MOCK_FILTER_DATA,
  OPERATING_HOURS_OPTIONS,
  CURRENCY_FLAGS,
} from '../constants';
import type { SelectedFilters, FilterResponseItem } from '../types';
import {
  getVisibleDetailedRegions,
  toggleFilterSelection,
  findFilterByType,
  findFilterById,
  normalizeFiltersWithAll,
} from '../utils/filterUtils';
import FilterButton from './filter/FilterButton';
import CurrencyFilterButton from './filter/CurrencyFilterButton';
import FilterSection from './filter/FilterSection';

interface LocationFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: SelectedFilters) => void;
  initialFilters?: SelectedFilters;
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
}: LocationFilterModalProps) {
  const t = useTranslations('LocationPage.filter');
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(initialFilters);
  const [filterData] = useState<FilterResponseItem[]>(MOCK_FILTER_DATA);

  // Get filter data
  const locationFilters = findFilterByType(filterData, 'LOCATION');
  const regionFilter = locationFilters ? findFilterById(locationFilters.filterList, 1) : undefined;
  const detailedRegionFilter = locationFilters ? findFilterById(locationFilters.filterList, 2) : undefined;
  const detailedRegionList = detailedRegionFilter?.filterDetailList || [];

  const serviceFilters = findFilterByType(filterData, 'SERVICE');
  const servicesFilter = serviceFilters ? findFilterById(serviceFilters.filterList, 3) : undefined;

  const currencyFilters = findFilterByType(filterData, 'CURRENCY');
  const currencyFilter = currencyFilters ? findFilterById(currencyFilters.filterList, 4) : undefined;

  // Normalize filters when modal opens or initialFilters change
  useEffect(() => {
    if (isOpen) {
      const visibleRegions = getVisibleDetailedRegions(
        initialFilters.regions,
        detailedRegionList
      );
      const visibleCodes = visibleRegions.map((r) => r.code);
      const normalizedFilters = normalizeFiltersWithAll(initialFilters, visibleCodes);
      setSelectedFilters(normalizedFilters);
    }
  }, [isOpen, initialFilters, detailedRegionList]);

  // Handle dialog open state change
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  // Toggle filter handler
  const toggleFilter = (category: keyof SelectedFilters, code: string) => {
    setSelectedFilters((prev) =>
      toggleFilterSelection(prev, category, code, detailedRegionList)
    );
  };

  // Check if filter is selected
  const isSelected = (category: keyof SelectedFilters, code: string): boolean => {
    return selectedFilters[category].includes(code);
  };

  // Computed values
  const isKrwToForeignSelected = selectedFilters.services.includes('krw_to_foreign');
  const visibleDetailedRegions = getVisibleDetailedRegions(
    selectedFilters.regions,
    detailedRegionList
  );

  const handleApply = () => {
    onApply(selectedFilters);
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
          {/* Region */}
          {regionFilter && (
            <FilterSection title={t('region')}>
              {regionFilter.filterDetailList.map((item) => (
                <FilterButton
                  key={item.code}
                  label={item.name}
                  isSelected={isSelected('regions', item.code)}
                  onClick={() => toggleFilter('regions', item.code)}
                />
              ))}
            </FilterSection>
          )}

          {/* Detailed Region */}
          {detailedRegionFilter && visibleDetailedRegions.length > 0 && (
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
          {servicesFilter && (
            <FilterSection title={t('servicesProvided')}>
              {servicesFilter.filterDetailList.map((item) => (
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
          {currencyFilter && isKrwToForeignSelected && (
            <FilterSection title={t('currencySelection')}>
              {currencyFilter.filterDetailList.map((item) => (
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
