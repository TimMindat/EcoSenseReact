import { useState, useEffect, useCallback } from 'react';
import { NotificationManager } from '../notifications/NotificationManager';
import { useAirQuality } from './useAirQuality';

interface NotificationState {
  supported: boolean;
  permission: NotificationPermission;
  loading: boolean;
  error: string | null;
}

export function useNotifications() {
  const [state, setState] = useState<NotificationState>({
    supported: false,
    permission: 'default',
    loading: true,
    error: null
  });

  const { data: airQuality } = useAirQuality();
  const notificationManager = NotificationManager.getInstance();

  useEffect(() => {
    const checkNotificationSupport = () => {
      setState(prev => ({
        ...prev,
        supported: 'Notification' in window,
        permission: Notification.permission,
        loading: false
      }));
    };

    checkNotificationSupport();
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