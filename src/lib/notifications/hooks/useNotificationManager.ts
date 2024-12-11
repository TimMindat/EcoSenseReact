import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { NotificationManager } from '../core/NotificationManager';

export function useNotificationManager() {
  const { user } = useAuth();
  const [manager] = useState(() => NotificationManager.getInstance());
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initManager = async () => {
      try {
        await manager.init();
        setInitialized(true);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to initialize notifications');
      }
    };

    if (!initialized) {
      initManager();
    }
  }, [manager, initialized]);

  const sendNotification = useCallback(async (title: string, body: string, data?: any) => {
    if (!initialized || !user) return;

    try {
      await manager.sendNotification({
        title,
        body,
        data,
        tag: 'default'
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send notification');
    }
  }, [manager, initialized, user]);

  return {
    manager: initialized ? manager : null,
    error,
    sendNotification
  };
}