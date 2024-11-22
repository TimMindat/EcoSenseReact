import axios from 'axios';

const OPENWEATHER_API_KEY = 'bd5e378503939ddaee76f12ad7a97608';
const AIRVISUAL_API_KEY = '5ec4a4b7-1f76-4176-a0fb-92b135f402a5';

export async function getAirQualityData() {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=30.0444&lon=31.2357&appid=${OPENWEATHER_API_KEY}`
    );
    return response.data;
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