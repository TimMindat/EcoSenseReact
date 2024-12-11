import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Sun, Clock, CloudRain, Thermometer, Wind, Droplets } from 'lucide-react';
import { DailyInsights } from './DailyInsights';
import { HourlyInsights } from './HourlyInsights';
import { NotificationToggle } from './NotificationToggle';
import { useWeather } from '../../lib/hooks/useWeather';
import { useAirQuality } from '../../lib/hooks/useAirQuality';
import { useNotifications } from '../../lib/hooks/useNotifications';

export function UserInsights() {
  const [view, setView] = useState<'daily' | 'hourly'>('daily');
  const { data: weather, isLoading: weatherLoading } = useWeather();
  const { data: airQuality, isLoading: aqLoading } = useAirQuality();
  const { showPrompt } = useNotifications();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">EcoPulse</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setView('daily')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'daily'
                ? 'bg-green-100 text-green-800'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Sun className="h-4 w-4 inline-block mr-1" />
            Daily
          </button>
          <button
            onClick={() => setView('hourly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'hourly'
                ? 'bg-green-100 text-green-800'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Clock className="h-4 w-4 inline-block mr-1" />
            Hourly
          </button>
        </div>
      </div>

      {/* Notification Toggle */}
      <NotificationToggle />

      {/* Current Conditions Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <Thermometer className="h-8 w-8 text-orange-500" />
          <div>
            <p className="text-sm text-gray-600">Temperature</p>
            <p className="text-lg font-semibold">
              {weather?.current.temp_c}°C
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Wind className="h-8 w-8 text-blue-500" />
          <div>
            <p className="text-sm text-gray-600">Wind Speed</p>
            <p className="text-lg font-semibold">
              {weather?.current.wind_kph} km/h
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Droplets className="h-8 w-8 text-blue-400" />
          <div>
            <p className="text-sm text-gray-600">Humidity</p>
            <p className="text-lg font-semibold">
              {weather?.current.humidity}%
            </p>
          </div>
        </div>
      </div>

      {/* Insights Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {view === 'daily' ? (
            <DailyInsights weather={weather} airQuality={airQuality} />
          ) : (
            <HourlyInsights weather={weather} airQuality={airQuality} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}