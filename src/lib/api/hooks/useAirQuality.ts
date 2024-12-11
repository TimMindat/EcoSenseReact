import useSWR from 'swr';
import { getAirQualityData, validateAirQualityData } from '../airQuality';
import { API_CONFIG } from '../config';
import type { AirQualityData, AirQualityError } from '../types/airQuality';

interface UseAirQualityOptions {
  lat?: number;
  lon?: number;
  refreshInterval?: number;
}

interface UseAirQualityResult {
  data: AirQualityData | null;
  error: AirQualityError | null;
  isLoading: boolean;
  isValidating: boolean;
  refresh: () => Promise<void>;
}

export function useAirQuality({
  lat = API_CONFIG.DEFAULT_LOCATION.lat,
  lon = API_CONFIG.DEFAULT_LOCATION.lon,
  refreshInterval = API_CONFIG.CACHE_TIME,
}: UseAirQualityOptions = {}): UseAirQualityResult {
  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate
  } = useSWR(
    ['airQuality', lat, lon],
    () => getAirQualityData(lat, lon),
    {
      refreshInterval,
      shouldRetryOnError: true,
      errorRetryCount: API_CONFIG.RETRY_COUNT,
      errorRetryInterval: API_CONFIG.RETRY_DELAY,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      onError: (error) => {
        console.error('Air quality data fetch error:', error);
      },
      onSuccess: (data) => {
        if (!validateAirQualityData(data)) {
          console.warn('Air quality data validation failed');
        }
      },
    }
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
    refresh: () => mutate(),
  };
}