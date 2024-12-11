import { openWeatherClient } from '../clients/weatherClient';
import { WeatherData } from '../../types/weather';
import { WEATHER_CONFIG } from '../config/weather';
import { sanitizeData } from '../../utils/dataTransform';

export async function getCurrentWeather(
  lat: number = WEATHER_CONFIG.DEFAULT_LOCATION.lat,
  lon: number = WEATHER_CONFIG.DEFAULT_LOCATION.lon
): Promise<WeatherData | null> {
  try {
    const response = await openWeatherClient.get<WeatherData>('/weather', {
      params: {
        lat,
        lon,
        units: 'metric',
        appid: WEATHER_CONFIG.OPENWEATHER.API_KEY
      }
    });
    
    return sanitizeData<WeatherData>(response.data);
  } catch (error) {
    console.error('Error fetching current weather:', error);
    return null;
  }
}