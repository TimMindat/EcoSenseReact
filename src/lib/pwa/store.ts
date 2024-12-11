import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface InstallPromptState {
  deferredPrompt: any | null;
  isInstallable: boolean;
  hasUserDeclined: boolean;
  setDeferredPrompt: (prompt: any | null) => void;
  setInstallable: (installable: boolean) => void;
  setUserDeclined: (declined: boolean) => void;
}

export const useInstallPromptStore = create<InstallPromptState>()(
  persist(
    (set) => ({
      deferredPrompt: null,
      isInstallable: false,
      hasUserDeclined: false,
      setDeferredPrompt: (prompt) => set({ deferredPrompt: prompt }),
      setInstallable: (installable) => set({ isInstallable: installable }),
      setUserDeclined: (declined) => set({ hasUserDeclined: declined })
    }),
    {
      name: 'install-prompt-storage',
      partialize: (state) => ({ hasUserDeclined: state.hasUserDeclined })
    }
  )
);