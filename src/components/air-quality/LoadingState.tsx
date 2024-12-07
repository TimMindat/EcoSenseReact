import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function LoadingState() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <motion.div 
        className="flex items-center space-x-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
        <h3 className="text-xl font-bold">Loading air quality data...</h3>
      </motion.div>
      <div className="mt-8 space-y-4">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="h-12 bg-gray-100 rounded-lg animate-pulse"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
}