import React from 'react';
import { Wind, MapPin, ExternalLink } from 'lucide-react';
import { Location } from '../../lib/types/location';

interface AirQualityHeaderProps {
  location: Location;
}

export function AirQualityHeader({ location }: AirQualityHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center space-x-3 mb-4 sm:mb-0">
        <div className="p-2 bg-green-50 rounded-lg">
          <Wind className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Air Quality</h3>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{location.name}</span>
          </div>
        </div>
      </div>
      
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
  );
}