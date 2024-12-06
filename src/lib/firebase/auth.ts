import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  UserCredential
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './index';

export interface AuthError {
  code: string;
  message: string;
}

const googleProvider = new GoogleAuthProvider();

export async function signUp(email: string, password: string, name: string): Promise<UserCredential> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile with display name
    if (userCredential.user) {
      await updateProfile(userCredential.user, { displayName: name });
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
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
    
    // Update last login time
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

export async function signInWithGoogle(): Promise<UserCredential> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    if (result.user) {
      // Update or create user document
      await setDoc(doc(db, 'users', result.user.uid), {
        name: result.user.displayName,
        email: result.user.email,
        lastLogin: new Date().toISOString()
      }, { merge: true });
    }

    return result;
  } catch (error: any) {
    console.error('Google sign in error:', error);
    throw formatAuthError(error);
  }
}

export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email);
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
    'auth/invalid-verification-code': 'Invalid verification code.',
    'auth/invalid-verification-id': 'Invalid verification ID.',
    'auth/requires-recent-login': 'Please log in again to continue.',
  };
  
  return {
    code: error.code || 'auth/unknown',
    message: errorMessages[error.code] || error.message || 'An unexpected error occurred.'
  };
}