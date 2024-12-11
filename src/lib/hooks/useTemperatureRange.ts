import { useEffect, useState } from 'react';
import { getTemperatureRange } from '../api/weather';
import { TemperatureRange } from '../types/weather';
import { validateTemperature } from '../utils/temperature';

interface TemperatureState {
  range: TemperatureRange;
  error: string | null;
  isLoading: boolean;
}

const initialState: TemperatureState = {
  range: {
    high: 0,
    low: 0,
    isValid: false
  },
  error: null,
  isLoading: true
};

export function useTemperatureRange() {
  const [state, setState] = useState<TemperatureState>(initialState);

  useEffect(() => {
    let mounted = true;

    async function fetchTemperatureRange() {
      try {
        const data = await getTemperatureRange();
        
        if (!mounted) return;

        if (data?.forecast?.forecastday[0]) {
          const { maxtemp_c, mintemp_c } = data.forecast.forecastday[0].day;
          
          const isHighValid = validateTemperature(maxtemp_c);
          const isLowValid = validateTemperature(mintemp_c);

          setState({
            range: {
              high: maxtemp_c,
              low: mintemp_c,
              isValid: isHighValid && isLowValid && maxtemp_c >= mintemp_c
            },
            error: null,
            isLoading: false
          });
        } else {
          setState(prev => ({
            ...prev,
            error: 'Invalid temperature data received',
            isLoading: false
          }));
        }
      } catch (err) {
        if (!mounted) return;
        
        setState(prev => ({
          ...prev,
          error: err instanceof Error ? err.message : 'Failed to fetch temperature range',
          isLoading: false
        }));
      }
    }

    fetchTemperatureRange();

    return () => {
      mounted = false;
    };
  }, []);

  return state;
}