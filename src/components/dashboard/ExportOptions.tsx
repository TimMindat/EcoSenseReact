import React from 'react';
import { Download, Image, FileSpreadsheet } from 'lucide-react';
import { saveAs } from 'file-saver';
import { Button } from '../Button';
import { POLLUTANT_LIMITS } from '../../lib/constants/pollutants';
import { formatTimestamp } from '../../lib/utils/formatting';

interface ExportOptionsProps {
  data: any[];
  selectedPollutants: string[];
  timeRange: {
    start: Date;
    end: Date;
  };
}

export function ExportOptions({ data, selectedPollutants, timeRange }: ExportOptionsProps) {
  const handleImageExport = async (format: 'png' | 'jpg') => {
    const chart = document.querySelector('.recharts-wrapper');
    if (!chart) return;

    const canvas = await html2canvas(chart as HTMLElement);
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `air-quality-chart.${format}`);
      }
    }, `image/${format}`);
  };

  const handleDataExport = () => {
    const headers = ['Timestamp', ...selectedPollutants.map(p => POLLUTANT_LIMITS[p].label)];
    
    const csvContent = [
      headers.join(','),
      ...data.map(row => [
        formatTimestamp(row.timestamp),
        ...selectedPollutants.map(p => row.components[p] || '')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'air-quality-data.csv');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Export Options</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => handleImageExport('png')}
            className="flex items-center space-x-1"
          >
            <Image className="h-4 w-4" />
            <span>PNG</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleImageExport('jpg')}
            className="flex items-center space-x-1"
          >
            <Image className="h-4 w-4" />
            <span>JPG</span>
          </Button>
          <Button
            variant="outline"
            onClick={handleDataExport}
            className="flex items-center space-x-1"
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>CSV</span>
          </Button>
        </div>
      </div>
    </div>
  );
}