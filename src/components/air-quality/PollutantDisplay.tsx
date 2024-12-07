import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { POLLUTANT_LIMITS } from '../../lib/constants/pollutants';
import { formatPollutantValue } from '../../lib/utils/formatting';
import { getPollutantStatus } from '../../lib/utils/airQuality';

interface PollutantDisplayProps {
  pollutant: string;
  value: number | undefined;
}

export function PollutantDisplay({ pollutant, value }: PollutantDisplayProps) {
  const pollutantInfo = POLLUTANT_LIMITS[pollutant as keyof typeof POLLUTANT_LIMITS];
  
  if (!pollutantInfo) {
    return null;
  }

  const { label, unit, max } = pollutantInfo;
  const formattedValue = formatPollutantValue(value);
  const percentage = value ? Math.min((value / max) * 100, 100) : 0;
  const { color, textColor } = getPollutantStatus(value || 0, max);

  return (
    <div className="relative group">
      <div className="mb-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <Info className="h-4 w-4 text-gray-400 cursor-help" />
        </div>
        <div className="flex items-center">
          {value === undefined ? (
            <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1" />
          ) : (
            <span className={`text-sm font-medium ${textColor}`}>
              {formattedValue} {unit}
            </span>
          )}
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${percentage}%` }}
          title={`${percentage.toFixed(1)}% of maximum safe level`}
        />
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
        <p className="text-center">
          WHO guideline: {max} {unit}
        </p>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 border-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  );
}