export function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone ||
    document.referrer.includes('android-app://')
  );
}

export function isSupportedBrowser(): boolean {
  const ua = window.navigator.userAgent.toLowerCase();
  
  // Check if browser supports PWA features
  if (!('serviceWorker' in navigator)) {
    return false;
  }

  // Exclude browsers with known PWA issues
  if (ua.includes('firefox/') && !ua.includes('mobile')) {
    return false; // Desktop Firefox has PWA limitations
  }

  // iOS Safari specific checks
  const isIOS = /iphone|ipad|ipod/.test(ua);
  if (isIOS) {
    const isSafari = !ua.includes('chrome') && ua.includes('safari');
    return isSafari; // Only support Safari on iOS
  }

  return true;
}