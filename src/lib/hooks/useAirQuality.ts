import { useEffect } from 'react';
import useSWR from 'swr';
import { getAirQualityData } from '../api/airQuality';
import { AirQualityData } from '../types/airQuality';
import { DEFAULT_LOCATION } from '../config/locations';

export function useAirQuality() {
  const { data, error, isLoading, mutate } = useSWR<AirQualityData | null>(
    'airQuality',
    () => getAirQualityData(DEFAULT_LOCATION),
    {
      refreshInterval: 300000, // Refresh every 5 minutes
      revalidateOnFocus: false,
      dedupingInterval: 60000, // Dedupe requests within 1 minute
    }
  );

  useEffect(() => {
    if (error) {
      console.error('Error fetching air quality data:', error);
    }
  }, [error]);

  return {
    data: data?.list?.[0],
    location: DEFAULT_LOCATION,
    isLoading,
    error,
    refresh: mutate
  };
}