import useSWR from 'swr';
import { getHistoricalData } from '../lib/api/airQuality';

export function useHistoricalData(startDate: Date, endDate: Date) {
  const { data, error, isLoading, mutate } = useSWR(
    ['historicalData', startDate.toISOString(), endDate.toISOString()],
    () => getHistoricalData(startDate, endDate),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
      refreshInterval: 300000, // 5 minutes
    }
  );

  return {
    data: data?.map(point => ({
      ...point,
      timestamp: new Date(point.timestamp).getTime() // Ensure timestamp is in milliseconds
    })) || [],
    error,
    isLoading,
    refetch: mutate
  };
}