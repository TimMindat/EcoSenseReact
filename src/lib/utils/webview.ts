export function isWebView(): boolean {
  const userAgent = navigator.userAgent.toLowerCase();
  
  // Check for iOS WebView
  const isIOSWebView = /(iphone|ipod|ipad).*applewebkit(?!.*safari)/i.test(userAgent);
  
  // Check for Android WebView
  const isAndroidWebView = /wv/.test(userAgent) || 
                          /android.*Version\/[0-9]/.test(userAgent);

  return isIOSWebView || isAndroidWebView;
}

export function optimizeForWebView(): void {
  if (isWebView()) {
    // Force hardware acceleration
    document.body.style.transform = 'translateZ(0)';
    
    // Disable pull-to-refresh on iOS
    document.body.style.overscrollBehavior = 'none';
    
    // Ensure proper viewport height on iOS
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Update vh on resize
    window.addEventListener('resize', () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  }
}