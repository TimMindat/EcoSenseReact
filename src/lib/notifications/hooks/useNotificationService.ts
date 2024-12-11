import { useState, useEffect, useCallback } from 'react';
import { NotificationManager } from '../NotificationManager';
import { useAirQuality } from '../../hooks/useAirQuality';

export function useNotificationService() {
  const [state, setState] = useState({
    supported: false,
    permission: 'default' as NotificationPermission,
    loading: true,
    error: null as string | null
  });

  const { data: airQuality } = useAirQuality();
  const notificationManager = NotificationManager.getInstance();

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
      
      const granted = await notificationManager.requestPermission();
      
      if (granted && airQuality) {
        await notificationManager.sendWelcomeNotification(airQuality);
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