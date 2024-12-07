import React from 'react';
import { Info } from 'lucide-react';
import { AQIResult } from '../../lib/aqi/calculator';
import { POLLUTANT_BREAKPOINTS } from '../../lib/aqi/breakpoints';
import { formatPollutantValue } from '../../lib/utils/formatting';

interface AQIDetailsProps {
  result: AQIResult;
}

export function AQIDetails({ result }: AQIDetailsProps) {
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-start space-x-2">
        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
        <div>
          <h4 className="font-medium text-gray-900">AQI Details</h4>
          <p className="text-sm text-gray-600 mt-1">
            Current AQI is primarily affected by {POLLUTANT_BREAKPOINTS[result.dominantPollutant]?.name || result.dominantPollutant} levels.
          </p>
          
          <div className="mt-3 space-y-2">
            {Object.entries(result.pollutants).map(([pollutant, data]) => {
              const pollutantInfo = POLLUTANT_BREAKPOINTS[pollutant];
              if (!pollutantInfo) return null;

              return (
                <div key={pollutant} className="text-sm">
                  <span className="font-medium">{pollutantInfo.name}:</span>{' '}
                  {formatPollutantValue(data.concentration)} {pollutantInfo.unit}{' '}
                  <span className="text-gray-500">
                    (Sub-index: {Math.round(data.subIndex)})
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}