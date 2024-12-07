import React from 'react';
import { PollutantCard } from './PollutantCard';
import { PollutantData } from '../../lib/types/airQuality';
import { motion } from 'framer-motion';

interface PollutantGridProps {
  pollutants: PollutantData;
  className?: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function PollutantGrid({ pollutants, className = '' }: PollutantGridProps) {
  return (
    <motion.div 
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {Object.entries(pollutants).map(([key, value]) => (
        <PollutantCard
          key={key}
          pollutant={key}
          value={value}
        />
      ))}
    </motion.div>
  );
}