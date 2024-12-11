import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { fcmService } from '../firebase/messaging';

interface NotificationState {
  permission: NotificationPermission;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export function useNotifications() {
  const { user } = useAuth();
  const [state, setState] = useState<NotificationState>({
    permission: 'default',
    token: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const initNotifications = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        // Initialize FCM service
        await fcmService.init();
        
        // Get current permission state
        setState(prev => ({ ...prev, permission: Notification.permission }));
        
        // Get token if permission is granted and user is logged in
        if (Notification.permission === 'granted' && user) {
          const token = await fcmService.getOrGenerateToken(user.uid);
          setState(prev => ({ ...prev, token }));
        }
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : 'Failed to initialize notifications'
        }));
      } finally {
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    initNotifications();
  }, [user]);

  const requestPermission = useCallback(async () => {
    if (!user) return false;

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const granted = await fcmService.requestPermission();
      if (granted) {
        const token = await fcmService.getOrGenerateToken(user.uid);
        setState(prev => ({
          ...prev,
          permission: 'granted',
          token
        }));
      }
      
      return granted;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to request permission'
      }));
      return false;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [user]);

  const unsubscribe = useCallback(async () => {
    if (!user) return;

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await fcmService.deleteToken(user.uid);
      setState(prev => ({
        ...prev,
        token: null
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to unsubscribe'
      }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [user]);

  return {
    ...state,
    requestPermission,
    unsubscribe,
    isEnabled: state.permission === 'granted' && !!state.token
  };
}