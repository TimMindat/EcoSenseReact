import React from 'react';
import { Wind, Droplets, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';

interface WeatherDetailsProps {
  humidity: number;
  pressure: number;
  windSpeed: number;
  feelsLike: number;
}

export function WeatherDetails({
  humidity,
  pressure,
  windSpeed,
  feelsLike
}: WeatherDetailsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <motion.div 
        className="bg-gray-50 rounded-lg p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center space-x-2">
          <Droplets className="h-5 w-5 text-blue-500" />
          <span className="text-sm text-gray-600">Humidity</span>
        </div>
        <div className="text-lg font-semibold mt-1">{humidity}%</div>
      </motion.div>

      <motion.div 
        className="bg-gray-50 rounded-lg p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center space-x-2">
          <Wind className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">Wind Speed</span>
        </div>
        <div className="text-lg font-semibold mt-1">{Math.round(windSpeed)} km/h</div>
      </motion.div>

      <motion.div 
        className="bg-gray-50 rounded-lg p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center space-x-2">
          <Gauge className="h-5 w-5 text-green-500" />
          <span className="text-sm text-gray-600">Pressure</span>
        </div>
        <div className="text-lg font-semibold mt-1">{pressure} hPa</div>
      </motion.div>

      <motion.div 
        className="bg-gray-50 rounded-lg p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center space-x-2">
          <Droplets className="h-5 w-5 text-yellow-500" />
          <span className="text-sm text-gray-600">Feels Like</span>
        </div>
        <div className="text-lg font-semibold mt-1">{Math.round(feelsLike)}°C</div>
      </motion.div>
    </div>
  );
}