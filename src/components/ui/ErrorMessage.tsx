import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '../Button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-3">
        <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Error</h3>
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
      {onRetry && (
        <Button onClick={onRetry} className="mt-4">
          Try Again
        </Button>
      )}
    </div>
  );
}