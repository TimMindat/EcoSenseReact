import { AQIValidator } from '../validation/AQIValidator';
import { getAirQualityData } from '../api/airQuality';
import { AirQualityData } from '../types/airQuality';

interface MonitoringResult {
  status: 'success' | 'error';
  message: string;
  details?: any;
}

export class AQIMonitor {
  private static readonly ALERT_THRESHOLD = 3; // Number of consecutive validation failures before alerting
  private static validationFailures = 0;

  static async validateAndSync(): Promise<MonitoringResult> {
    try {
      // Get current local data
      const localData = await getAirQualityData();
      if (!localData) {
        return {
          status: 'error',
          message: 'No local data available'
        };
      }

      // Get fresh API data for comparison
      const apiData = await getAirQualityData();
      if (!apiData) {
        return {
          status: 'error',
          message: 'Failed to fetch API data for validation'
        };
      }

      // Validate data
      const validationResult = AQIValidator.validateAQIData(localData, apiData);

      if (!validationResult.isValid) {
        this.validationFailures++;
        
        if (this.validationFailures >= this.ALERT_THRESHOLD) {
          this.triggerAlert(validationResult.discrepancies);
        }

        return {
          status: 'error',
          message: 'Data validation failed',
          details: validationResult.discrepancies
        };
      }

      // Reset failure counter on successful validation
      this.validationFailures = 0;

      return {
        status: 'success',
        message: 'Data validation successful',
        details: {
          timestamp: validationResult.timestamp
        }
      };
    } catch (error) {
      console.error('AQI monitoring error:', error);
      return {
        status: 'error',
        message: 'Error during AQI monitoring',
        details: error
      };
    }
  }

  private static triggerAlert(discrepancies: any[]): void {
    console.error('AQI Data Alert:', {
      message: 'Multiple validation failures detected',
      failures: this.validationFailures,
      discrepancies
    });

    // Here you could implement additional alert mechanisms:
    // - Send to error monitoring service
    // - Trigger system notifications
    // - Send email alerts
    // - Update status dashboard
  }
}