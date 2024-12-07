import { AirQualityData, PollutantData } from '../types/airQuality';
import { POLLUTANT_LIMITS } from '../constants/pollutants';

interface ValidationResult {
  isValid: boolean;
  discrepancies: Discrepancy[];
  timestamp: number;
}

interface Discrepancy {
  field: string;
  expected: any;
  received: any;
  message: string;
}

export class AQIValidator {
  private static readonly TIMESTAMP_THRESHOLD = 300; // 5 minutes in seconds

  static validateAQIData(localData: AirQualityData, apiData: AirQualityData): ValidationResult {
    const discrepancies: Discrepancy[] = [];
    const currentTimestamp = Math.floor(Date.now() / 1000);

    // Validate timestamp
    const timestampDiff = Math.abs(apiData.list[0].dt - localData.list[0].dt);
    if (timestampDiff > this.TIMESTAMP_THRESHOLD) {
      discrepancies.push({
        field: 'timestamp',
        expected: apiData.list[0].dt,
        received: localData.list[0].dt,
        message: 'Local data is out of sync with API data'
      });
    }

    // Validate AQI value
    if (localData.list[0].main.aqi !== apiData.list[0].main.aqi) {
      discrepancies.push({
        field: 'aqi',
        expected: apiData.list[0].main.aqi,
        received: localData.list[0].main.aqi,
        message: 'AQI value mismatch'
      });
    }

    // Validate pollutant components
    this.validatePollutants(
      localData.list[0].components,
      apiData.list[0].components,
      discrepancies
    );

    return {
      isValid: discrepancies.length === 0,
      discrepancies,
      timestamp: currentTimestamp
    };
  }

  private static validatePollutants(
    localComponents: PollutantData,
    apiComponents: PollutantData,
    discrepancies: Discrepancy[]
  ): void {
    for (const [key, limit] of Object.entries(POLLUTANT_LIMITS)) {
      const localValue = localComponents[key];
      const apiValue = apiComponents[key];

      // Check for missing values
      if (localValue === undefined && apiValue !== undefined) {
        discrepancies.push({
          field: key,
          expected: apiValue,
          received: undefined,
          message: `Missing ${key} value in local data`
        });
        continue;
      }

      // Check for value mismatches
      if (localValue !== apiValue) {
        discrepancies.push({
          field: key,
          expected: apiValue,
          received: localValue,
          message: `${key} value mismatch`
        });
      }

      // Validate ranges
      if (apiValue !== undefined && (apiValue < 0 || apiValue > limit.max * 2)) {
        discrepancies.push({
          field: key,
          expected: `0-${limit.max * 2}`,
          received: apiValue,
          message: `${key} value out of valid range`
        });
      }
    }
  }
}