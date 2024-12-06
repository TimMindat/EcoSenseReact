import { User } from 'firebase/auth';
import Cookies from 'js-cookie';
import { encrypt } from '../utils/encryption';

export const SESSION_COOKIE_NAME = 'ecosense_session';

export function setSessionCookie(user: User) {
  const sessionData = {
    uid: user.uid,
    email: user.email,
    timestamp: new Date().toISOString(),
  };
  
  const encrypted = encrypt(JSON.stringify(sessionData));
  Cookies.set(SESSION_COOKIE_NAME, encrypted, {
    expires: 7, // 7 days
    secure: true,
    sameSite: 'strict'
  });
}

export function clearSessionCookie() {
  Cookies.remove(SESSION_COOKIE_NAME);
}