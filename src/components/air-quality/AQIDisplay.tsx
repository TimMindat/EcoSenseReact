import React from 'react';
import { useAQICalculation } from '../../lib/hooks/useAQICalculation';
import { AQIStatus } from './AQIStatus';
import { AQIDetails } from './AQIDetails';
import { Loader2, AlertCircle } from 'lucide-react';

export function AQIDisplay() {
  const { aqiResult, isLoading, error } = useAQICalculation();

  if (error) {
    return (
      <div className="flex items-center space-x-2 text-red-600">
        <AlertCircle className="h-5 w-5" />
        <span>Error calculating AQI</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Calculating AQI...</span>
      </div>
    );
  }

  if (!aqiResult) {
    return null;
  }

  return (
    <div className="space-y-4">
      <AQIStatus aqi={aqiResult.aqi} category={aqiResult.category} />
      <AQIDetails result={aqiResult} />
    </div>
  );
}