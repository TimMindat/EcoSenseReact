import { format, fromUnixTime, parseISO } from 'date-fns';

export function formatAxisDate(timestamp: number): string {
  try {
    const date = typeof timestamp === 'number' ? fromUnixTime(timestamp) : parseISO(String(timestamp));
    return format(date, 'yyyy-MM-dd');
  } catch (error) {
    console.error('Error formatting axis date:', error);
    return 'Invalid Date';
  }
}

export function formatTooltipDateTime(timestamp: number): string {
  try {
    const date = typeof timestamp === 'number' ? fromUnixTime(timestamp) : parseISO(String(timestamp));
    return format(date, 'yyyy-MM-dd HH:mm');
  } catch (error) {
    console.error('Error formatting tooltip date:', error);
    return 'Invalid Date';
  }
}

export function formatTimeRange(start: Date, end: Date): string {
  return `${format(start, 'yyyy-MM-dd')} to ${format(end, 'yyyy-MM-dd')}`;
}

export function normalizeTimestamp(timestamp: number): number {
  // Ensure timestamp is in seconds
  return timestamp > 9999999999 ? Math.floor(timestamp / 1000) : timestamp;
}