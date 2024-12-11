import React from 'react';
import { formatTooltipDateTime } from '../../lib/utils/dateFormatters';
import { POLLUTANT_LIMITS } from '../../lib/constants/pollutants';

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: number;
}

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
      <p className="font-medium text-gray-900 mb-2">
        {formatTooltipDateTime(label)}
      </p>
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-600">
              {POLLUTANT_LIMITS[entry.name]?.label || entry.name}:
            </span>
            <span className="font-medium">
              {Number(entry.value).toFixed(2)} {POLLUTANT_LIMITS[entry.name]?.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}