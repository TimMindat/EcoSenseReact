import { useState, useEffect, useCallback } from 'react';
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

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallable(true);
    };

    const handleAppInstalled = () => {
      // Clear the deferredPrompt if app is installed
      setDeferredPrompt(null);
      setInstallable(false);
      // Optional: Track successful installations
      console.log('PWA was installed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [setDeferredPrompt, setInstallable]);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) {
      console.log('Installation prompt not available');
      return false;
    }

    try {
      // Show the install prompt
      const result = await deferredPrompt.prompt();
      // Clear the deferredPrompt since it can only be used once
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
    promptInstall
  };
}