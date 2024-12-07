import axios from 'axios';
import { LOCATIONS, DEFAULT_LOCATION } from './config/locations';

const OPENWEATHER_API_KEY = 'bd5e378503939ddaee76f12ad7a97608';
const AIRVISUAL_API_KEY = '5ec4a4b7-1f76-4176-a0fb-92b135f402a5';

interface AirQualityData {
  list: Array<{
    main: {
      aqi: number;
    };
    components: {
      co: number;    // μg/m3
      no: number;    // μg/m3
      no2: number;   // μg/m3
      o3: number;    // μg/m3
      so2: number;   // μg/m3
      pm2_5: number; // μg/m3
      pm10: number;  // μg/m3
      nh3: number;   // μg/m3
    };
    dt: number;
  }>;
  coord: {
    lat: number;
    lon: number;
  };
}

export async function getAirQualityData(
  location = DEFAULT_LOCATION
): Promise<AirQualityData | null> {
  try {
    const { lat, lon } = location.coordinates;
    const response = await axios.get<AirQualityData>(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
    );
    
    return {
      ...response.data,
      coord: { lat, lon }
    };
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    return null;
  }
}

export async function getWaterQualityData() {
  try {
    const response = await axios.get(
      `https://api.waqi.info/feed/cairo/?token=${AIRVISUAL_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching water quality data:', error);
    return null;
  }
}