import { format, fromUnixTime, isValid, isBefore, isAfter, eachDayOfInterval } from 'date-fns';

export function formatChartDate(timestamp: number): string {
  try {
    const date = fromUnixTime(timestamp);
    return isValid(date) ? format(date, 'MMM d, yyyy') : 'Invalid Date';
  } catch (error) {
    console.error('Error formatting chart date:', error);
    return 'Invalid Date';
  }
}

export function formatTooltipDate(timestamp: number): string {
  try {
    const date = fromUnixTime(timestamp);
    return isValid(date) ? format(date, 'MMM d, yyyy') : 'Invalid Date';
  } catch (error) {
    console.error('Error formatting tooltip date:', error);
    return 'Invalid Date';
  }
}

export function validateDateRange(startDate: Date, endDate: Date): boolean {
  if (!isValid(startDate) || !isValid(endDate)) {
    return false;
  }
  
  const now = new Date();
  return isBefore(startDate, endDate) && 
         isBefore(startDate, now) && 
         isBefore(endDate, now);
}

export function getMissingDates(data: { timestamp: number }[], startDate: Date, endDate: Date): Date[] {
  // Get all dates in range
  const allDates = eachDayOfInterval({ start: startDate, end: endDate });
  
  // Convert data timestamps to dates
  const existingDates = new Set(
    data.map(item => format(fromUnixTime(item.timestamp), 'yyyy-MM-dd'))
  );
  
  // Find missing dates
  return allDates.filter(date => 
    !existingDates.has(format(date, 'yyyy-MM-dd'))
  );
}

export function validateChartDates(
  data: { timestamp: number }[], 
  startDate: Date, 
  endDate: Date
): { 
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check if we have data
  if (!data.length) {
    errors.push('No data available for the selected date range');
    return { isValid: false, errors };
  }

  // Check chronological order
  for (let i = 1; i < data.length; i++) {
    if (data[i].timestamp < data[i-1].timestamp) {
      errors.push('Data points are not in chronological order');
      break;
    }
  }

  // Check range boundaries
  const firstTimestamp = fromUnixTime(data[0].timestamp);
  const lastTimestamp = fromUnixTime(data[data.length - 1].timestamp);

  if (isAfter(firstTimestamp, endDate) || isBefore(lastTimestamp, startDate)) {
    errors.push('Data points are outside the selected date range');
  }

  // Check for missing dates
  const missingDates = getMissingDates(data, startDate, endDate);
  if (missingDates.length > 0) {
    errors.push(`Missing data for ${missingDates.length} dates in the selected range`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}