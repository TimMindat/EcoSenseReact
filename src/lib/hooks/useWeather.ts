import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { getWeatherData } from '../api/weather';
import { WeatherResponse } from '../types/weather';
import { Location } from '../types/location';
import { DEFAULT_LOCATION } from '../constants/locations';

export function useWeather(initialLocation: Location = DEFAULT_LOCATION) {
  const [location, setLocation] = useState<Location>(initialLocation);
  
  useEffect(() => {
    setLocation(initialLocation);
  }, [initialLocation]);

  const { data, error, isLoading, mutate } = useSWR<WeatherResponse>(
    ['weather', location.coordinates.lat, location.coordinates.lon],
    () => getWeatherData(location),
    {
      refreshInterval: 300000, // 5 minutes
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
      onError: (err) => {
        console.error('Weather data fetch error:', err);
      }
    }
  );

  return {
    data,
    location,
    setLocation,
    isLoading,
    error,
    refresh: mutate
  };
}