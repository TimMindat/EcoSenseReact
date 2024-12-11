import React from 'react';
import { WeatherResponse } from '../../lib/types/weather';
import { AirQualityData } from '../../lib/types/airQuality';
import { InsightCard } from './InsightCard';
import {
  getAirQualityInsight,
  getWindInsight,
  getHumidityInsight,
  getCurrentAQIInsight
} from '../../lib/utils/insights/hourlyInsights';

interface HourlyInsightsProps {
  weather: WeatherResponse | null;
  airQuality: AirQualityData | null;
}

export function HourlyInsights({ weather, airQuality }: HourlyInsightsProps) {
  const insights = [
    getCurrentAQIInsight(airQuality),
    getWindInsight(weather),
    getHumidityInsight(weather),
    getAirQualityInsight(airQuality)
  ].filter(Boolean);

  if (!weather && !airQuality) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>Loading weather and air quality data...</p>
      </div>
    );
  }

  if (insights.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>No current insights available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-600">
        Last updated: {new Date().toLocaleTimeString()}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          insight && (
            <InsightCard
              key={`${insight.title}-${index}`}
              icon={insight.icon}
              title={insight.title}
              recommendation={insight.recommendation}
              color={insight.color}
            />
          )
        ))}
      </div>
    </div>
  );
}