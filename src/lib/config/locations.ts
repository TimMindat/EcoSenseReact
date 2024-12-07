export const LOCATIONS = {
  CAIRO: {
    name: 'Cairo',
    coordinates: {
      lat: 30.0444,
      lon: 31.2357
    },
    timezone: 'Africa/Cairo'
  }
} as const;

export const DEFAULT_LOCATION = LOCATIONS.CAIRO;