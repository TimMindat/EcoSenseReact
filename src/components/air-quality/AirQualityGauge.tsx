import React from 'react';
import { calculatePollutantPercentage, getPollutantStatus } from '../../lib/utils/airQuality';

interface AirQualityGaugeProps {
  value: number;
  max: number;
  label: string;
}

export function AirQualityGauge({ value, max, label }: AirQualityGaugeProps) {
  const percentage = calculatePollutantPercentage(value, max);
  const { color, textColor } = getPollutantStatus(value, max);
  
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className={`text-sm font-medium ${textColor}`}>
          {value.toFixed(1)}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`${color} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
          title={`${percentage.toFixed(1)}% of maximum safe level`}
        />
      </div>
    </div>
  );
}