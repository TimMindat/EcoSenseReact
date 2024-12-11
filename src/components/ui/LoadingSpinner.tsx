import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
    </div>
  );
}