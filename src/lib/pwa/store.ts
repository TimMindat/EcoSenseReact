import { create } from 'zustand';

interface InstallPromptState {
  deferredPrompt: any | null;
  isInstallable: boolean;
  hasUserDeclined: boolean;
}

interface InstallPromptActions {
  setDeferredPrompt: (prompt: any | null) => void;
  setInstallable: (installable: boolean) => void;
  setUserDeclined: (declined: boolean) => void;
}

export const useInstallPromptStore = create<InstallPromptState & InstallPromptActions>((set) => ({
  deferredPrompt: null,
  isInstallable: false,
  hasUserDeclined: false,
  setDeferredPrompt: (prompt) => set({ deferredPrompt: prompt }),
  setInstallable: (installable) => set({ isInstallable: installable }),
  setUserDeclined: (declined) => set({ hasUserDeclined: declined })
}));