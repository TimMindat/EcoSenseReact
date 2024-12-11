import { openDB } from 'idb';

const DB_NAME = 'fcm_store';
const STORE_NAME = 'tokens';
const TOKEN_KEY = 'fcm_token';

async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME);
    },
  });
}

export async function getTokenFromStorage(): Promise<string | null> {
  try {
    const db = await getDB();
    return db.get(STORE_NAME, TOKEN_KEY);
  } catch (error) {
    console.error('Failed to get token from storage:', error);
    return null;
  }
}

export async function saveTokenToStorage(token: string): Promise<void> {
  try {
    const db = await getDB();
    await db.put(STORE_NAME, token, TOKEN_KEY);
  } catch (error) {
    console.error('Failed to save token to storage:', error);
  }
}

export async function removeTokenFromStorage(): Promise<void> {
  try {
    const db = await getDB();
    await db.delete(STORE_NAME, TOKEN_KEY);
  } catch (error) {
    console.error('Failed to remove token from storage:', error);
  }
}