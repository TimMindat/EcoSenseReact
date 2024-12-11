import { AQI_BREAKPOINTS } from '../../constants/pollutants';

export interface AQIStatus {
  label: string;
  color: string;
  textColor: string;
  bgColor: string;
}

export function getAQIStatus(aqi: number): AQIStatus {
  if (aqi <= 50) {
    return {
      label: 'Good',
      color: 'text-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-600'
    };
  }
  if (aqi <= 100) {
    return {
      label: 'Moderate',
      color: 'text-yellow-600',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-600'
    };
  }
  if (aqi <= 150) {
    return {
      label: 'Unhealthy for Sensitive Groups',
      color: 'text-orange-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-600'
    };
  }
  if (aqi <= 200) {
    return {
      label: 'Unhealthy',
      color: 'text-red-600',
      textColor: 'text-red-600',
      bgColor: 'bg-red-600'
    };
  }
  if (aqi <= 300) {
    return {
      label: 'Very Unhealthy',
      color: 'text-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-600'
    };
  }
  return {
    label: 'Hazardous',
    color: 'text-red-900',
    textColor: 'text-red-900',
    bgColor: 'bg-red-900'
  };
}

export function getAQICategory(aqi: number) {
  return AQI_BREAKPOINTS.find(({ min, max }) => aqi >= min && aqi <= max) || AQI_BREAKPOINTS[AQI_BREAKPOINTS.length - 1];
}