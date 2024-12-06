export const AUTH_ERROR_MESSAGES = {
  'auth/user-not-found': 'No account found with this email address',
  'auth/wrong-password': 'Incorrect password',
  'auth/invalid-email': 'Please enter a valid email address',
  'auth/email-already-in-use': 'An account with this email already exists',
  'auth/weak-password': 'Password should be at least 6 characters',
  'auth/network-request-failed': 'Network error. Please check your connection',
  'default': 'An error occurred. Please try again'
};

export function getAuthErrorMessage(errorCode: string): string {
  return AUTH_ERROR_MESSAGES[errorCode as keyof typeof AUTH_ERROR_MESSAGES] || AUTH_ERROR_MESSAGES.default;
}