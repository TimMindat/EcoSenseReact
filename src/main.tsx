import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { initInstallPrompt } from './lib/pwa/utils/init';

// Initialize PWA install prompt only in browser environment
if (typeof window !== 'undefined') {
  initInstallPrompt();
}

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);