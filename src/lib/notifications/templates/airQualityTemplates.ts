import { AirQualityData } from '../../types/airQuality';
import { getAQIStatus } from '../../utils/airQuality';
import { formatAQIMessage } from '../../utils/formatting';

export function createWelcomeNotification(airQuality: AirQualityData) {
  const { label } = getAQIStatus(airQuality.list[0].main.aqi);
  
  return {
    message: `Welcome to EcoPulse! Current air quality is ${label}.`,
    options: {
      body: formatAQIMessage(airQuality),
      icon: '/icons/notification-icon.png',
      badge: '/icons/badge-icon.png',
      tag: 'welcome',
      requireInteraction: true
    }
  };
}

export function createUpdateNotification(airQuality: AirQualityData, significant: boolean) {
  const { label } = getAQIStatus(airQuality.list[0].main.aqi);
  
  return {
    message: significant 
      ? `⚠️ Significant change in air quality: ${label}`
      : `Current air quality: ${label}`,
    options: {
      body: formatAQIMessage(airQuality),
      icon: '/icons/notification-icon.png',
      tag: 'air-quality-update',
      requireInteraction: significant
    }
  };
}