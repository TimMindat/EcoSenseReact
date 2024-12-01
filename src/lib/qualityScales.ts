// Air Quality Index (AQI) scale definitions
export const AQI_LEVELS = [
  {
    range: [0, 50],
    label: 'Good',
    color: 'green',
    bgColor: 'bg-green-500',
    textColor: 'text-green-700',
    description: 'Air quality is satisfactory, and air pollution poses little or no risk.',
    activities: [
      'Ideal for outdoor activities',
      'Perfect for exercising outside',
      'Safe for sensitive groups'
    ]
  },
  {
    range: [51, 100],
    label: 'Moderate',
    color: 'yellow',
    bgColor: 'bg-yellow-500',
    textColor: 'text-yellow-700',
    description: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.',
    activities: [
      'Generally safe for outdoor activities',
      'Sensitive individuals should consider reducing prolonged outdoor exertion',
      'Good for most outdoor activities'
    ]
  },
  {
    range: [101, 150],
    label: 'Unhealthy for Sensitive Groups',
    color: 'orange',
    bgColor: 'bg-orange-500',
    textColor: 'text-orange-700',
    description: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
    activities: [
      'Reduce prolonged or heavy outdoor exertion',
      'Take more breaks during outdoor activities',
      'Watch for symptoms such as coughing or shortness of breath'
    ]
  },
  {
    range: [151, 200],
    label: 'Unhealthy',
    color: 'red',
    bgColor: 'bg-red-500',
    textColor: 'text-red-700',
    description: 'Everyone may begin to experience health effects. Members of sensitive groups may experience more serious health effects.',
    activities: [
      'Avoid prolonged outdoor exertion',
      'Consider moving activities indoors',
      'Wear a mask if outdoor activity is unavoidable'
    ]
  },
  {
    range: [201, 300],
    label: 'Very Unhealthy',
    color: 'purple',
    bgColor: 'bg-purple-500',
    textColor: 'text-purple-700',
    description: 'Health alert: The risk of health effects is increased for everyone.',
    activities: [
      'Avoid all outdoor activities',
      'Keep windows closed',
      'Run air purifiers if available'
    ]
  },
  {
    range: [301, 500],
    label: 'Hazardous',
    color: 'maroon',
    bgColor: 'bg-red-900',
    textColor: 'text-red-900',
    description: 'Health warning of emergency conditions: everyone is more likely to be affected.',
    activities: [
      'Stay indoors',
      'Avoid all outdoor physical activity',
      'Keep all windows and doors closed'
    ]
  }
];

// Water Quality Index (WQI) scale definitions
export const WQI_LEVELS = [
  {
    range: [90, 100],
    label: 'Excellent',
    color: 'blue',
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-700',
    description: 'Water is in its purest form, suitable for all purposes.',
    activities: [
      'Safe for drinking with standard treatment',
      'Perfect for all recreational activities',
      'Ideal for aquatic life'
    ]
  },
  {
    range: [70, 89],
    label: 'Good',
    color: 'green',
    bgColor: 'bg-green-500',
    textColor: 'text-green-700',
    description: 'Water quality is protected with a minor degree of threat.',
    activities: [
      'Safe for drinking with conventional treatment',
      'Suitable for all water sports',
      'Good for irrigation'
    ]
  },
  {
    range: [50, 69],
    label: 'Fair',
    color: 'yellow',
    bgColor: 'bg-yellow-500',
    textColor: 'text-yellow-700',
    description: 'Water quality is usually protected but occasionally threatened.',
    activities: [
      'Requires advanced treatment for drinking',
      'Generally safe for recreational use',
      'May affect sensitive species'
    ]
  },
  {
    range: [25, 49],
    label: 'Poor',
    color: 'orange',
    bgColor: 'bg-orange-500',
    textColor: 'text-orange-700',
    description: 'Water quality is frequently threatened or impaired.',
    activities: [
      'Not recommended for drinking',
      'Limited recreational use',
      'May be harmful to aquatic life'
    ]
  },
  {
    range: [0, 24],
    label: 'Very Poor',
    color: 'red',
    bgColor: 'bg-red-500',
    textColor: 'text-red-700',
    description: 'Water quality is almost always threatened or impaired.',
    activities: [
      'Unsafe for any consumption',
      'Avoid all contact',
      'Severe impact on ecosystem'
    ]
  }
];