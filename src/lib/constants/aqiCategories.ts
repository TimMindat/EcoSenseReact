export const AQI_CATEGORIES = [
  {
    name: 'Good',
    min: 0,
    max: 50,
    color: '#00e400',
    description: 'Air quality is satisfactory, and air pollution poses little or no risk.'
  },
  {
    name: 'Moderate',
    min: 51,
    max: 100,
    color: '#ffff00',
    description: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.'
  },
  {
    name: 'Unhealthy for Sensitive Groups',
    min: 101,
    max: 150,
    color: '#ff7e00',
    description: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.'
  },
  {
    name: 'Unhealthy',
    min: 151,
    max: 200,
    color: '#ff0000',
    description: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.'
  },
  {
    name: 'Very Unhealthy',
    min: 201,
    max: 300,
    color: '#99004c',
    description: 'Health alert: The risk of health effects is increased for everyone.'
  },
  {
    name: 'Hazardous',
    min: 301,
    max: 500,
    color: '#7e0023',
    description: 'Health warning of emergency conditions: everyone is more likely to be affected.'
  }
];