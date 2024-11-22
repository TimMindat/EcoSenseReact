import React from 'react';
import { Wind, AlertCircle } from 'lucide-react';
import useSWR from 'swr';
import { getAirQualityData } from '../lib/api';

function getAQILabel(aqi: number) {
  if (aqi <= 50) return { text: 'Good', color: 'text-green-600', bgColor: 'bg-green-600', width: '20%' };
  if (aqi <= 100) return { text: 'Moderate', color: 'text-yellow-600', bgColor: 'bg-yellow-600', width: '40%' };
  if (aqi <= 150) return { text: 'Unhealthy for Sensitive Groups', color: 'text-orange-600', bgColor: 'bg-orange-600', width: '60%' };
  if (aqi <= 200) return { text: 'Unhealthy', color: 'text-red-600', bgColor: 'bg-red-600', width: '80%' };
  return { text: 'Very Unhealthy', color: 'text-purple-600', bgColor: 'bg-purple-600', width: '100%' };
}

function normalizeValue(value: number, max: number) {
  return Math.min(Math.max((value / max) * 100, 0), 100) + '%';
}

const COMPONENT_LIMITS = {
  co: 1000,    // Carbon monoxide (CO) in μg/m³
  no: 100,     // Nitrogen monoxide (NO) in μg/m³
  no2: 200,    // Nitrogen dioxide (NO2) in μg/m³
  o3: 180,     // Ozone (O3) in μg/m³
  so2: 350,    // Sulfur dioxide (SO2) in μg/m³
  pm2_5: 75,   // PM2.5 in μg/m³
  pm10: 150,   // PM10 in μg/m³
  nh3: 100     // Ammonia (NH3) in μg/m³
};

export function AirQualityCard() {
  const { data, error, isLoading } = useSWR('airQuality', getAirQualityData, {
    refreshInterval: 3600000 // Refresh every hour
  });

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3">
          <AlertCircle className="h-8 w-8 text-red-600" />
          <h3 className="text-xl font-bold">Error loading air quality data</h3>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  const airQuality = data?.list?.[0]?.main?.aqi || 0;
  const components = data?.list?.[0]?.components || {};
  const { text, color, bgColor, width } = getAQILabel(airQuality);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Wind className="h-8 w-8 text-green-600" />
          <h3 className="text-xl font-bold">Cairo Air Quality</h3>
        </div>
        <a 
          href="https://openweathermap.org/api/air-pollution"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-green-600 hover:text-green-700"
        >
          Data Source
        </a>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Air Quality Index</span>
            <span className={`text-sm font-medium ${color}`}>{text}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className={`${bgColor} h-2 rounded-full transition-all duration-500`} style={{ width }}></div>
          </div>
        </div>
        {Object.entries(components).map(([key, value]) => {
          const limit = COMPONENT_LIMITS[key as keyof typeof COMPONENT_LIMITS];
          const normalizedWidth = normalizeValue(Number(value), limit);
          const quality = Number(value) <= limit * 0.5 ? 'bg-green-600' : Number(value) <= limit * 0.75 ? 'bg-yellow-600' : 'bg-red-600';
          
          return (
            <div key={key}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{key.toUpperCase()}</span>
                <span className="text-sm font-medium text-gray-600">{value} μg/m³</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`${quality} h-2 rounded-full transition-all duration-500`}
                  style={{ width: normalizedWidth }}
                ></div>
              </div>
            </div>
          );
        })}
        <p className="text-xs text-gray-500 mt-2">
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
}