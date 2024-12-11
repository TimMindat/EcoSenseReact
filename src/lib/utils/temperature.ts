export interface TemperatureRange {
  min: number;
  max: number;
}

export function validateTemperature(temp: number): boolean {
  // Reasonable temperature bounds for Cairo (in Celsius)
  const MIN_VALID_TEMP = -10;
  const MAX_VALID_TEMP = 50;
  
  return !isNaN(temp) && 
         temp >= MIN_VALID_TEMP && 
         temp <= MAX_VALID_TEMP;
}

export function formatTemperature(temp: number, unit: 'C' | 'F' = 'C'): string {
  if (!validateTemperature(temp)) {
    return 'N/A';
  }
  
  const formattedTemp = Math.round(temp);
  return `${formattedTemp}°${unit}`;
}

export function validateTemperatureRange(range: TemperatureRange): boolean {
  return validateTemperature(range.min) && 
         validateTemperature(range.max) && 
         range.min <= range.max;
}

export function getTemperatureColor(temp: number): string {
  if (temp < 0) return 'text-blue-600';
  if (temp < 10) return 'text-blue-500';
  if (temp < 20) return 'text-green-500';
  if (temp < 30) return 'text-yellow-500';
  if (temp < 40) return 'text-orange-500';
  return 'text-red-500';
}