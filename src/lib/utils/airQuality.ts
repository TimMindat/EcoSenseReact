import { POLLUTANT_LIMITS, AQI_BREAKPOINTS } from '../constants/pollutants';

export function calculatePollutantPercentage(value: number, max: number): number {
  return Math.min(Math.max((value / max) * 100, 0), 100);
}

export function getPollutantStatus(value: number, max: number) {
  const { safe, moderate } = POLLUTANT_LIMITS[Object.keys(POLLUTANT_LIMITS)[0]].dangerLevels;
  
  if (value <= max * safe) {
    return {
      color: 'bg-green-600',
      textColor: 'text-green-600'
    };
  }
  if (value <= max * moderate) {
    return {
      color: 'bg-yellow-600',
      textColor: 'text-yellow-600'
    };
  }
  return {
    color: 'bg-red-600',
    textColor: 'text-red-600'
  };
}

export function getAQIStatus(aqi: number) {
  if (aqi <= 50) {
    return {
      label: 'Good',
      color: 'green',
      bgColor: 'bg-green-600',
      textColor: 'text-green-600',
      percentage: (aqi / 50) * 100
    };
  }
  if (aqi <= 100) {
    return {
      label: 'Moderate',
      color: 'yellow',
      bgColor: 'bg-yellow-600',
      textColor: 'text-yellow-600',
      percentage: (aqi / 100) * 100
    };
  }
  if (aqi <= 150) {
    return {
      label: 'Unhealthy for Sensitive Groups',
      color: 'orange',
      bgColor: 'bg-orange-600',
      textColor: 'text-orange-600',
      percentage: (aqi / 150) * 100
    };
  }
  if (aqi <= 200) {
    return {
      label: 'Unhealthy',
      color: 'red',
      bgColor: 'bg-red-600',
      textColor: 'text-red-600',
      percentage: (aqi / 200) * 100
    };
  }
  if (aqi <= 300) {
    return {
      label: 'Very Unhealthy',
      color: 'purple',
      bgColor: 'bg-purple-600',
      textColor: 'text-purple-600',
      percentage: (aqi / 300) * 100
    };
  }
  return {
    label: 'Hazardous',
    color: 'maroon',
    bgColor: 'bg-red-900',
    textColor: 'text-red-900',
    percentage: 100
  };
}

export function getAQIStatusColor(aqi: number) {
  if (aqi <= 50) {
    return {
      color: 'green',
      bgColor: 'bg-green-600',
      textColor: 'text-green-600'
    };
  }
  if (aqi <= 100) {
    return {
      color: 'yellow',
      bgColor: 'bg-yellow-600',
      textColor: 'text-yellow-600'
    };
  }
  if (aqi <= 150) {
    return {
      color: 'orange',
      bgColor: 'bg-orange-600',
      textColor: 'text-orange-600'
    };
  }
  if (aqi <= 200) {
    return {
      color: 'red',
      bgColor: 'bg-red-600',
      textColor: 'text-red-600'
    };
  }
  if (aqi <= 300) {
    return {
      color: 'purple',
      bgColor: 'bg-purple-600',
      textColor: 'text-purple-600'
    };
  }
  return {
    color: 'maroon',
    bgColor: 'bg-red-900',
    textColor: 'text-red-900'
  };
}