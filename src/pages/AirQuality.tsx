import React from 'react';
import { Info } from 'lucide-react';
import { AirQualityCard } from '../components/AirQualityCard';
import { WeatherCard } from '../components/weather/WeatherCard';
import { QualityGuide } from '../components/QualityGuide';

export function AirQuality() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <Info className="mx-auto h-12 w-12 text-green-600" />
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Environmental Monitoring
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Real-time air quality and weather data to help you make informed decisions about your environment.
          </p>
        </div>

        {/* Monitoring Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-16">
          <AirQualityCard />
          <WeatherCard />
        </div>

        {/* Quality Guide Section */}
        <div className="mt-16">
          <QualityGuide />
        </div>
      </div>
    </div>
  );
}