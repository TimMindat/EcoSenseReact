import { AES, enc } from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'ecosense-secure-key';

export function encrypt(data: string): string {
  return AES.encrypt(data, SECRET_KEY).toString();
}

export function decrypt(encryptedData: string): string {
  const bytes = AES.decrypt(encryptedData, SECRET_KEY);
  return bytes.toString(enc.Utf8);
}