import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useTemperatureRange } from '../../lib/hooks/useTemperatureRange';
import { TemperatureDisplay } from './TemperatureDisplay';

export function TemperatureRangeCard() {
  const { range, isLoading, error } = useTemperatureRange();

  if (error) {
    return (
      <div className="flex items-center space-x-2 text-red-600">
        <AlertCircle className="h-4 w-4" />
        <span>Error loading temperature data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-2">
        <div className="h-4 bg-gray-200 rounded w-24" />
        <div className="h-6 bg-gray-200 rounded w-32" />
      </div>
    );
  }

  if (!range.isValid) {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <AlertCircle className="h-4 w-4" />
        <span>Temperature data unavailable</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div>
        <span className="text-sm text-gray-600">Low</span>
        <TemperatureDisplay value={range.min} size="sm" showUnit={false} />
      </div>
      <div className="text-gray-300">/</div>
      <div>
        <span className="text-sm text-gray-600">High</span>
        <TemperatureDisplay value={range.max} size="sm" showUnit={true} />
      </div>
    </div>
  );
}