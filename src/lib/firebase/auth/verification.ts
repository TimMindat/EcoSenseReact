import { User, sendEmailVerification } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../index';

export interface VerificationError {
  code: string;
  message: string;
}

export async function sendVerificationEmail(user: User): Promise<void> {
  try {
    await sendEmailVerification(user, {
      url: `${window.location.origin}/profile`,
      handleCodeInApp: true,
    });

    // Update user verification status in Firestore
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      verificationEmailSent: true,
      lastVerificationEmailSent: new Date().toISOString()
    });
  } catch (error: any) {
    throw formatVerificationError(error);
  }
}

export async function checkEmailVerification(user: User): Promise<boolean> {
  try {
    await user.reload();
    if (user.emailVerified) {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        emailVerified: true,
        verifiedAt: new Date().toISOString()
      });
      return true;
    }
    return false;
  } catch (error: any) {
    throw formatVerificationError(error);
  }
}

function formatVerificationError(error: any): VerificationError {
  const errorMessages: Record<string, string> = {
    'auth/too-many-requests': 'Too many verification attempts. Please try again later.',
    'auth/invalid-email': 'The email address is invalid.',
    'auth/user-not-found': 'No user found with this email address.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/expired-action-code': 'The verification link has expired. Please request a new one.',
    'auth/invalid-action-code': 'The verification link is invalid. Please request a new one.',
  };

  return {
    code: error.code || 'verification/unknown',
    message: errorMessages[error.code] || 'Failed to send verification email. Please try again.',
  };
}