import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { POLLUTANT_LIMITS } from '../../lib/constants/pollutants';
import { formatTimestamp } from '../../lib/utils/formatting';

interface HistoricalChartProps {
  data: any[];
  selectedPollutants: string[];
  timeRange: {
    start: Date;
    end: Date;
  };
}

const COLORS = [
  '#2563eb', // blue-600
  '#dc2626', // red-600
  '#16a34a', // green-600
  '#9333ea', // purple-600
  '#ca8a04', // yellow-600
  '#0891b2', // cyan-600
];

export function HistoricalChart({ data, selectedPollutants, timeRange }: HistoricalChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) => formatTimestamp(timestamp)}
              domain={[timeRange.start.getTime(), timeRange.end.getTime()]}
              type="number"
            />
            <YAxis />
            <Tooltip
              labelFormatter={(timestamp) => formatTimestamp(timestamp)}
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px' }}
            />
            <Legend />
            {selectedPollutants.map((pollutant, index) => (
              <Line
                key={pollutant}
                type="monotone"
                dataKey={`components.${pollutant}`}
                name={POLLUTANT_LIMITS[pollutant].label}
                stroke={COLORS[index % COLORS.length]}
                dot={false}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}