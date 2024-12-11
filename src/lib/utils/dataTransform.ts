export function sanitizeData<T>(data: any): T {
  return JSON.parse(JSON.stringify(data));
}

export function kelvinToCelsius(kelvin: number): number {
  return kelvin - 273.15;
}

export function formatTemperature(temp: number): number {
  return Math.round(temp * 10) / 10;
}