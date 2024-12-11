import React from 'react';
import { POLLUTANT_LIMITS } from '../../lib/constants/pollutants';
import { motion } from 'framer-motion';

interface PollutantSelectorProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function PollutantSelector({ selected, onChange }: PollutantSelectorProps) {
  const handleToggle = (pollutant: string) => {
    if (selected.includes(pollutant)) {
      onChange(selected.filter(p => p !== pollutant));
    } else {
      onChange([...selected, pollutant]);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Select Pollutants</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {Object.entries(POLLUTANT_LIMITS).map(([key, { label }]) => (
          <motion.button
            key={key}
            onClick={() => handleToggle(key)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selected.includes(key)
                ? 'bg-green-100 text-green-800 border-2 border-green-500'
                : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}