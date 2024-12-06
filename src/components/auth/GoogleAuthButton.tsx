import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface GoogleAuthButtonProps {
  className?: string;
  onError?: (error: Error) => void;
}

export function GoogleAuthButton({ className = '', onError }: GoogleAuthButtonProps) {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate('/profile');
    } catch (error) {
      console.error('Google auth error:', error);
      onError?.(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleAuth}
      disabled={loading}
      className={`w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <img 
          src="https://www.google.com/favicon.ico" 
          alt="Google" 
          className="w-5 h-5"
        />
      )}
      <span>Continue with Google</span>
    </button>
  );
}