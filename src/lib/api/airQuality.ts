import axios from 'axios';
import { LOCATIONS, DEFAULT_LOCATION } from '../config/locations';
import { AirQualityData, PollutantData } from '../types/airQuality';
import { POLLUTANT_LIMITS } from '../constants/pollutants';

const OPENWEATHER_API_KEY = 'bd5e378503939ddaee76f12ad7a97608';
const API_TIMEOUT = 10000; // 10 seconds

const api = axios.create({
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function getAirQualityData(
  location = DEFAULT_LOCATION
): Promise<AirQualityData | null> {
  try {
    const { lat, lon } = location.coordinates;
    const response = await api.get<AirQualityData>(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
    );
    
    return validateAndTransformData(response.data);
  } catch (error) {
    handleApiError(error);
    return null;
  }
}

function validateAndTransformData(data: any): AirQualityData | null {
  if (!data || !data.list || !data.list[0]) {
    console.error('Invalid API response structure');
    return null;
  }

  const measurement = data.list[0];
  
  // Validate required fields
  if (!measurement.main?.aqi || !measurement.components) {
    console.error('Missing required fields in API response');
    return null;
  }

  // Validate and transform pollutant data
  const components = validatePollutants(measurement.components);
  if (!components) {
    return null;
  }

  return {
    list: [{
      main: {
        aqi: Number(measurement.main.aqi)
      },
      components,
      dt: measurement.dt
    }],
    coord: {
      lat: data.coord?.lat ?? DEFAULT_LOCATION.coordinates.lat,
      lon: data.coord?.lon ?? DEFAULT_LOCATION.coordinates.lon
    }
  };
}

function validatePollutants(components: any): PollutantData | null {
  const validatedComponents: PollutantData = {};
  
  for (const [key, limit] of Object.entries(POLLUTANT_LIMITS)) {
    const value = components[key];
    
    // Handle missing or invalid values
    if (typeof value !== 'number' || isNaN(value)) {
      validatedComponents[key] = 0;
      continue;
    }

    // Validate range
    if (value < 0) {
      validatedComponents[key] = 0;
    } else if (value > limit.max * 2) { // Allow up to 2x the limit for extreme cases
      validatedComponents[key] = limit.max * 2;
    } else {
      validatedComponents[key] = value;
    }
  }

  return validatedComponents;
}

function handleApiError(error: any) {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') {
      console.error('API request timed out');
    } else if (error.response) {
      console.error('API error response:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No API response received');
    }
  }
  console.error('Air quality API error:', error);
}