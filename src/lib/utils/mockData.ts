import { HistoricalDataPoint } from '../types/airQualityHistory';

export function generateMockHistoricalData(
  startDate: Date,
  endDate: Date
): HistoricalDataPoint[] {
  const data: HistoricalDataPoint[] = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    data.push({
      timestamp: currentDate.getTime(),
      components: {
        co: generateRandomValue(0.5, 5),
        no2: generateRandomValue(10, 100),
        o3: generateRandomValue(20, 120),
        so2: generateRandomValue(5, 40),
        pm2_5: generateRandomValue(5, 35),
        pm10: generateRandomValue(10, 70)
      }
    });
    
    // Add daily data points
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return data;
}

function generateRandomValue(min: number, max: number): number {
  return +(min + Math.random() * (max - min)).toFixed(2);
}