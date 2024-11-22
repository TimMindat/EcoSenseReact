import React from 'react';
import { Wind } from 'lucide-react';

export function AirQualityCard() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Wind className="h-8 w-8 text-green-600" />
        <h3 className="text-xl font-bold">Air Quality Monitor</h3>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">PM2.5</span>
            <span className="text-sm font-medium text-green-600">Good</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">CO2</span>
            <span className="text-sm font-medium text-yellow-600">Moderate</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '45%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">VOC</span>
            <span className="text-sm font-medium text-green-600">Good</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '15%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}