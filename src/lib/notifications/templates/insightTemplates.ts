import { AirQualityData } from '../../types/airQuality';
import { WeatherResponse } from '../../types/weather';
import { getAQIStatus } from '../../utils/airQuality';
import { formatPollutantValue } from '../../utils/formatting';

export function createDailyInsightNotification(
  airQuality: AirQualityData,
  weather: WeatherResponse
) {
  const { label } = getAQIStatus(airQuality.list[0].main.aqi);
  const temp = weather.current.temp_c;
  
  return {
    title: 'Daily Environmental Update',
    options: {
      body: `Air Quality: ${label}\nTemperature: ${temp}°C\nStay informed and healthy!`,
      icon: '/icons/notification-icon.png',
      tag: 'daily-insight',
      requireInteraction: false
    }
  };
}

export function createHourlyInsightNotification(
  airQuality: AirQualityData,
  significantChange: boolean = false
) {
  const { label } = getAQIStatus(airQuality.list[0].main.aqi);
  const pm25 = formatPollutantValue(airQuality.list[0].components.pm2_5);
  
  return {
    title: significantChange ? '⚠️ Air Quality Alert' : 'Hourly Update',
    options: {
      body: `Current Air Quality: ${label}\nPM2.5: ${pm25} μg/m³`,
      icon: '/icons/notification-icon.png',
      tag: 'hourly-insight',
      requireInteraction: significantChange
    }
  };
}