import { useState, useEffect, useCallback } from 'react';
import { NotificationService } from '../services/NotificationService';
import { useAirQuality } from '../../hooks/useAirQuality';
import { getAQIStatus } from '../../utils/airQuality';

export function useNotifications() {
  const [state, setState] = useState({
    supported: false,
    permission: 'default' as NotificationPermission,
    loading: false,
    error: null as string | null
  });

  const { data: airQuality } = useAirQuality();
  const notificationService = NotificationService.getInstance();

  useEffect(() => {
    setState(prev => ({
      ...prev,
      supported: 'Notification' in window,
      permission: Notification.permission
    }));
  }, []);

  const requestPermission = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const granted = await notificationService.requestPermission();
      
      if (granted && airQuality) {
        const { label } = getAQIStatus(airQuality.list[0].main.aqi);
        await notificationService.send({
          title: 'Welcome to EcoPulse!',
          body: `Current air quality is ${label}. We'll keep you updated with real-time alerts.`,
          tag: 'welcome',
          requireInteraction: true
        });
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

  const sendNotification = useCallback(async (payload: {
    title: string;
    body: string;
    important?: boolean;
  }) => {
    if (state.permission !== 'granted') return;

    await notificationService.send({
      title: payload.title,
      body: payload.body,
      requireInteraction: payload.important,
      silent: !payload.important
    });
  }, [state.permission]);

  return {
    ...state,
    requestPermission,
    sendNotification
  };
}