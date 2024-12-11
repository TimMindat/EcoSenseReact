import React from 'react';
import { Sliders } from 'lucide-react';
import { PollutantFilter } from '../../lib/types/airQualityHistory';
import { POLLUTANT_LIMITS } from '../../lib/constants/pollutants';

interface FilterControlsProps {
  filters: PollutantFilter[];
  onFilterChange: (filters: PollutantFilter[]) => void;
}

export function FilterControls({ filters, onFilterChange }: FilterControlsProps) {
  const handleFilterChange = (index: number, updates: Partial<PollutantFilter>) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], ...updates };
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center gap-2 mb-4">
        <Sliders className="h-5 w-5 text-green-600" />
        <h3 className="text-sm font-medium text-gray-700">Filter Parameters</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filters.map((filter, index) => {
          const pollutant = POLLUTANT_LIMITS[filter.id];
          if (!pollutant) return null;

          return (
            <div key={filter.id} className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {pollutant.label}
              </label>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Min value"
                  value={filter.min || ''}
                  onChange={(e) => handleFilterChange(index, {
                    min: e.target.value ? Number(e.target.value) : undefined
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="number"
                  placeholder="Max value"
                  value={filter.max || ''}
                  onChange={(e) => handleFilterChange(index, {
                    max: e.target.value ? Number(e.target.value) : undefined
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="number"
                  placeholder="Exact value"
                  value={filter.value || ''}
                  onChange={(e) => handleFilterChange(index, {
                    value: e.target.value ? Number(e.target.value) : undefined
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}