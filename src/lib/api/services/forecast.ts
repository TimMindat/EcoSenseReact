import { openWeatherClient } from '../clients/weatherClient';
import { WeatherForecast } from '../../types/weather';
import { WEATHER_CONFIG } from '../config/weather';

export async function getForecast(
  lat: number = WEATHER_CONFIG.DEFAULT_LOCATION.lat,
  lon: number = WEATHER_CONFIG.DEFAULT_LOCATION.lon
): Promise<WeatherForecast | null> {
  try {
    const response = await openWeatherClient.get<WeatherForecast>('/onecall', {
      params: {
        lat,
        lon,
        units: 'metric',
        exclude: 'minutely,alerts',
        appid: WEATHER_CONFIG.OPENWEATHER.API_KEY
      }
    });
    
    // Create a new plain object without any Symbol properties
    return JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return null;
  }
}