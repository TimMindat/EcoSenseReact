import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/index';

export async function logLoginAttempt(userId: string, success: boolean) {
  const timestamp = new Date().toISOString();
  
  await setDoc(doc(db, 'login_logs', `${userId}_${timestamp}`), {
    userId,
    timestamp,
    success,
    ip: await fetchIpAddress(),
    userAgent: navigator.userAgent
  });
}

async function fetchIpAddress(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Failed to fetch IP:', error);
    return 'unknown';
  }
}