import axios from 'axios';
import { LOCATIONS, DEFAULT_LOCATION } from '../config/locations';
import { AirQualityData, PollutantData } from '../types/airQuality';
import { POLLUTANT_LIMITS } from '../constants/pollutants';

const OPENWEATHER_API_KEY = '9e50c77b0c52599821d203df482a5f95';
const API_TIMEOUT = 10000; // 10 seconds

const api = axios.create({
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function getAirQualityData(location = DEFAULT_LOCATION): Promise<AirQualityData | null> {
  try {
    const { lat, lon } = location.coordinates;
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`;
    
    console.log('Fetching air quality data for:', location.name);
    
    const response = await api.get(url);
    
    // Log the raw response for debugging
    console.log('API response status:', response.status);
    console.log('API response data structure:', Object.keys(response.data));
    
    if (!response.data || !response.data.list || !response.data.list[0]) {
      console.error('Invalid API response structure:', response.data);
      throw new Error('Invalid API response structure');
    }
    
    // Log the components to verify correct data
    console.log('Raw pollutant data:', response.data.list[0].components);
    
    return validateAndTransformData(response.data);
  } catch (error) {
    // Improved error handling
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        console.error('API request timed out');
        throw new Error('Connection to weather service timed out. Please try again.');
      } else if (error.response) {
        console.error('API error response:', error.response.status, error.response.data);
        throw new Error(`Weather service error (${error.response.status}): ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        console.error('No API response received');
        throw new Error('No response from weather service. Please check your internet connection.');
      }
    }
    console.error('Air quality API error:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch air quality data');
  }
}

function validateAndTransformData(data: any): AirQualityData | null {
  try {
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

    // Validate each pollutant value
    const components = measurement.components;
    const validatedComponents: Record<string, number> = {};
    
    // OpenWeatherMap API returns these specific pollutants
    const expectedPollutants = ['co', 'no', 'no2', 'o3', 'so2', 'pm2_5', 'pm10', 'nh3'];
    
    for (const pollutant of expectedPollutants) {
      if (typeof components[pollutant] === 'number') {
        // Convert CO from μg/m³ to mg/m³ if needed (OpenWeatherMap returns CO in μg/m³)
        if (pollutant === 'co') {
          // Check if the value seems to be in μg/m³ (typically in thousands)
          if (components[pollutant] > 100) {
            validatedComponents[pollutant] = components[pollutant] / 1000; // Convert to mg/m³
            console.log(`Converted CO from ${components[pollutant]} μg/m³ to ${validatedComponents[pollutant]} mg/m³`);
          } else {
            validatedComponents[pollutant] = components[pollutant]; // Already in mg/m³
          }
        } else {
          validatedComponents[pollutant] = components[pollutant];
        }
      } else {
        console.warn(`Missing or invalid value for ${pollutant}, defaulting to 0`);
        validatedComponents[pollutant] = 0;
      }
    }

    console.log('Validated components:', validatedComponents);

    // Create the validated data structure
    const result = {
      list: [{
        main: {
          aqi: Number(measurement.main.aqi)
        },
        components: validatedComponents,
        dt: measurement.dt
      }],
      coord: {
        lat: data.coord?.lat ?? location.coordinates.lat,
        lon: data.coord?.lon ?? location.coordinates.lon
      }
    };
    
    return result;
  } catch (error) {
    console.error('Error validating API data:', error);
    return null;
  }
}

function validatePollutants(components: any): PollutantData | null {
  try {
    console.log('Validating pollutant data:', components);
    
    const validatedComponents: PollutantData = {};
    
    // Ensure all expected pollutants are present with valid values
    for (const [key, limit] of Object.entries(POLLUTANT_LIMITS)) {
      const value = components[key];
      
      // Handle missing or invalid values
      if (typeof value !== 'number' || isNaN(value)) {
        console.warn(`Missing or invalid pollutant value for ${key}, defaulting to 0`);
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
  } catch (error) {
    console.error('Error validating pollutant data:', error);
    return null;
  }
}

// Add a test function to verify API connectivity
export async function testApiConnection(): Promise<boolean> {
  try {
    const { lat, lon } = DEFAULT_LOCATION.coordinates;
    const response = await api.get(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
    );
    return response.status === 200;
  } catch (error) {
    console.error('API connection test failed:', error);
    return false;
  }
}