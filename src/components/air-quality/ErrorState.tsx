import React from 'react';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../Button';

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center space-x-3">
        <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0" />
        <div>
          <h3 className="text-xl font-bold">Error loading air quality data</h3>
          <p className="text-sm text-gray-600 mt-1">
            We couldn't fetch the latest air quality information
          </p>
        </div>
      </div>
      <Button
        onClick={onRetry}
        className="mt-6"
      >
        Try Again
      </Button>
    </motion.div>
  );
}