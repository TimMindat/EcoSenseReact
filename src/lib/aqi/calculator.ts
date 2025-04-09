import { AQI_BREAKPOINTS } from '../constants/aqiBreakpoints';
import { AQI_CATEGORIES } from '../constants/aqiCategories';

export class AQICalculator {
  /**
   * Calculate AQI based on pollutant measurements
   * @param measurements Object containing pollutant measurements
   * @returns Calculated AQI data including overall AQI, category, and individual pollutant data
   */
  public static calculate(measurements: Record<string, number>): any {
    // Validate input
    if (!measurements || Object.keys(measurements).length === 0) {
      console.error('No measurements provided to AQI calculator');
      return null;
    }
    
    // Calculate sub-indices for each pollutant
    const pollutants: Record<string, any> = {};
    let maxAQI = -1;
    let dominantPollutant = '';
    
    for (const [pollutant, concentration] of Object.entries(measurements)) {
      // Skip invalid concentrations
      if (typeof concentration !== 'number' || isNaN(concentration) || concentration < 0) {
        continue;
      }
      
      // Calculate sub-index for this pollutant
      const subIndex = this.calculateSubIndex(pollutant, concentration);
      
      // Skip if calculation failed
      if (subIndex === -1) continue;
      
      // Track the highest sub-index (dominant pollutant)
      if (subIndex > maxAQI) {
        maxAQI = subIndex;
        dominantPollutant = pollutant;
      }
      
      // Store pollutant data
      pollutants[pollutant] = {
        concentration,
        subIndex,
        category: this.getAQICategory(subIndex)
      };
    }
    
    // If no valid calculations, return null
    if (maxAQI === -1) {
      return null;
    }
    
    // Return final AQI data
    return {
      aqi: Math.round(maxAQI),
      category: this.getAQICategory(maxAQI),
      dominantPollutant,
      pollutants
    };
  }
  
  /**
   * Calculate AQI sub-index for a specific pollutant
   * @param pollutant Pollutant name (e.g., 'pm2_5', 'o3')
   * @param concentration Measured concentration
   * @returns Calculated sub-index or -1 if calculation failed
   */
  private static calculateSubIndex(pollutant: string, concentration: number): number {
    // Get breakpoints for this pollutant
    const breakpoints = AQI_BREAKPOINTS[pollutant];
    if (!breakpoints) {
      console.warn(`No breakpoints defined for pollutant: ${pollutant}`);
      return -1;
    }
    
    // Find the appropriate breakpoint range
    for (const bp of breakpoints) {
      if (concentration <= bp.concentration.high) {
        // Linear interpolation formula:
        // AQI = ((I_high - I_low) / (C_high - C_low)) * (C - C_low) + I_low
        const aqi = 
          ((bp.index.high - bp.index.low) / (bp.concentration.high - bp.concentration.low)) * 
          (concentration - bp.concentration.low) + 
          bp.index.low;
        
        return aqi;
      }
    }
    
    // If concentration exceeds all breakpoints, use the highest category
    const lastBp = breakpoints[breakpoints.length - 1];
    return lastBp.index.high;
  }
  
  /**
   * Get AQI category based on AQI value
   * @param aqi AQI value
   * @returns AQI category name
   */
  private static getAQICategory(aqi: number): string {
    for (const category of AQI_CATEGORIES) {
      if (aqi <= category.max) {
        return category.name;
      }
    }
    return AQI_CATEGORIES[AQI_CATEGORIES.length - 1].name;
  }
  
  /**
   * Get color for AQI value
   * @param aqi AQI value
   * @returns Color hex code
   */
  public static getAQIColor(aqi: number): string {
    for (const category of AQI_CATEGORIES) {
      if (aqi <= category.max) {
        return category.color;
      }
    }
    return AQI_CATEGORIES[AQI_CATEGORIES.length - 1].color;
  }
  
  /**
   * Get WHO guideline value for a pollutant
   * @param pollutant Pollutant name
   * @returns WHO guideline value or null if not defined
   */
  public static getWHOGuideline(pollutant: string): number | null {
    const guidelines: Record<string, number> = {
      'pm2_5': 5,    // μg/m³ (24-hour mean)
      'pm10': 15,    // μg/m³ (24-hour mean)
      'o3': 100,     // μg/m³ (8-hour mean)
      'no2': 25,     // μg/m³ (24-hour mean)
      'so2': 40,     // μg/m³ (24-hour mean)
      'co': 4,       // mg/m³ (24-hour mean)
    };
    
    return guidelines[pollutant] || null;
  }
  
  /**
   * Calculate AQI based only on CO measurements
   * @param measurements Object containing CO measurement
   * @returns Calculated AQI data for CO
   */
  public static calculateCOOnly(measurements: Record<string, number>): any {
    // Validate input
    if (!measurements || !measurements['co'] || typeof measurements['co'] !== 'number') {
      console.error('No valid CO measurement provided');
      return null;
    }
    
    const co = measurements['co'];
    
    // Calculate AQI for CO
    const subIndex = this.calculateSubIndex('co', co);
    
    if (subIndex === -1) {
      console.error('Failed to calculate CO AQI');
      return null;
    }
    
    // Return AQI data
    return {
      aqi: Math.round(subIndex),
      category: this.getAQICategory(subIndex),
      dominantPollutant: 'co',
      pollutants: {
        'co': {
          concentration: co,
          subIndex
        }
      }
    };
  }
  public static calculatePM25Only(measurements: Record<string, number>): any {
    // Validate input
    if (!measurements || !measurements['pm2_5'] || typeof measurements['pm2_5'] !== 'number') {
      console.error('No valid PM2.5 measurement provided');
      return null;
    }
    
    const pm25 = measurements['pm2_5'];
    
    // Calculate AQI for PM2.5
    const subIndex = this.calculateSubIndex('pm2_5', pm25);
    
    if (subIndex === -1) {
      console.error('Failed to calculate PM2.5 AQI');
      return null;
    }
    
    // Return AQI data
    return {
      aqi: Math.round(subIndex),
      category: this.getAQICategory(subIndex),
      dominantPollutant: 'pm2_5',
      pollutants: {
        'pm2_5': {
          concentration: pm25,
          subIndex
        }
      }
    };
  }
  
  /**
   * Calculate AQI based only on Ozone (O3) measurements
   * @param measurements Object containing O3 measurement
   * @returns Calculated AQI data for O3
   */
  public static calculateO3Only(measurements: Record<string, number>): any {
    // Validate input
    if (!measurements || !measurements['o3'] || typeof measurements['o3'] !== 'number') {
      console.error('No valid O3 measurement provided');
      return null;
    }
    
    const o3 = measurements['o3'];
    
    // Calculate AQI for O3
    const subIndex = this.calculateSubIndex('o3', o3);
    
    if (subIndex === -1) {
      console.error('Failed to calculate O3 AQI');
      return null;
    }
    
    // Return AQI data
    return {
      aqi: Math.round(subIndex),
      category: this.getAQICategory(subIndex),
      dominantPollutant: 'o3',
      pollutants: {
        'o3': {
          concentration: o3,
          subIndex
        }
      }
    };
  }
}