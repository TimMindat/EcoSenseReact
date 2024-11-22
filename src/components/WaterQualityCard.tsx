import React from 'react';
import { Droplets } from 'lucide-react';

export function WaterQualityCard() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Droplets className="h-8 w-8 text-blue-600" />
        <h3 className="text-xl font-bold">Water Quality Monitor</h3>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">pH Level</span>
            <span className="text-sm font-medium text-green-600">Normal</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '70%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">TDS</span>
            <span className="text-sm font-medium text-green-600">Good</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '30%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Turbidity</span>
            <span className="text-sm font-medium text-green-600">Clear</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '20%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}