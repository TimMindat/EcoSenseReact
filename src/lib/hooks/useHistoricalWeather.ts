import useSWR from 'swr';
import { getHistoricalWeatherData } from '../api/weather';
import { Location } from '../types/location';
import { HistoricalWeather } from '../types/weather';

export function useHistoricalWeather(location: Location) {
  const { data, error, isLoading } = useSWR<HistoricalWeather>(
    ['historicalWeather', location.coordinates],
    () => getHistoricalWeatherData(location.coordinates.lat, location.coordinates.lon),
    {
      revalidateOnFocus: false,
      dedupingInterval: 3600000, // 1 hour
    }
  );

  return {
    historicalData: data,
    error,
    isLoading
  };
}