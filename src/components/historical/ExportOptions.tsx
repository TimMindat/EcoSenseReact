import React from 'react';
import { Download, Image, FileSpreadsheet, Loader2 } from 'lucide-react';
import { Button } from '../Button';
import { exportChartAsImage, exportDataAsCSV } from '../../lib/utils/export';
import { HistoricalDataPoint } from '../../lib/types/airQuality';

interface ExportOptionsProps {
  chartRef: React.RefObject<HTMLDivElement>;
  data: HistoricalDataPoint[];
  selectedPollutants: string[];
}

export function ExportOptions({ chartRef, data, selectedPollutants }: ExportOptionsProps) {
  const [exporting, setExporting] = React.useState<'png' | 'jpg' | 'csv' | null>(null);

  const handleImageExport = async (format: 'png' | 'jpg') => {
    try {
      setExporting(format);
      await exportChartAsImage(chartRef.current, format);
    } catch (error) {
      console.error(`Error exporting as ${format}:`, error);
      // Here you could show a toast notification to the user
    } finally {
      setExporting(null);
    }
  };

  const handleDataExport = async () => {
    try {
      setExporting('csv');
      exportDataAsCSV(data, selectedPollutants);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      // Here you could show a toast notification to the user
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Export Options</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => handleImageExport('png')}
            disabled={!!exporting}
            className="flex items-center space-x-1"
          >
            {exporting === 'png' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Image className="h-4 w-4" />
            )}
            <span>PNG</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleImageExport('jpg')}
            disabled={!!exporting}
            className="flex items-center space-x-1"
          >
            {exporting === 'jpg' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Image className="h-4 w-4" />
            )}
            <span>JPG</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={handleDataExport}
            disabled={!!exporting}
            className="flex items-center space-x-1"
          >
            {exporting === 'csv' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FileSpreadsheet className="h-4 w-4" />
            )}
            <span>CSV</span>
          </Button>
        </div>
      </div>
    </div>
  );
}