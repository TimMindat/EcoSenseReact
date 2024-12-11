import { useState, useCallback } from 'react';
import { HistoricalDataPoint, DateRange, PollutantFilter } from '../types/airQualityHistory';
import { generateMockHistoricalData } from '../utils/mockData';

export function useHistoricalData() {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(new Date().getFullYear() - 4, 0, 1),
    endDate: new Date()
  });
  const [filters, setFilters] = useState<PollutantFilter[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const fetchHistoricalData = useCallback(async (): Promise<HistoricalDataPoint[]> => {
    // In a real application, this would fetch from an API
    // For now, we'll use mock data
    return generateMockHistoricalData(dateRange.startDate, dateRange.endDate);
  }, [dateRange]);

  const applyFilters = useCallback((data: HistoricalDataPoint[]): HistoricalDataPoint[] => {
    return data.filter(point => {
      return filters.every(filter => {
        const value = point.components[filter.id];
        if (!value) return true;
        
        if (filter.min !== undefined && value < filter.min) return false;
        if (filter.max !== undefined && value > filter.max) return false;
        if (filter.value !== undefined && value !== filter.value) return false;
        
        return true;
      });
    });
  }, [filters]);

  const sortData = useCallback((data: HistoricalDataPoint[]): HistoricalDataPoint[] => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a.components[sortConfig.key as keyof typeof a.components] || 0;
      const bValue = b.components[sortConfig.key as keyof typeof b.components] || 0;
      
      return sortConfig.direction === 'asc' 
        ? aValue - bValue 
        : bValue - aValue;
    });
  }, [sortConfig]);

  return {
    dateRange,
    setDateRange,
    filters,
    setFilters,
    sortConfig,
    setSortConfig,
    fetchHistoricalData,
    applyFilters,
    sortData
  };
}