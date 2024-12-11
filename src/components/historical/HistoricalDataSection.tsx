import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { DateRangeSelector } from './DateRangeSelector';
import { FilterControls } from './FilterControls';
import { HistoricalChart } from './HistoricalChart';
import { useHistoricalData } from '../../lib/hooks/useHistoricalData';
import { PollutantChartConfigs } from '../../lib/types/airQualityHistory';
import { POLLUTANT_LIMITS } from '../../lib/constants/pollutants';

const CHART_COLORS = [
  '#2563eb', // blue-600
  '#dc2626', // red-600
  '#16a34a', // green-600
  '#9333ea', // purple-600
  '#ca8a04', // yellow-600
  '#0891b2', // cyan-600
];

const initialChartConfigs: PollutantChartConfigs = Object.keys(POLLUTANT_LIMITS).reduce((acc, key, index) => ({
  ...acc,
  [key]: {
    visible: true,
    color: CHART_COLORS[index % CHART_COLORS.length],
    strokeWidth: 2
  }
}), {} as PollutantChartConfigs);

export function HistoricalDataSection() {
  const {
    dateRange,
    setDateRange,
    filters,
    setFilters,
    fetchHistoricalData,
    applyFilters,
    sortData
  } = useHistoricalData();

  const [data, setData] = useState([]);
  const [chartConfigs, setChartConfigs] = useState(initialChartConfigs);

  useEffect(() => {
    const loadData = async () => {
      const historicalData = await fetchHistoricalData();
      const filteredData = applyFilters(historicalData);
      const sortedData = sortData(filteredData);
      setData(sortedData);
    };

    loadData();
  }, [dateRange, filters, fetchHistoricalData, applyFilters, sortData]);

  const handleExport = () => {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `air-quality-data-${new Date().toISOString()}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Historical Data</h2>
        <button
          onClick={handleExport}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </button>
      </div>

      <DateRangeSelector dateRange={dateRange} onChange={setDateRange} />
      
      <FilterControls
        filters={Object.keys(POLLUTANT_LIMITS).map(key => ({
          id: key as keyof typeof POLLUTANT_LIMITS
        }))}
        onFilterChange={setFilters}
      />

      <HistoricalChart
        data={data}
        chartConfigs={chartConfigs}
        onConfigChange={setChartConfigs}
      />
    </div>
  );
}

function convertToCSV(data: any[]): string {
  const headers = ['Date', ...Object.keys(POLLUTANT_LIMITS).map(key => POLLUTANT_LIMITS[key].label)];
  
  const rows = data.map(point => [
    new Date(point.timestamp).toISOString(),
    ...Object.keys(POLLUTANT_LIMITS).map(key => point.components[key] || '')
  ]);

  return [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
}