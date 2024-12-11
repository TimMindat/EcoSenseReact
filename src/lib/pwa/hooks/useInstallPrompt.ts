import { useEffect, useCallback } from 'react';
import { useInstallPromptStore } from '../store';

export function useInstallPrompt() {
  const { 
    isInstallable,
    hasUserDeclined,
    deferredPrompt,
    setDeferredPrompt,
    setInstallable,
    setUserDeclined 
  } = useInstallPromptStore();

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return false;

    const result = await deferredPrompt.prompt();
    setDeferredPrompt(null);
    setInstallable(false);
    
    return result.outcome === 'accepted';
  }, [deferredPrompt, setDeferredPrompt, setInstallable]);

  return {
    isInstallable,
    hasUserDeclined,
    setUserDeclined,
    promptInstall
  };
}