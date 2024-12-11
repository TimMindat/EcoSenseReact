import { AirQualityData } from '../types/airQuality';
import { getAQIStatus } from './airQuality';

export function shouldSendUpdate(
  previousData: AirQualityData | null,
  currentData: AirQualityData
): boolean {
  if (!previousData) return true;

  const prevAQI = previousData.list[0].main.aqi;
  const currentAQI = currentData.list[0].main.aqi;

  // Check for significant changes (20% or category change)
  const percentageChange = Math.abs((currentAQI - prevAQI) / prevAQI) * 100;
  const categoryChanged = getAQIStatus(prevAQI).label !== getAQIStatus(currentAQI).label;

  return percentageChange >= 20 || categoryChanged;
}

export function formatNotificationTime(date: Date): string {
  return date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function getNotificationSchedule(): { hour: number; minute: number } {
  // Default to 9:00 AM local time
  return {
    hour: 9,
    minute: 0
  };
}