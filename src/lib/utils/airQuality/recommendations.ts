import { AirQualityData } from '../../types/airQuality';
import { getAQIStatus } from './status';

export interface AQIRecommendation {
  message: string;
  severity: 'info' | 'warning' | 'danger';
  action?: string;
}

export function getAQIRecommendation(airQuality: AirQualityData): AQIRecommendation {
  const aqi = airQuality.list[0].main.aqi;
  const { label } = getAQIStatus(aqi);

  if (aqi <= 50) {
    return {
      message: 'Air quality is good',
      severity: 'info',
      action: 'Enjoy outdoor activities'
    };
  }

  if (aqi <= 100) {
    return {
      message: 'Air quality is acceptable',
      severity: 'info',
      action: 'Sensitive individuals should consider reducing prolonged outdoor exertion'
    };
  }

  if (aqi <= 150) {
    return {
      message: 'Members of sensitive groups may experience health effects',
      severity: 'warning',
      action: 'Consider wearing a mask if you belong to a sensitive group'
    };
  }

  if (aqi <= 200) {
    return {
      message: 'Everyone may begin to experience health effects',
      severity: 'warning',
      action: 'Wear a mask outdoors and limit prolonged exposure'
    };
  }

  return {
    message: 'Health warnings of emergency conditions',
    severity: 'danger',
    action: 'Avoid outdoor activities and wear protection when outside'
  };
}