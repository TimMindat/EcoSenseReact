export interface AirQualityData {
  list: Array<{
    main: {
      aqi: number;
    };
    components: PollutantData;
    dt: number;
  }>;
  coord: {
    lat: number;
    lon: number;
  };
}

export interface PollutantData {
  [key: string]: number;
  co?: number;    // μg/m3
  no?: number;    // μg/m3
  no2?: number;   // μg/m3
  o3?: number;    // μg/m3
  so2?: number;   // μg/m3
  pm2_5?: number; // μg/m3
  pm10?: number;  // μg/m3
  nh3?: number;   // μg/m3
}

export interface AirQualityStatus {
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
  percentage: number;
}