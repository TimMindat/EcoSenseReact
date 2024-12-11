import { useInstallPromptStore } from '../store';

export function initInstallPrompt() {
  // Only initialize if we're in a browser environment
  if (typeof window === 'undefined') return;

  const { setDeferredPrompt, setInstallable } = useInstallPromptStore.getState();

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    setDeferredPrompt(e);
    setInstallable(true);
  });

  window.addEventListener('appinstalled', () => {
    setDeferredPrompt(null);
    setInstallable(false);
  });
}