export interface AQIBreakpoint {
  index: [number, number];
  concentration: [number, number];
}

export interface PollutantInfo {
  name: string;
  unit: string;
  breakpoints: AQIBreakpoint[];
}

export interface PollutantBreakpoints {
  [key: string]: PollutantInfo;
}

export interface PollutantData {
  concentration: number;
  subIndex: number;
}

export interface AQIResult {
  aqi: number;
  category: string;
  dominantPollutant: string;
  pollutants: Record<string, PollutantData>;
}

export interface AQICategory {
  range: [number, number];
  name: string;
  description: string;
}