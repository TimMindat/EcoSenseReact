export const API_CONFIG = {
  OPENWEATHER_BASE_URL: 'https://api.openweathermap.org/data/2.5',
  OPENWEATHER_API_KEY: 'bd5e378503939ddaee76f12ad7a97608',
  DEFAULT_LOCATION: {
    lat: 30.0444,  // Cairo latitude
    lon: 31.2357,  // Cairo longitude
    city: 'Cairo',
    country: 'Egypt'
  },
  CACHE_TIME: 1200000, // 20 minutes in milliseconds
  RETRY_COUNT: 3,
  RETRY_DELAY: 5000, // 5 seconds
};