import React from 'react';
import { RefreshCw } from 'lucide-react';
import { formatTimestamp } from '../../lib/utils/formatting';
import { Location } from '../../lib/types/location';
import { motion } from 'framer-motion';

interface CardFooterProps {
  timestamp: number;
  location: Location;
  onRefresh: () => void;
}

export function CardFooter({ timestamp, location, onRefresh }: CardFooterProps) {
  return (
    <div className="mt-6 pt-4 border-t border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 space-y-2 sm:space-y-0">
        <span>Last updated: {formatTimestamp(timestamp)}</span>
        <div className="flex items-center space-x-4">
          <a
            href={`https://www.google.com/maps/@${location.coordinates.lat},${location.coordinates.lon},13z`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-700 transition-colors"
          >
            View on Map
          </a>
          <motion.button
            onClick={onRefresh}
            className="text-green-600 hover:text-green-700 transition-colors inline-flex items-center space-x-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}