import React from 'react';
import { Calendar } from 'lucide-react';

interface TimeRangeSelectorProps {
  value: {
    start: Date;
    end: Date;
  };
  onChange: (range: { start: Date; end: Date }) => void;
}

export function TimeRangeSelector({ value, onChange }: TimeRangeSelectorProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center space-x-2 mb-3">
        <Calendar className="h-5 w-5 text-green-600" />
        <h3 className="text-sm font-medium text-gray-700">Time Range</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="start-date" className="block text-sm text-gray-600 mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="start-date"
            value={value.start.toISOString().split('T')[0]}
            onChange={(e) => onChange({ ...value, start: new Date(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label htmlFor="end-date" className="block text-sm text-gray-600 mb-1">
            End Date
          </label>
          <input
            type="date"
            id="end-date"
            value={value.end.toISOString().split('T')[0]}
            onChange={(e) => onChange({ ...value, end: new Date(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>
    </div>
  );
}