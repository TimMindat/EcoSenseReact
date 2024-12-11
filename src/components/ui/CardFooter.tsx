import React from 'react';
import { LucideIcon } from 'lucide-react';
import { formatTimestamp } from '../../lib/utils/formatting';

interface CardFooterProps {
  timestamp: number;
  onRefresh: () => void;
  refreshIcon: LucideIcon;
}

export function CardFooter({ timestamp, onRefresh, refreshIcon: RefreshIcon }: CardFooterProps) {
  return (
    <div className="mt-6 pt-4 border-t border-gray-100">
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>Last updated: {formatTimestamp(timestamp)}</span>
        <button
          onClick={onRefresh}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <RefreshIcon className="h-4 w-4" />
          <span>Refresh</span>
        </button>
      </div>
    </div>
  );
}