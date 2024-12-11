import React from 'react';
import { Umbrella, Shirt, Shield, AlertTriangle } from 'lucide-react';
import { WeatherResponse } from '../../lib/types/weather';
import { AirQualityData } from '../../lib/types/airQuality';
import { getAQIStatus } from '../../lib/utils/airQuality';
import { InsightCard } from './InsightCard';

interface DailyInsightsProps {
  weather: WeatherResponse | null;
  airQuality: AirQualityData | null;
}

export function DailyInsights({ weather, airQuality }: DailyInsightsProps) {
  const getClothingRecommendation = () => {
    if (!weather?.current) return null;
    const temp = weather.current.temp_c;
    
    if (temp > 25) {
      return {
        icon: Shirt,
        title: 'Clothing',
        recommendation: 'Light, breathable clothing recommended',
        color: 'text-blue-500'
      };
    } else if (temp < 15) {
      return {
        icon: Shirt,
        title: 'Clothing',
        recommendation: 'Wear warm layers today',
        color: 'text-orange-500'
      };
    }
    return {
      icon: Shirt,
      title: 'Clothing',
      recommendation: 'Comfortable, moderate clothing suitable',
      color: 'text-green-500'
    };
  };

  const getRainRecommendation = () => {
    if (!weather?.forecast?.forecastday?.[0]?.day) return null;
    const rainChance = weather.forecast.forecastday[0].day.daily_chance_of_rain;
    
    if (rainChance > 60) {
      return {
        icon: Umbrella,
        title: 'Rain Forecast',
        recommendation: 'High chance of rain. Bring an umbrella!',
        color: 'text-blue-500'
      };
    }
    return null;
  };

  const getAirQualityRecommendation = () => {
    if (!airQuality?.list?.[0]?.main) return null;
    const aqi = airQuality.list[0].main.aqi;
    const { label, color } = getAQIStatus(aqi);
    
    if (aqi > 100) {
      return {
        icon: Shield,
        title: 'Air Quality',
        recommendation: `Poor air quality (${label}). Wear a mask outdoors.`,
        color: 'text-red-500'
      };
    }
    return {
      icon: Shield,
      title: 'Air Quality',
      recommendation: `Air quality is ${label.toLowerCase()}. Enjoy outdoor activities!`,
      color: color
    };
  };

  const getHealthWarning = () => {
    if (!weather?.current || !airQuality?.list?.[0]?.main) return null;
    const temp = weather.current.temp_c;
    const aqi = airQuality.list[0].main.aqi;
    
    if (temp > 35 || aqi > 150) {
      return {
        icon: AlertTriangle,
        title: 'Health Warning',
        recommendation: 'High risk conditions. Limit outdoor exposure.',
        color: 'text-red-500'
      };
    }
    return null;
  };

  // Get all insights and filter out null values
  const insights = [
    getClothingRecommendation(),
    getRainRecommendation(),
    getAirQualityRecommendation(),
    getHealthWarning()
  ].filter(Boolean);

  // If no insights are available, show a message
  if (insights.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>Loading insights...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {insights.map((insight, index) => (
        insight && (
          <InsightCard
            key={index}
            icon={insight.icon}
            title={insight.title}
            recommendation={insight.recommendation}
            color={insight.color}
          />
        )
      ))}
    </div>
  );
}