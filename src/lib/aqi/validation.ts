import { EPA_AQI_BREAKPOINTS } from './constants';
import { AQICalculator } from './calculator';

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

interface ValidationError {
  pollutant: string;
  value: number;
  message: string;
}

export class AQIValidator {
  static validateMeasurements(measurements: Record<string, number>): ValidationResult {
    const errors: ValidationError[] = [];

    for (const [pollutant, value] of Object.entries(measurements)) {
      // Check if pollutant is recognized
      if (!EPA_AQI_BREAKPOINTS[pollutant]) {
        errors.push({
          pollutant,
          value,
          message: `Unknown pollutant: ${pollutant}`
        });
        continue;
      }

      // Validate concentration range
      if (!AQICalculator.validateConcentration(pollutant, value)) {
        const ranges = EPA_AQI_BREAKPOINTS[pollutant].breakpoints;
        const min = ranges[0].concentration[0];
        const max = ranges[ranges.length - 1].concentration[1];
        
        errors.push({
          pollutant,
          value,
          message: `Value ${value} is outside valid range [${min}, ${max}] for ${pollutant}`
        });
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static validateCalculation(aqi: number, pollutants: Record<string, number>): boolean {
    // Recalculate AQI
    const result = AQICalculator.calculate(pollutants);
    
    // Allow for small floating-point differences
    return Math.abs(result.aqi - aqi) < 0.5;
  }
}