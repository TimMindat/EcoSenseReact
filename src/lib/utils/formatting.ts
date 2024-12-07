export function formatPollutantValue(value: number | undefined): string {
  if (value === undefined || value === null) {
    return 'N/A';
  }
  
  // Handle different value ranges
  if (value < 0.01) {
    return '< 0.01';
  }
  
  if (value >= 1000) {
    return value.toFixed(0);
  }
  
  if (value >= 100) {
    return value.toFixed(1);
  }
  
  return value.toFixed(2);
}

export function formatTimestamp(timestamp: number): string {
  try {
    return new Date(timestamp * 1000).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  } catch (error) {
    console.error('Error formatting timestamp:', error);
    return 'Invalid date';
  }
}