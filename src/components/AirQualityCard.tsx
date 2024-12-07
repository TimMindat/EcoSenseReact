import React from 'react';
import { Wind, AlertCircle, Loader2, MapPin, ExternalLink } from 'lucide-react';
import { useAirQuality } from '../lib/hooks/useAirQuality';
import { AQIDisplay } from './air-quality/AQIDisplay';
import { PollutantDisplay } from './air-quality/PollutantDisplay';
import { formatTimestamp } from '../lib/utils/formatting';
import { POLLUTANT_LIMITS } from '../lib/constants/pollutants';

export function AirQualityCard() {
  const { data, location, isLoading, error, refresh } = useAirQuality();

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <div className="flex items-center space-x-3">
          <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold">Error loading air quality data</h3>
            <p className="text-sm text-gray-600 mt-1">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-8 w-8 text-green-600 animate-spin flex-shrink-0" />
          <h3 className="text-xl font-bold">Loading air quality data...</h3>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <div className="flex items-center space-x-3">
          <AlertCircle className="h-8 w-8 text-yellow-600 flex-shrink-0" />
          <h3 className="text-xl font-bold">No air quality data available</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <Wind className="h-8 w-8 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold">Air Quality</h3>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              {location.name}
            </div>
          </div>
        </div>
        
        {/* Data Source Link */}
        <a
          href="https://openweathermap.org/api/air-pollution"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-green-600 hover:text-green-700 transition-colors"
        >
          <span>Data Source</span>
          <ExternalLink className="h-4 w-4 ml-1" />
        </a>
      </div>

      {/* AQI Display */}
      <div className="mb-8">
        <AQIDisplay />
      </div>

      {/* Pollutants Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {Object.keys(POLLUTANT_LIMITS).map((key) => (
          <PollutantDisplay
            key={key}
            pollutant={key}
            value={data.components[key]}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 space-y-2 sm:space-y-0">
          <span>Last updated: {formatTimestamp(data.dt)}</span>
          <div className="flex items-center space-x-4">
            <a
              href={`https://www.google.com/maps/@${location.coordinates.lat},${location.coordinates.lon},13z`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 transition-colors"
            >
              View on Map
            </a>
            <button
              onClick={() => refresh()}
              className="text-green-600 hover:text-green-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}