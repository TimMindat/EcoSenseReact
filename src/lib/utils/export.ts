import { toPng, toJpeg } from 'html-to-image';
import { saveAs } from 'file-saver';
import { formatExportDate } from './date';
import { PollutantData } from '../types/airQuality';
import { POLLUTANT_LIMITS } from '../constants/pollutants';

interface ExportOptions {
  width?: number;
  height?: number;
  quality?: number;
  scale?: number;
}

const DEFAULT_OPTIONS: ExportOptions = {
  width: 1920,
  height: 1080,
  quality: 0.95,
  scale: 2
};

export async function exportChartAsImage(
  chartRef: HTMLElement | null,
  format: 'png' | 'jpg',
  options: ExportOptions = DEFAULT_OPTIONS
): Promise<void> {
  if (!chartRef) {
    throw new Error('Chart reference is not available');
  }

  try {
    const exportFn = format === 'png' ? toPng : toJpeg;
    const blob = await exportFn(chartRef, {
      cacheBust: true,
      ...options,
      backgroundColor: '#ffffff',
      canvasWidth: options.width,
      canvasHeight: options.height,
      pixelRatio: options.scale,
      quality: options.quality,
      style: {
        transform: 'scale(2)',
        transformOrigin: 'top left',
      }
    });

    saveAs(blob, `air-quality-chart-${new Date().toISOString()}.${format}`);
  } catch (error) {
    console.error(`Error exporting chart as ${format}:`, error);
    throw new Error(`Failed to export chart as ${format}`);
  }
}

export function exportDataAsCSV(
  data: { timestamp: number; components: PollutantData }[],
  selectedPollutants: string[]
): void {
  try {
    // Validate data
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('No data available for export');
    }

    // Prepare headers
    const headers = ['Timestamp', ...selectedPollutants.map(p => POLLUTANT_LIMITS[p]?.label || p)];

    // Prepare rows with data validation
    const rows = data.map(row => {
      const timestamp = formatExportDate(row.timestamp);
      const values = selectedPollutants.map(pollutant => {
        const value = row.components[pollutant];
        return typeof value === 'number' ? value.toFixed(3) : 'N/A';
      });
      return [timestamp, ...values];
    });

    // Create CSV content with proper escaping
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(value => `"${value}"`).join(','))
    ].join('\n');

    // Create and save blob with UTF-8 BOM for Excel compatibility
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `air-quality-data-${new Date().toISOString()}.csv`);
  } catch (error) {
    console.error('Error exporting CSV:', error);
    throw new Error('Failed to export data as CSV');
  }
}