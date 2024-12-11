export interface AirQualityData {
  city: string;
  country: string;
  location: {
    lat: number;
    lon: number;
  };
  current: {
    timestamp: string;
    temperature: {
      celsius: number;
      fahrenheit: number;
    };
    humidity: number;
    wind: {
      speed: {
        ms: number;
        mph: number;
      };
      direction: number;
    };
    aqi: number;
    pollutants: {
      co: number;    // μg/m3
      no: number;    // μg/m3
      no2: number;   // μg/m3
      o3: number;    // μg/m3
      so2: number;   // μg/m3
      pm2_5: number; // μg/m3
      pm10: number;  // μg/m3
      nh3: number;   // μg/m3
    };
  };
}

export interface AirQualityError {
  code: string;
  message: string;
}