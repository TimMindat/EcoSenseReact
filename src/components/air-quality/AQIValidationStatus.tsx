import React from 'react';
import { AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { useAQIValidation } from '../../lib/hooks/useAQIValidation';
import { formatTimestamp } from '../../lib/utils/formatting';

export function AQIValidationStatus() {
  const { isValidating, lastValidation, validateNow } = useAQIValidation();

  if (isValidating) {
    return (
      <div className="flex items-center text-gray-600">
        <RefreshCw className="h-4 w-4 animate-spin mr-2" />
        <span className="text-sm">Validating data...</span>
      </div>
    );
  }

  if (!lastValidation) {
    return null;
  }

  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center">
        {lastValidation.status === 'success' ? (
          <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
        ) : (
          <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
        )}
        <span className={lastValidation.status === 'success' ? 'text-green-600' : 'text-red-600'}>
          {lastValidation.message}
        </span>
      </div>
      <div className="flex items-center space-x-4 text-gray-500">
        <span>Last checked: {formatTimestamp(lastValidation.timestamp / 1000)}</span>
        <button
          onClick={validateNow}
          className="text-green-600 hover:text-green-700"
        >
          Validate Now
        </button>
      </div>
    </div>
  );
}