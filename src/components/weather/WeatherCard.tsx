import React from 'react';
import { Cloud, Wind, Droplets, Thermometer, MapPin, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeather } from '../../lib/hooks/useWeather';
import { useGeolocation } from '../../lib/hooks/useGeolocation';
import { LocationSelector } from './LocationSelector';
import { LocationInfo } from './LocationInfo';
import { WeatherDetails } from './WeatherDetails';
import { TemperatureDisplay } from './TemperatureDisplay';
import { ForecastTimeline } from './ForecastTimeline';

export function WeatherCard() {
  const { location: geoLocation, error: geoError, loading: geoLoading } = useGeolocation();
  const { data: weather, isLoading, error, location, setLocation } = useWeather(geoLocation);

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3">
          <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold">Error loading weather data</h3>
            <p className="text-sm text-gray-600 mt-1">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || geoLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-8 w-8 text-green-600 animate-spin flex-shrink-0" />
          <h3 className="text-xl font-bold">Loading weather data...</h3>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3">
          <AlertCircle className="h-8 w-8 text-yellow-600 flex-shrink-0" />
          <h3 className="text-xl font-bold">No weather data available</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <Cloud className="h-8 w-8 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold">Weather</h3>
            <LocationInfo location={location} error={geoError} />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <LocationSelector 
            selectedLocation={location}
            onLocationChange={setLocation}
          />
          <a
            href="https://www.weatherapi.com/api.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-green-600 hover:text-green-700 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Current Weather */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <motion.div 
          className="bg-gray-50 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <TemperatureDisplay 
                value={weather.current.temp_c}
                size="lg"
              />
              <p className="text-gray-600 mt-1">
                Feels like {weather.current.feelslike_c}°C
              </p>
            </div>
            <img
              src={`https:${weather.current.condition.icon}`}
              alt={weather.current.condition.text}
              className="w-16 h-16"
            />
          </div>
          <p className="text-lg text-gray-700 mt-2">
            {weather.current.condition.text}
          </p>
        </motion.div>

        <WeatherDetails
          humidity={weather.current.humidity}
          pressure={weather.current.pressure_mb}
          windSpeed={weather.current.wind_kph}
          feelsLike={weather.current.feelslike_c}
        />
      </div>

      {/* Forecast Timeline */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold mb-4">24-Hour Forecast</h4>
        <ForecastTimeline forecast={weather.forecast} />
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 space-y-2 sm:space-y-0">
          <span>Last updated: {new Date(weather.current.last_updated).toLocaleString()}</span>
          <div className="flex items-center space-x-4">
            <a
              href={`https://www.google.com/maps/@${location.coordinates.lat},${location.coordinates.lon},13z`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 transition-colors"
            >
              View on Map
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}