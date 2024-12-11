import { useState, useCallback } from 'react';

export function useNotifications() {
  const [showPrompt, setShowPrompt] = useState(true);

  const handleDismiss = useCallback(() => {
    setShowPrompt(false);
    localStorage.setItem('notification_prompt_dismissed', 'true');
  }, []);

  const requestPermission = useCallback(async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        handleDismiss();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }, [handleDismiss]);

  return {
    showPrompt,
    handleDismiss,
    requestPermission
  };
}