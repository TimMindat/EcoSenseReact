import { useState, useEffect } from 'react';
import { AQICalculator, AQIResult } from '../aqi/calculator';
import { useAirQuality } from './useAirQuality';

export function useAQICalculation() {
  const { data, isLoading, error } = useAirQuality();
  const [aqiResult, setAqiResult] = useState<AQIResult | null>(null);

  useEffect(() => {
    if (data?.components) {
      const result = AQICalculator.calculate(data.components);
      setAqiResult(result);
    }
  }, [data]);

  return {
    aqiResult,
    isLoading,
    error
  };
}