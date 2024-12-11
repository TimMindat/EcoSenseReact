import React from 'react';

interface TemperatureDisplayProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  showUnit?: boolean;
}

export function TemperatureDisplay({ 
  value, 
  size = 'md',
  showUnit = true 
}: TemperatureDisplayProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  const formattedTemp = Math.round(value);
  const tempColor = value < 0 ? 'text-blue-600' : 
                   value < 15 ? 'text-blue-500' :
                   value < 25 ? 'text-green-500' :
                   value < 30 ? 'text-yellow-500' :
                   'text-red-500';

  return (
    <span className={`${sizeClasses[size]} font-bold ${tempColor}`}>
      {formattedTemp}{showUnit && '°C'}
    </span>
  );
}