import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { POLLUTANT_LIMITS } from '../../lib/constants/pollutants';
import { formatPollutantValue } from '../../lib/utils/formatting';
import { getPollutantStatus } from '../../lib/utils/airQuality';

interface PollutantCardProps {
  pollutant: string;
  value: number;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function PollutantCard({ pollutant, value }: PollutantCardProps) {
  const pollutantInfo = POLLUTANT_LIMITS[pollutant as keyof typeof POLLUTANT_LIMITS];
  
  if (!pollutantInfo) return null;

  const { label, unit, max } = pollutantInfo;
  const formattedValue = formatPollutantValue(value);
  const percentage = Math.min((value / max) * 100, 100);
  const { color, textColor } = getPollutantStatus(value, max);

  return (
    <motion.div 
      className="relative group bg-white rounded-lg p-4 border border-gray-100 hover:border-green-200 transition-all duration-300"
      variants={item}
    >
      <div className="mb-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <Info className="h-4 w-4 text-gray-400 cursor-help" />
        </div>
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={value}
        >
          {value === undefined ? (
            <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1" />
          ) : (
            <span className={`text-sm font-medium ${textColor}`}>
              {formattedValue} {unit}
            </span>
          )}
        </motion.div>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-2 rounded-full transition-all duration-500 ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
        <p className="text-center">
          WHO guideline: {max} {unit}
        </p>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 border-4 border-transparent border-t-gray-900" />
      </div>
    </motion.div>
  );
}