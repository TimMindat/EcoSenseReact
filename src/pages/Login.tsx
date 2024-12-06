import React, { useState } from 'react';
import { AuthForm } from '../components/AuthForm';
import { GoogleAuthButton } from '../components/auth/GoogleAuthButton';
import { Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAuthRedirect } from '../lib/auth/hooks/useAuthRedirect';
import { validateEmail, validatePassword } from '../lib/auth/utils/validation';
import { getAuthErrorMessage } from '../lib/auth/utils/errorMessages';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  
  // Redirect if already logged in
  useAuthRedirect();

  const handleSubmit = async (e: React.FormEvent, email: string, password: string) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await login(email, password);
      navigate('/profile');
    } catch (err: any) {
      setError(getAuthErrorMessage(err.code));
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Leaf className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to EcoSense
        </h2>
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <GoogleAuthButton className="mb-6" />
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <AuthForm type="login" onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}