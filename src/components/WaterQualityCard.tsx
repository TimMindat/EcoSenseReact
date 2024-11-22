import React from 'react';
import { Droplets, AlertCircle } from 'lucide-react';
import useSWR from 'swr';
import { getWaterQualityData } from '../lib/api';

function getQualityLabel(value: number) {
  if (value <= 50) return { text: 'Excellent', color: 'text-green-600', width: '20%' };
  if (value <= 100) return { text: 'Good', color: 'text-blue-600', width: '40%' };
  if (value <= 150) return { text: 'Fair', color: 'text-yellow-600', width: '60%' };
  if (value <= 200) return { text: 'Poor', color: 'text-orange-600', width: '80%' };
  return { text: 'Very Poor', color: 'text-red-600', width: '100%' };
}

export function WaterQualityCard() {
  const { data, error, isLoading } = useSWR('waterQuality', getWaterQualityData, {
    refreshInterval: 3600000 // Refresh every hour
  });

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3">
          <AlertCircle className="h-8 w-8 text-red-600" />
          <h3 className="text-xl font-bold">Error loading water quality data</h3>
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

  const waterData = {
    ph: data?.data?.iaqi?.ph?.v || 7,
    conductivity: data?.data?.iaqi?.ec?.v || 500,
    turbidity: data?.data?.iaqi?.t?.v || 5
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Droplets className="h-8 w-8 text-blue-600" />
          <h3 className="text-xl font-bold">Cairo Water Quality</h3>
        </div>
        <a 
          href="https://aqicn.org/city/cairo/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Data Source
        </a>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">pH Level</span>
            <span className="text-sm font-medium text-blue-600">{waterData.ph}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(waterData.ph / 14) * 100}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Conductivity (μS/cm)</span>
            <span className="text-sm font-medium text-blue-600">{waterData.conductivity}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(waterData.conductivity / 1000) * 100}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Turbidity (NTU)</span>
            <span className="text-sm font-medium text-blue-600">{waterData.turbidity}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(waterData.turbidity / 10) * 100}%` }}
            ></div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
}