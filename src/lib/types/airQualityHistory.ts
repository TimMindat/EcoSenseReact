import { PollutantData } from './airQuality';

export interface HistoricalDataPoint {
  timestamp: number;
  components: PollutantData;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface PollutantFilter {
  id: keyof PollutantData;
  min?: number;
  max?: number;
  value?: number;
}

export interface ChartConfig {
  visible: boolean;
  color: string;
  strokeWidth: number;
}

export type PollutantChartConfigs = Record<keyof PollutantData, ChartConfig>;