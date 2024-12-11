import { weatherApiClient } from '../clients/weatherClient';
import { WeatherAPIForecast } from '../../types/weather';
import { WEATHER_CONFIG } from '../config/weather';
import { sanitizeData } from '../../utils/dataTransform';

export async function getTemperatureRange(
  lat: number = WEATHER_CONFIG.DEFAULT_LOCATION.lat,
  lon: number = WEATHER_CONFIG.DEFAULT_LOCATION.lon
): Promise<WeatherAPIForecast | null> {
  try {
    const response = await weatherApiClient.get<WeatherAPIForecast>('/forecast.json', {
      params: {
        key: WEATHER_CONFIG.WEATHERAPI.API_KEY,
        q: `${lat},${lon}`,
        days: 1,
        aqi: 'no'
      }
    });
    
    return sanitizeData<WeatherAPIForecast>(response.data);
  } catch (error) {
    console.error('Error fetching temperature range:', error);
    return null;
  }
}