import { create } from 'zustand';

interface InstallPromptState {
  deferredPrompt: any;
  isInstallable: boolean;
  hasUserDeclined: boolean;
  setDeferredPrompt: (prompt: any) => void;
  setInstallable: (installable: boolean) => void;
  setUserDeclined: (declined: boolean) => void;
}

export const useInstallPrompt = create<InstallPromptState>((set) => ({
  deferredPrompt: null,
  isInstallable: false,
  hasUserDeclined: false,
  setDeferredPrompt: (prompt) => set({ deferredPrompt: prompt }),
  setInstallable: (installable) => set({ isInstallable: installable }),
  setUserDeclined: (declined) => set({ hasUserDeclined: declined })
}));

export function initInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    useInstallPrompt.getState().setDeferredPrompt(e);
    useInstallPrompt.getState().setInstallable(true);
  });

  window.addEventListener('appinstalled', () => {
    useInstallPrompt.getState().setDeferredPrompt(null);
    useInstallPrompt.getState().setInstallable(false);
  });
}

export async function promptInstall() {
  const { deferredPrompt, setDeferredPrompt, setInstallable } = useInstallPrompt.getState();
  
  if (!deferredPrompt) return;

  const result = await deferredPrompt.prompt();
  setDeferredPrompt(null);
  setInstallable(false);
  
  return result.outcome === 'accepted';
}