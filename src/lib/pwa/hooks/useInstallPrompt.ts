import { useEffect, useCallback } from 'react';
import { useInstallPromptStore } from '../store/installPromptStore';
import { isStandalone, isSupportedBrowser } from '../utils/browserChecks';

export function useInstallPrompt() {
  const { 
    isInstallable,
    hasUserDeclined,
    deferredPrompt,
    setDeferredPrompt,
    setInstallable,
    setUserDeclined 
  } = useInstallPromptStore();

  useEffect(() => {
    // Don't set up listeners if already installed or not supported
    if (isStandalone() || !isSupportedBrowser()) {
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallable(true);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setInstallable(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [setDeferredPrompt, setInstallable]);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return false;

    try {
      const result = await deferredPrompt.prompt();
      setDeferredPrompt(null);
      setInstallable(false);
      return result.outcome === 'accepted';
    } catch (error) {
      console.error('Error showing install prompt:', error);
      return false;
    }
  }, [deferredPrompt, setDeferredPrompt, setInstallable]);

  return {
    isInstallable,
    hasUserDeclined,
    setUserDeclined,
    promptInstall,
    // Only show if installable and not standalone
    canShow: isInstallable && !isStandalone() && isSupportedBrowser()
  };
}