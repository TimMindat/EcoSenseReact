import React, { useState } from 'react';
import { PollutantSelector } from './PollutantSelector';
import { TimeRangeSelector } from './TimeRangeSelector';
import { HistoricalChart } from './HistoricalChart';
import { ExportOptions } from './ExportOptions';
import { useHistoricalData } from '../../hooks/useHistoricalData';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { POLLUTANT_LIMITS } from '../../lib/constants/pollutants';
import { motion } from 'framer-motion';

export function HistoricalDashboard() {
  const [selectedPollutants, setSelectedPollutants] = useState(Object.keys(POLLUTANT_LIMITS));
  const [timeRange, setTimeRange] = useState({ start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), end: new Date() });
  
  const { data, isLoading, error, refetch } = useHistoricalData(timeRange.start, timeRange.end);

  if (error) {
    return <ErrorMessage message="Failed to load historical data" onRetry={refetch} />;
  }

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
        <PollutantSelector 
          selected={selectedPollutants}
          onChange={setSelectedPollutants}
        />
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <HistoricalChart 
            data={data}
            selectedPollutants={selectedPollutants}
            timeRange={timeRange}
          />
          <ExportOptions 
            data={data}
            selectedPollutants={selectedPollutants}
            timeRange={timeRange}
          />
        </>
      )}
    </motion.div>
  );
}