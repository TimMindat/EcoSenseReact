import React from 'react';
import { AlertCircle } from 'lucide-react';
import { TemperatureDisplay } from './TemperatureDisplay';

interface TemperatureRangeProps {
  min: number;
  max: number;
  isValid: boolean;
}

export function TemperatureRange({ min, max, isValid }: TemperatureRangeProps) {
  if (!isValid) {
    return (
      <div className="flex items-center text-gray-500">
        <AlertCircle className="h-4 w-4 mr-2" />
        <span>Temperature range unavailable</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div>
        <span className="text-sm text-gray-600">Low</span>
        <TemperatureDisplay
          value={min}
          size="sm"
          showUnit={false}
        />
      </div>
      <div className="text-gray-300">/</div>
      <div>
        <span className="text-sm text-gray-600">High</span>
        <TemperatureDisplay
          value={max}
          size="sm"
          showUnit={true}
        />
      </div>
    </div>
  );
}