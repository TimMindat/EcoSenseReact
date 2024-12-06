import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  UserCredential
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './index';
import { signInWithGoogle } from './auth/google';

export interface AuthError {
  code: string;
  message: string;
}

export async function signUp(email: string, password: string, name: string): Promise<UserCredential> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    if (userCredential.user) {
      await updateProfile(userCredential.user, { displayName: name });
      
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        provider: 'email'
      });
    }

    return userCredential;
  } catch (error: any) {
    console.error('Signup error:', error);
    throw formatAuthError(error);
  }
}

export async function signIn(email: string, password: string): Promise<UserCredential> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    if (userCredential.user) {
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        lastLogin: new Date().toISOString()
      }, { merge: true });
    }
    
    return userCredential;
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw formatAuthError(error);
  }
}

export { signInWithGoogle };

export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email, {
      url: window.location.origin + '/login',
      handleCodeInApp: false
    });
  } catch (error: any) {
    console.error('Password reset error:', error);
    throw formatAuthError(error);
  }
}

export async function logOut(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Logout error:', error);
    throw formatAuthError(error);
  }
}

function formatAuthError(error: any): AuthError {
  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'This email is already registered.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/operation-not-allowed': 'Operation not allowed.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/invalid-credential': 'Invalid login credentials.',
    'auth/popup-closed-by-user': 'Google sign-in was cancelled.',
    'auth/cancelled-popup-request': 'Another sign-in popup is already open.',
    'auth/popup-blocked': 'Sign-in popup was blocked by the browser.',
  };
  
  return {
    code: error.code || 'auth/unknown',
    message: errorMessages[error.code] || error.message || 'An unexpected error occurred.'
  };
}