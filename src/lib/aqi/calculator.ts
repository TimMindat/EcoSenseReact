import { EPA_AQI_BREAKPOINTS, AQI_CATEGORIES } from './constants';
import type { AQIBreakpoint, AQIResult, PollutantData } from './types';

export class AQICalculator {
  static calculate(measurements: Record<string, number>): AQIResult {
    const pollutants: Record<string, PollutantData> = {};
    let maxAQI = -1;
    let dominantPollutant = '';

    // Calculate sub-indices for each pollutant
    for (const [pollutant, concentration] of Object.entries(measurements)) {
      const breakpointInfo = EPA_AQI_BREAKPOINTS[pollutant];
      if (!breakpointInfo) continue;

      const subIndex = this.calculateSubIndex(concentration, breakpointInfo.breakpoints);
      
      pollutants[pollutant] = {
        concentration,
        subIndex
      };

      // Track the highest sub-index (dominant pollutant)
      if (subIndex > maxAQI) {
        maxAQI = subIndex;
        dominantPollutant = pollutant;
      }
    }

    const category = this.getAQICategory(maxAQI);

    return {
      aqi: Math.round(maxAQI),
      category: category.name,
      dominantPollutant,
      pollutants
    };
  }

  private static calculateSubIndex(concentration: number, breakpoints: AQIBreakpoint[]): number {
    // Find the appropriate breakpoint range
    const breakpoint = this.findBreakpointRange(concentration, breakpoints);
    if (!breakpoint) return 0;

    // Apply the EPA's interpolation formula
    const [indexLow, indexHigh] = breakpoint.index;
    const [concLow, concHigh] = breakpoint.concentration;

    return this.interpolate(
      concentration,
      concLow,
      concHigh,
      indexLow,
      indexHigh
    );
  }

  private static findBreakpointRange(concentration: number, breakpoints: AQIBreakpoint[]): AQIBreakpoint | null {
    return breakpoints.find(({ concentration: [low, high] }) => 
      concentration >= low && concentration <= high
    ) || null;
  }

  private static interpolate(
    concentration: number,
    concLow: number,
    concHigh: number,
    indexLow: number,
    indexHigh: number
  ): number {
    // EPA's Linear Interpolation Formula
    return (
      ((indexHigh - indexLow) / (concHigh - concLow)) * 
      (concentration - concLow) + 
      indexLow
    );
  }

  private static getAQICategory(aqi: number) {
    return (
      AQI_CATEGORIES.find(({ range: [min, max] }) => 
        aqi >= min && aqi <= max
      ) || 
      AQI_CATEGORIES[AQI_CATEGORIES.length - 1]
    );
  }

  static validateConcentration(pollutant: string, value: number): boolean {
    const info = EPA_AQI_BREAKPOINTS[pollutant];
    if (!info) return false;

    const ranges = info.breakpoints;
    const minConc = ranges[0].concentration[0];
    const maxConc = ranges[ranges.length - 1].concentration[1];

    return value >= minConc && value <= maxConc;
  }
}