// WHO Air Quality Guidelines (2021) and common standards
export const POLLUTANT_LIMITS = {
  co: { 
    max: 4000,    // WHO guideline: 4mg/m³ = 4000 μg/m³ (8-hour mean)
    label: 'Carbon Monoxide (CO)',
    unit: 'μg/m³',
    dangerLevels: {
      safe: 0.5,    // 50% of limit
      moderate: 0.75 // 75% of limit
    }
  },
  no2: { 
    max: 200,     // WHO guideline: 200 μg/m³ (1-hour mean)
    label: 'Nitrogen Dioxide (NO₂)',
    unit: 'μg/m³',
    dangerLevels: {
      safe: 0.5,
      moderate: 0.75
    }
  },
  pm10: { 
    max: 45,      // WHO guideline: 45 μg/m³ (24-hour mean)
    label: 'PM10',
    unit: 'μg/m³',
    dangerLevels: {
      safe: 0.5,
      moderate: 0.75
    }
  },
  pm2_5: { 
    max: 15,      // WHO guideline: 15 μg/m³ (24-hour mean)
    label: 'PM2.5',
    unit: 'μg/m³',
    dangerLevels: {
      safe: 0.5,
      moderate: 0.75
    }
  },
  o3: { 
    max: 100,     // WHO guideline: 100 μg/m³ (8-hour mean)
    label: 'Ozone (O₃)',
    unit: 'μg/m³',
    dangerLevels: {
      safe: 0.5,
      moderate: 0.75
    }
  },
  so2: { 
    max: 40,      // WHO guideline: 40 μg/m³ (24-hour mean)
    label: 'Sulfur Dioxide (SO₂)',
    unit: 'μg/m³',
    dangerLevels: {
      safe: 0.5,
      moderate: 0.75
    }
  }
} as const;

// AQI breakpoints based on WHO and US EPA standards
export const AQI_BREAKPOINTS = [
  { min: 0, max: 50, label: 'Good', color: 'green' },
  { min: 51, max: 100, label: 'Moderate', color: 'yellow' },
  { min: 101, max: 150, label: 'Unhealthy for Sensitive Groups', color: 'orange' },
  { min: 151, max: 200, label: 'Unhealthy', color: 'red' },
  { min: 201, max: 300, label: 'Very Unhealthy', color: 'purple' },
  { min: 301, max: 500, label: 'Hazardous', color: 'maroon' }
] as const;