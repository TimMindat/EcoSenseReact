import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { initInstallPrompt } from './lib/pwa/utils/init';
import { optimizeForWebView } from './lib/utils/webview';

// Initialize WebView optimizations
optimizeForWebView();

// Initialize PWA install prompt only in browser environment
if (typeof window !== 'undefined') {
  initInstallPrompt();
}

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

// Ensure the app renders even if some resources fail
window.addEventListener('error', (event) => {
  // Prevent white screen on resource load failures
  if (event.target instanceof HTMLImageElement || 
      event.target instanceof HTMLScriptElement || 
      event.target instanceof HTMLLinkElement) {
    event.preventDefault();
  }
}, true);

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);