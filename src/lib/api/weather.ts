import axios from 'axios';
import { WeatherResponse } from '../types/weather';
import { Location } from '../types/location';
import { DEFAULT_LOCATION } from '../constants/locations';

const WEATHER_API_KEY = '0f6278ac6aab4c35907220558240912';
const BASE_URL = 'https://api.weatherapi.com/v1';

const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    key: WEATHER_API_KEY
  }
});

export async function getWeatherData(location: Location = DEFAULT_LOCATION): Promise<WeatherResponse> {
  try {
    const { lat, lon } = location.coordinates;
    const response = await weatherApi.get<WeatherResponse>('/forecast.json', {
      params: {
        q: `${lat},${lon}`,
        days: 3,
        aqi: 'yes'
      }
    });

    if (!response.data) {
      throw new Error('No data received from weather API');
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Weather API Error:', {
        status: error.response?.status,
        message: error.response?.data?.error?.message || error.message
      });
      throw new Error(error.response?.data?.error?.message || 'Failed to fetch weather data');
    }
    console.error('Error fetching weather data:', error);
    throw new Error('An unexpected error occurred while fetching weather data');
  }
}