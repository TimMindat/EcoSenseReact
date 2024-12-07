import { useState, useEffect } from 'react';
import { AQIMonitor } from '../monitoring/AQIMonitor';

interface ValidationState {
  isValidating: boolean;
  lastValidation: {
    timestamp: number;
    status: 'success' | 'error';
    message: string;
    details?: any;
  } | null;
}

export function useAQIValidation(interval = 300000) { // 5 minutes default
  const [state, setState] = useState<ValidationState>({
    isValidating: false,
    lastValidation: null
  });

  const validate = async () => {
    setState(prev => ({ ...prev, isValidating: true }));
    
    try {
      const result = await AQIMonitor.validateAndSync();
      setState({
        isValidating: false,
        lastValidation: {
          timestamp: Date.now(),
          ...result
        }
      });
    } catch (error) {
      setState({
        isValidating: false,
        lastValidation: {
          timestamp: Date.now(),
          status: 'error',
          message: 'Validation failed',
          details: error
        }
      });
    }
  };

  useEffect(() => {
    validate(); // Initial validation
    
    const timer = setInterval(validate, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return {
    ...state,
    validateNow: validate
  };
}