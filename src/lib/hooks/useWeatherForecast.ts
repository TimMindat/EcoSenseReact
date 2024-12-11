import useSWR from 'swr';
import { getForecastData } from '../api/weather';
import { Location } from '../types/location';
import { WeatherForecast } from '../types/weather';

export function useWeatherForecast(location: Location) {
  const { data, error, isLoading, mutate } = useSWR<WeatherForecast>(
    ['forecast', location.coordinates],
    () => getForecastData(location.coordinates.lat, location.coordinates.lon),
    {
      refreshInterval: 1800000, // 30 minutes
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    forecast: data,
    error,
    isLoading,
    refresh: mutate
  };
}