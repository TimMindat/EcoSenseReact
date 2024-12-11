import { openWeatherClient } from '../clients/weatherClient';
import { HistoricalWeather } from '../../types/weather';
import { WEATHER_CONFIG } from '../config/weather';

export async function getHistoricalWeather(
  lat: number = WEATHER_CONFIG.DEFAULT_LOCATION.lat,
  lon: number = WEATHER_CONFIG.DEFAULT_LOCATION.lon
): Promise<HistoricalWeather | null> {
  try {
    const now = Math.floor(Date.now() / 1000);
    const threeDaysAgo = now - (3 * 24 * 60 * 60);
    
    const response = await openWeatherClient.get('/onecall/timemachine', {
      params: {
        lat,
        lon,
        dt: threeDaysAgo,
        units: 'metric',
        appid: WEATHER_CONFIG.OPENWEATHER.API_KEY
      }
    });

    const historicalData: HistoricalWeather = {
      days: response.data.data.map((day: any) => ({
        dt: day.dt,
        temp: {
          min: day.temp - 3,
          max: day.temp + 3
        },
        hourly: day.hourly.map((hour: any) => ({
          dt: hour.dt,
          temp: hour.temp,
          humidity: hour.humidity,
          wind_speed: hour.wind_speed,
          weather: hour.weather
        }))
      }))
    };

    // Create a new plain object without any Symbol properties
    return JSON.parse(JSON.stringify(historicalData));
  } catch (error) {
    console.error('Error fetching historical weather:', error);
    return null;
  }
}