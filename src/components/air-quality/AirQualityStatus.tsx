import React from 'react';
import { getAQIStatus } from '../../lib/utils/airQuality';
import { motion } from 'framer-motion';

interface AirQualityStatusProps {
  aqi: number;
  className?: string;
}

export function AirQualityStatus({ aqi, className = '' }: AirQualityStatusProps) {
  const { label, color, bgColor, percentage } = getAQIStatus(aqi);
  
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Air Quality Index</span>
        <motion.span
          key={aqi}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-sm font-medium ${color}`}
        >
          {aqi} - {label}
        </motion.span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <motion.div
          className={`${bgColor} h-3 rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <p className="text-sm text-gray-600 mt-2">
        {aqi} out of 500 on the Air Quality Index scale
      </p>
    </div>
  );
}