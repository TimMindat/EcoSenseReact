import React, { useState, useRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { PollutantSelector } from './PollutantSelector';
import { TimeRangeSelector } from './TimeRangeSelector';
import { HistoricalChart } from './HistoricalChart';
import { ExportOptions } from './ExportOptions';
import { useHistoricalData } from '../../hooks/useHistoricalData';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { POLLUTANT_LIMITS } from '../../lib/constants/pollutants';
import { validateDateRange } from '../../lib/utils/date';
import { motion, AnimatePresence } from 'framer-motion';

export function HistoricalDashboard() {
  const [selectedPollutants, setSelectedPollutants] = useState(Object.keys(POLLUTANT_LIMITS));
  const [timeRange, setTimeRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    end: new Date()
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  const chartRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, error, refetch } = useHistoricalData(timeRange.start, timeRange.end);

  const handleTimeRangeChange = (newRange: { start: Date; end: Date }) => {
    if (!validateDateRange(newRange.start, newRange.end)) {
      setValidationErrors(['Invalid date range selected']);
      return;
    }
    setValidationErrors([]);
    setTimeRange(newRange);
  };

  const handleValidationError = (errors: string[]) => {
    setValidationErrors(errors);
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <TimeRangeSelector 
          value={timeRange} 
          onChange={handleTimeRangeChange}
        />
        <PollutantSelector 
          selected={selectedPollutants}
          onChange={setSelectedPollutants}
        />
      </div>

      <AnimatePresence>
        {validationErrors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-yellow-50 border-l-4 border-yellow-400 p-4"
          >
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Data Validation Warnings
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <ul className="list-disc list-inside">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message="Failed to load historical data" onRetry={refetch} />
      ) : (
        <>
          <HistoricalChart 
            ref={chartRef}
            data={data}
            selectedPollutants={selectedPollutants}
            timeRange={timeRange}
            onValidationError={handleValidationError}
          />
          <ExportOptions 
            chartRef={chartRef}
            data={data}
            selectedPollutants={selectedPollutants}
          />
        </>
      )}
    </motion.div>
  );
}