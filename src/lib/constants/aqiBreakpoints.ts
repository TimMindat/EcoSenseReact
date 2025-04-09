export const AQI_BREAKPOINTS = {
  'pm2_5': [
    {
      concentration: { low: 0, high: 12.0 },
      index: { low: 0, high: 50 }
    },
    {
      concentration: { low: 12.1, high: 35.4 },
      index: { low: 51, high: 100 }
    },
    {
      concentration: { low: 35.5, high: 55.4 },
      index: { low: 101, high: 150 }
    },
    {
      concentration: { low: 55.5, high: 150.4 },
      index: { low: 151, high: 200 }
    },
    {
      concentration: { low: 150.5, high: 250.4 },
      index: { low: 201, high: 300 }
    },
    {
      concentration: { low: 250.5, high: 500.4 },
      index: { low: 301, high: 500 }
    }
  ],
  'pm10': [
    {
      concentration: { low: 0, high: 54 },
      index: { low: 0, high: 50 }
    },
    {
      concentration: { low: 55, high: 154 },
      index: { low: 51, high: 100 }
    },
    {
      concentration: { low: 155, high: 254 },
      index: { low: 101, high: 150 }
    },
    {
      concentration: { low: 255, high: 354 },
      index: { low: 151, high: 200 }
    },
    {
      concentration: { low: 355, high: 424 },
      index: { low: 201, high: 300 }
    },
    {
      concentration: { low: 425, high: 604 },
      index: { low: 301, high: 500 }
    }
  ],
  // Make sure the O3 breakpoints are correctly defined
  'o3': [
    {
      concentration: { low: 0, high: 54 },
      index: { low: 0, high: 50 }
    },
    {
      concentration: { low: 55, high: 70 },
      index: { low: 51, high: 100 }
    },
    {
      concentration: { low: 71, high: 85 },
      index: { low: 101, high: 150 }
    },
    {
      concentration: { low: 86, high: 105 },
      index: { low: 151, high: 200 }
    },
    {
      concentration: { low: 106, high: 200 },
      index: { low: 201, high: 300 }
    },
    {
      concentration: { low: 201, high: 504 },
      index: { low: 301, high: 500 }
    }
  ],
  'no2': [
    {
      concentration: { low: 0, high: 53 },
      index: { low: 0, high: 50 }
    },
    {
      concentration: { low: 54, high: 100 },
      index: { low: 51, high: 100 }
    },
    {
      concentration: { low: 101, high: 360 },
      index: { low: 101, high: 150 }
    },
    {
      concentration: { low: 361, high: 649 },
      index: { low: 151, high: 200 }
    },
    {
      concentration: { low: 650, high: 1249 },
      index: { low: 201, high: 300 }
    },
    {
      concentration: { low: 1250, high: 2049 },
      index: { low: 301, high: 500 }
    }
  ],
  'so2': [
    {
      concentration: { low: 0, high: 35 },
      index: { low: 0, high: 50 }
    },
    {
      concentration: { low: 36, high: 75 },
      index: { low: 51, high: 100 }
    },
    {
      concentration: { low: 76, high: 185 },
      index: { low: 101, high: 150 }
    },
    {
      concentration: { low: 186, high: 304 },
      index: { low: 151, high: 200 }
    },
    {
      concentration: { low: 305, high: 604 },
      index: { low: 201, high: 300 }
    },
    {
      concentration: { low: 605, high: 1004 },
      index: { low: 301, high: 500 }
    }
  ],
  // Make sure the CO breakpoints are correctly defined
  'co': [
    {
      concentration: { low: 0, high: 4.4 },
      index: { low: 0, high: 50 }
    },
    {
      concentration: { low: 4.5, high: 9.4 },
      index: { low: 51, high: 100 }
    },
    {
      concentration: { low: 9.5, high: 12.4 },
      index: { low: 101, high: 150 }
    },
    {
      concentration: { low: 12.5, high: 15.4 },
      index: { low: 151, high: 200 }
    },
    {
      concentration: { low: 15.5, high: 30.4 },
      index: { low: 201, high: 300 }
    },
    {
      concentration: { low: 30.5, high: 50.4 },
      index: { low: 301, high: 500 }
    }
  ]
};