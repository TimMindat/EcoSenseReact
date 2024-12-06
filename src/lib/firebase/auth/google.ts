import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../index';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    // Store or update user data in Firestore
    await setDoc(doc(db, 'users', result.user.uid), {
      name: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
      lastLogin: new Date().toISOString(),
      provider: 'google'
    }, { merge: true });

    return result;
  } catch (error: any) {
    console.error('Google sign in error:', error);
    throw error;
  }
}