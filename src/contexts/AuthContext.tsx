import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../lib/firebase/index';
import { signUp, signIn, signInWithGoogle, logOut, resetPassword, AuthError } from '../lib/firebase/auth';
import { setSessionCookie, clearSessionCookie } from '../lib/auth/session';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: AuthError | null;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        setSessionCookie(user);
      } else {
        clearSessionCookie();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email: string, password: string, name: string) => {
    try {
      setError(null);
      await signUp(email, password, name);
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw authError;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      await signIn(email, password);
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw authError;
    }
  };

  const loginWithGoogle = async () => {
    try {
      setError(null);
      await signInWithGoogle();
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw authError;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await logOut();
      clearSessionCookie();
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw authError;
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      setError(null);
      await resetPassword(email);
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw authError;
    }
  };

  const clearError = () => setError(null);

  const value = {
    user,
    loading,
    error,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword: handleResetPassword,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}