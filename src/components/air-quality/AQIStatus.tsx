import React from 'react';
import { getAQIStatusColor } from '../../lib/utils/airQuality';

interface AQIStatusProps {
  aqi: number;
  category: string;
}

export function AQIStatus({ aqi, category }: AQIStatusProps) {
  const { color, bgColor, textColor } = getAQIStatusColor(aqi);
  const percentage = (aqi / 500) * 100;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Air Quality Index</span>
        <span className={`text-sm font-medium ${textColor}`}>
          {aqi} - {category}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div
          className={`${bgColor} h-2.5 rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
          title={`AQI: ${aqi}`}
        />
      </div>
      <p className="text-sm text-gray-600">
        {aqi} out of 500 on the Air Quality Index scale
      </p>
    </div>
  );
}