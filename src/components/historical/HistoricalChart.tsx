import React, { forwardRef, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { formatChartDate, formatTooltipDate, validateChartDates } from '../../lib/utils/date';
import { POLLUTANT_LIMITS } from '../../lib/constants/pollutants';
import { HistoricalDataPoint } from '../../lib/types/airQuality';

const CHART_COLORS = [
  '#2563eb', // blue-600
  '#dc2626', // red-600
  '#16a34a', // green-600
  '#9333ea', // purple-600
  '#ca8a04', // yellow-600
  '#0891b2', // cyan-600
];

interface HistoricalChartProps {
  data: HistoricalDataPoint[];
  selectedPollutants: string[];
  timeRange: {
    start: Date;
    end: Date;
  };
  onValidationError?: (errors: string[]) => void;
}

export const HistoricalChart = forwardRef<HTMLDivElement, HistoricalChartProps>(
  ({ data, selectedPollutants, timeRange, onValidationError }, ref) => {
    useEffect(() => {
      // Validate chart dates
      const validation = validateChartDates(data, timeRange.start, timeRange.end);
      if (!validation.isValid && onValidationError) {
        onValidationError(validation.errors);
      }
    }, [data, timeRange, onValidationError]);

    const transformedData = data
      .map(point => ({
        ...point,
        timestamp: point.timestamp / 1000 // Convert milliseconds to seconds for Unix timestamp
      }))
      .sort((a, b) => a.timestamp - b.timestamp); // Ensure chronological order

    return (
      <div ref={ref} className="bg-white p-6 rounded-lg shadow-md">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={transformedData}
              margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatChartDate}
                type="number"
                domain={[timeRange.start.getTime() / 1000, timeRange.end.getTime() / 1000]}
                scale="time"
                tick={{ fontSize: 12, angle: 0 }}
                tickCount={7}
                interval="preserveStartEnd"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip
                labelFormatter={formatTooltipDate}
                formatter={(value: number, name: string) => [
                  value.toFixed(2),
                  POLLUTANT_LIMITS[name]?.label || name
                ]}
              />
              <Legend />
              {selectedPollutants.map((pollutant, index) => {
                const pollutantInfo = POLLUTANT_LIMITS[pollutant];
                if (!pollutantInfo) return null;

                return (
                  <Line
                    key={pollutant}
                    type="monotone"
                    dataKey={`components.${pollutant}`}
                    name={pollutant}
                    stroke={CHART_COLORS[index % CHART_COLORS.length]}
                    dot={false}
                    strokeWidth={2}
                    connectNulls
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
);

HistoricalChart.displayName = 'HistoricalChart';