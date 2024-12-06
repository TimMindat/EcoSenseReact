import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface GoogleAuthButtonProps {
  className?: string;
}

export function GoogleAuthButton({ className = '' }: GoogleAuthButtonProps) {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      await loginWithGoogle();
      navigate('/profile');
    } catch (error) {
      console.error('Google auth error:', error);
    }
  };

  return (
    <button
      onClick={handleGoogleAuth}
      className={`w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 ${className}`}
    >
      <img 
        src="https://www.google.com/favicon.ico" 
        alt="Google" 
        className="w-5 h-5"
      />
      <span>Continue with Google</span>
    </button>
  );
}