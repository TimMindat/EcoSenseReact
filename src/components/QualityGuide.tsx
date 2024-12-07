import React from 'react';
import { AQI_LEVELS } from '../lib/qualityScales';
import { Info } from 'lucide-react';

interface QualityLevelProps {
  range: [number, number];
  label: string;
  bgColor: string;
  textColor: string;
  description: string;
  activities: string[];
}

function QualityLevel({ range, label, bgColor, textColor, description, activities }: QualityLevelProps) {
  return (
    <div className="border rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4 mb-2">
        <div className={`w-16 h-16 ${bgColor} rounded-lg flex items-center justify-center text-white font-bold`}>
          {range[0]}-{range[1]}
        </div>
        <div>
          <h3 className={`text-lg font-semibold ${textColor}`}>{label}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <div className="mt-2">
        <h4 className="font-medium text-gray-700 mb-1">Recommended Actions:</h4>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          {activities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function QualityGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Info className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Understanding Air Quality Measurements</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Our monitoring system uses standardized indices to measure and report air quality. 
          These measurements help you make informed decisions about outdoor activities.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Air Quality Index (AQI)</h2>
        <p className="text-gray-600 mb-4">
          The AQI runs from 0 to 500, with higher values indicating worse air quality. 
          The scale is divided into six categories, each with specific health implications.
        </p>
        {AQI_LEVELS.map((level, index) => (
          <QualityLevel key={index} {...level} />
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Note</h3>
        <p className="text-blue-800">
          These indices are general guidelines. For specific health concerns or sensitive conditions, 
          always consult with healthcare professionals. During severe conditions, follow local authority guidelines.
        </p>
      </div>
    </div>
  );
}