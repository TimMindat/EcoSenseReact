import axios from 'axios';
import { WEATHER_CONFIG } from '../config/weather';

export const openWeatherClient = axios.create({
  baseURL: WEATHER_CONFIG.OPENWEATHER.BASE_URL,
  timeout: WEATHER_CONFIG.OPENWEATHER.TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const weatherApiClient = axios.create({
  baseURL: WEATHER_CONFIG.WEATHERAPI.BASE_URL,
  timeout: WEATHER_CONFIG.WEATHERAPI.TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});