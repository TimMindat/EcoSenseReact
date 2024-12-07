import { PollutantBreakpoints } from './types';

// EPA AQI Breakpoint Tables (2016 Standards)
export const EPA_AQI_BREAKPOINTS: PollutantBreakpoints = {
  pm25: {
    name: 'PM2.5',
    unit: 'μg/m³',
    breakpoints: [
      { index: [0, 50], concentration: [0, 12.0] },
      { index: [51, 100], concentration: [12.1, 35.4] },
      { index: [101, 150], concentration: [35.5, 55.4] },
      { index: [151, 200], concentration: [55.5, 150.4] },
      { index: [201, 300], concentration: [150.5, 250.4] },
      { index: [301, 400], concentration: [250.5, 350.4] },
      { index: [401, 500], concentration: [350.5, 500.4] }
    ]
  },
  pm10: {
    name: 'PM10',
    unit: 'μg/m³',
    breakpoints: [
      { index: [0, 50], concentration: [0, 54] },
      { index: [51, 100], concentration: [55, 154] },
      { index: [101, 150], concentration: [155, 254] },
      { index: [151, 200], concentration: [255, 354] },
      { index: [201, 300], concentration: [355, 424] },
      { index: [301, 400], concentration: [425, 504] },
      { index: [401, 500], concentration: [505, 604] }
    ]
  },
  o3_8hr: {
    name: 'Ozone (8-hour)',
    unit: 'ppb',
    breakpoints: [
      { index: [0, 50], concentration: [0, 54] },
      { index: [51, 100], concentration: [55, 70] },
      { index: [101, 150], concentration: [71, 85] },
      { index: [151, 200], concentration: [86, 105] },
      { index: [201, 300], concentration: [106, 200] }
    ]
  },
  o3_1hr: {
    name: 'Ozone (1-hour)',
    unit: 'ppb',
    breakpoints: [
      { index: [0, 50], concentration: [0, 124] },
      { index: [51, 100], concentration: [125, 164] },
      { index: [101, 150], concentration: [165, 204] },
      { index: [151, 200], concentration: [205, 404] },
      { index: [201, 300], concentration: [405, 504] },
      { index: [301, 400], concentration: [505, 604] }
    ]
  },
  co: {
    name: 'Carbon Monoxide',
    unit: 'ppm',
    breakpoints: [
      { index: [0, 50], concentration: [0, 4.4] },
      { index: [51, 100], concentration: [4.5, 9.4] },
      { index: [101, 150], concentration: [9.5, 12.4] },
      { index: [151, 200], concentration: [12.5, 15.4] },
      { index: [201, 300], concentration: [15.5, 30.4] },
      { index: [301, 400], concentration: [30.5, 40.4] },
      { index: [401, 500], concentration: [40.5, 50.4] }
    ]
  },
  so2: {
    name: 'Sulfur Dioxide',
    unit: 'ppb',
    breakpoints: [
      { index: [0, 50], concentration: [0, 35] },
      { index: [51, 100], concentration: [36, 75] },
      { index: [101, 150], concentration: [76, 185] },
      { index: [151, 200], concentration: [186, 304] },
      { index: [201, 300], concentration: [305, 604] },
      { index: [301, 400], concentration: [605, 804] },
      { index: [401, 500], concentration: [805, 1004] }
    ]
  },
  no2: {
    name: 'Nitrogen Dioxide',
    unit: 'ppb',
    breakpoints: [
      { index: [0, 50], concentration: [0, 53] },
      { index: [51, 100], concentration: [54, 100] },
      { index: [101, 150], concentration: [101, 360] },
      { index: [151, 200], concentration: [361, 649] },
      { index: [201, 300], concentration: [650, 1249] },
      { index: [301, 400], concentration: [1250, 1649] },
      { index: [401, 500], concentration: [1650, 2049] }
    ]
  }
};

export const AQI_CATEGORIES = [
  { range: [0, 50], name: 'Good', description: 'Air quality is satisfactory, and air pollution poses little or no risk.' },
  { range: [51, 100], name: 'Moderate', description: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.' },
  { range: [101, 150], name: 'Unhealthy for Sensitive Groups', description: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.' },
  { range: [151, 200], name: 'Unhealthy', description: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.' },
  { range: [201, 300], name: 'Very Unhealthy', description: 'Health alert: The risk of health effects is increased for everyone.' },
  { range: [301, 500], name: 'Hazardous', description: 'Health warning of emergency conditions: everyone is more likely to be affected.' }
] as const;