import { Shield, Wind, Droplets, AlertTriangle } from 'lucide-react';
import { WeatherResponse } from '../../types/weather';
import { AirQualityData } from '../../types/airQuality';
import { getAQIStatus } from '../airQuality';
import { InsightType } from '../../types/insights';

export function getAirQualityInsight(airQuality: AirQualityData | null): InsightType | null {
  if (!airQuality?.list?.[0]?.components) return null;
  
  const components = airQuality.list[0].components;
  if (components.pm2_5 > 35 || components.pm10 > 50) {
    return {
      icon: AlertTriangle,
      title: 'Particulate Matter Warning',
      recommendation: 'High PM levels. Sensitive groups should stay indoors.',
      color: 'text-red-500'
    };
  }
  return null;
}

export function getWindInsight(weather: WeatherResponse | null): InsightType | null {
  if (!weather?.current?.wind_kph) return null;
  
  if (weather.current.wind_kph > 30) {
    return {
      icon: Wind,
      title: 'Strong Winds',
      recommendation: 'High winds expected. Take precautions outdoors.',
      color: 'text-orange-500'
    };
  }
  return null;
}

export function getHumidityInsight(weather: WeatherResponse | null): InsightType | null {
  if (!weather?.current?.humidity) return null;
  
  if (weather.current.humidity > 80) {
    return {
      icon: Droplets,
      title: 'High Humidity',
      recommendation: 'High humidity may affect comfort. Stay hydrated.',
      color: 'text-blue-500'
    };
  }
  return null;
}

export function getCurrentAQIInsight(airQuality: AirQualityData | null): InsightType | null {
  if (!airQuality?.list?.[0]?.main?.aqi) return null;
  
  const aqi = airQuality.list[0].main.aqi;
  const { label, color } = getAQIStatus(aqi);

  return {
    icon: Shield,
    title: 'Current Air Quality',
    recommendation: `AQI: ${aqi} (${label})${aqi > 100 ? ' - Consider wearing a mask' : ''}`,
    color
  };
}