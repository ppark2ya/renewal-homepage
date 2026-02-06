'use client';

import { useState } from 'react';
import type { LocationItem } from '../types';

interface UseLocationSearchProps {
  locations: LocationItem[];
}

interface UseLocationSearchReturn {
  searchQuery: string;
  filteredLocations: LocationItem[];
  handleSearch: (query: string) => void;
  clearSearch: () => void;
}

export function useLocationSearch({
  locations,
}: UseLocationSearchProps): UseLocationSearchReturn {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  // React Compiler handles memoization automatically
  const filteredLocations = searchQuery.trim()
    ? locations.filter((location) =>
        location.terminalName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : locations;

  return {
    searchQuery,
    filteredLocations,
    handleSearch,
    clearSearch,
  };
}
