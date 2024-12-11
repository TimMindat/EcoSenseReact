import React from 'react';

interface WeatherIconProps {
  code: string;
  description: string;
}

export function WeatherIcon({ code, description }: WeatherIconProps) {
  return (
    <img
      src={`https://openweathermap.org/img/wn/${code}@2x.png`}
      alt={description}
      className="w-16 h-16"
      loading="lazy"
    />
  );
}