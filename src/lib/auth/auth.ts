import { User } from 'firebase/auth';
import { setSessionCookie, clearSessionCookie } from './session';
import { logLoginAttempt } from './logging';
import { signIn } from '../firebase/auth';

export async function authenticateUser(email: string, password: string): Promise<User> {
  try {
    const userCredential = await signIn(email, password);
    const user = userCredential.user;

    // Set session cookie
    setSessionCookie(user);

    // Log successful login
    await logLoginAttempt(user.uid, true);

    return user;
  } catch (error) {
    // Log failed login attempt
    await logLoginAttempt('unknown', false);
    throw error;
  }
}

export async function logoutUser() {
  clearSessionCookie();
}