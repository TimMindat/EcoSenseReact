import { useState, useEffect, useCallback } from 'react';
import { NotificationService } from '../core/NotificationService';
import { useAirQuality } from '../../hooks/useAirQuality';
import { createWelcomeNotification } from '../templates/airQualityTemplates';

export function useNotificationService() {
  const [state, setState] = useState({
    supported: false,
    permission: 'default' as NotificationPermission,
    loading: true,
    error: null as string | null
  });

  const { data: airQuality } = useAirQuality();
  const notificationService = NotificationService.getInstance();

  useEffect(() => {
    setState(prev => ({
      ...prev,
      supported: 'Notification' in window,
      permission: Notification.permission,
      loading: false
    }));
  }, []);

  const requestPermission = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const granted = await notificationService.requestPermission();
      
      if (granted && airQuality) {
        const { message, options } = createWelcomeNotification(airQuality);
        await notificationService.send(message, options);
      }

      setState(prev => ({
        ...prev,
        permission: Notification.permission,
        loading: false
      }));

      return granted;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to enable notifications',
        loading: false
      }));
      return false;
    }
  }, [airQuality]);

  return {
    ...state,
    requestPermission
  };
}