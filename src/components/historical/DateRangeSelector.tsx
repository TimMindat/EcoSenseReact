import React from 'react';
import { Calendar } from 'lucide-react';
import { DateRange } from '../../lib/types/airQualityHistory';

interface DateRangeSelectorProps {
  dateRange: DateRange;
  onChange: (range: DateRange) => void;
}

export function DateRangeSelector({ dateRange, onChange }: DateRangeSelectorProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-lg shadow">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-green-600" />
        <span className="text-sm font-medium text-gray-700">Date Range</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="startDate" className="text-sm text-gray-600">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={dateRange.startDate.toISOString().split('T')[0]}
            onChange={(e) => onChange({
              ...dateRange,
              startDate: new Date(e.target.value)
            })}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="endDate" className="text-sm text-gray-600">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={dateRange.endDate.toISOString().split('T')[0]}
            onChange={(e) => onChange({
              ...dateRange,
              endDate: new Date(e.target.value)
            })}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
    </div>
  );
}