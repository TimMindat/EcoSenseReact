import React from 'react';
import { format } from 'date-fns';
import { Cloud, Droplets, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import { WeatherResponse } from '../../lib/types/weather';
import { TemperatureDisplay } from './TemperatureDisplay';

interface ForecastTimelineProps {
  forecast: WeatherResponse['forecast'];
}

export function ForecastTimeline({ forecast }: ForecastTimelineProps) {
  if (!forecast?.forecastday?.[0]?.hour) {
    return null;
  }

  // Get next 24 hours of forecast data
  const currentHour = new Date().getHours();
  const hourlyForecast = forecast.forecastday.flatMap(day => day.hour)
    .slice(currentHour, currentHour + 24);

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex space-x-4 p-4 min-w-full">
        {hourlyForecast.map((hour, index) => (
          <motion.div
            key={hour.time}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex flex-col items-center space-y-2 min-w-[100px]"
          >
            <span className="text-sm text-gray-500">
              {format(new Date(hour.time), 'ha')}
            </span>
            
            <div className="w-16 h-16">
              <img
                src={`https:${hour.condition.icon}`}
                alt={hour.condition.text}
                className="w-full h-full"
                loading="lazy"
              />
            </div>

            <TemperatureDisplay value={hour.temp_c} size="sm" />

            <div className="flex items-center space-x-1">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-gray-600">{hour.humidity}%</span>
            </div>

            <div className="flex items-center space-x-1">
              <Wind className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{Math.round(hour.wind_kph)} km/h</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}