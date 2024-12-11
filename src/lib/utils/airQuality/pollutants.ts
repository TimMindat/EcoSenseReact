import { POLLUTANT_LIMITS } from '../../constants/pollutants';
import { PollutantData } from '../../types/airQuality';

export interface PollutantStatus {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'moderate' | 'poor';
  color: string;
}

export function getPollutantStatus(pollutant: keyof typeof POLLUTANT_LIMITS, value: number): PollutantStatus {
  const limit = POLLUTANT_LIMITS[pollutant];
  const percentage = (value / limit.max) * 100;

  let status: 'good' | 'moderate' | 'poor';
  let color: string;

  if (percentage <= 50) {
    status = 'good';
    color = 'text-green-600';
  } else if (percentage <= 100) {
    status = 'moderate';
    color = 'text-yellow-600';
  } else {
    status = 'poor';
    color = 'text-red-600';
  }

  return {
    name: limit.label,
    value,
    unit: limit.unit,
    status,
    color
  };
}

export function analyzePollutants(components: PollutantData) {
  return Object.entries(components).map(([key, value]) => {
    if (key in POLLUTANT_LIMITS) {
      return getPollutantStatus(key as keyof typeof POLLUTANT_LIMITS, value);
    }
    return null;
  }).filter(Boolean);
}