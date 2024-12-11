import React from 'react';
import { TemperatureRange, validateTemperatureRange } from '../../lib/utils/temperature';
import { TemperatureDisplay } from './TemperatureDisplay';
import { AlertCircle } from 'lucide-react';

interface TemperatureRangeDisplayProps {
  range: TemperatureRange;
  className?: string;
}

export function TemperatureRangeDisplay({ range, className = '' }: TemperatureRangeDisplayProps) {
  if (!validateTemperatureRange(range)) {
    return (
      <div className={`flex items-center space-x-2 text-gray-500 ${className}`}>
        <AlertCircle className="h-4 w-4" />
        <span>Temperature data unavailable</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <TemperatureDisplay 
        value={range.min} 
        label="Low" 
        size="sm"
        showUnit={false}
      />
      <div className="text-gray-300">/</div>
      <TemperatureDisplay 
        value={range.max} 
        label="High" 
        size="sm"
        showUnit={true}
      />
    </div>
  );
}