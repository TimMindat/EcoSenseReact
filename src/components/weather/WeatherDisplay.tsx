import React from 'react';
import { format } from 'date-fns';
import { Cloud, Droplets, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import { HistoricalWeather } from '../../lib/types/weather';
import { TemperatureDisplay } from './TemperatureDisplay';

interface WeatherDisplayProps {
  data: HistoricalWeather;
}

export function WeatherDisplay({ data }: WeatherDisplayProps) {
  return (
    <div className="space-y-6">
      {data.days.map((day, dayIndex) => (
        <motion.div
          key={day.dt}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: dayIndex * 0.1 }}
          className="bg-white rounded-lg shadow-md p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              {format(new Date(day.dt * 1000), 'EEEE, MMM d')}
            </h3>
            <div className="flex items-center space-x-4">
              <TemperatureDisplay value={day.temp.max} label="High" />
              <TemperatureDisplay value={day.temp.min} label="Low" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="inline-flex space-x-4 min-w-full">
              {day.hourly.map((hour, hourIndex) => (
                <motion.div
                  key={hour.dt}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: hourIndex * 0.02 }}
                  className="flex flex-col items-center space-y-2 min-w-[80px]"
                >
                  <span className="text-sm text-gray-500">
                    {format(new Date(hour.dt * 1000), 'ha')}
                  </span>

                  <div className="w-12 h-12">
                    <img
                      src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                      alt={hour.weather[0].description}
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </div>

                  <TemperatureDisplay value={hour.temp} size="sm" />

                  <div className="flex items-center space-x-1">
                    <Droplets className="h-3 w-3 text-blue-500" />
                    <span className="text-xs text-gray-600">{Math.round(hour.humidity)}%</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Wind className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-600">{Math.round(hour.wind_speed)} m/s</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}