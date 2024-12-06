import React, { useState, useEffect } from 'react';
import { Link } from './Link';
import { Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from './Button';
import { useAuth } from '../contexts/AuthContext';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (e: React.FormEvent, email: string, password: string, name?: string) => void;
}

export function AuthForm({ type, onSubmit }: AuthFormProps) {
  const { error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState({
    hasLength: false,
    hasNumber: false,
    hasSpecial: false,
  });

  useEffect(() => {
    if (error) {
      setFormError(error.message);
      setLoading(false);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    clearError();

    if (type === 'signup') {
      if (password !== confirmPassword) {
        setFormError("Passwords don't match");
        return;
      }
      
      if (!passwordStrength.hasLength || !passwordStrength.hasNumber || !passwordStrength.hasSpecial) {
        setFormError('Please ensure your password meets all requirements');
        return;
      }
    }

    setLoading(true);
    try {
      await onSubmit(e, email, password, name);
    } catch (error) {
      console.error('Form submission error:', error);
      setLoading(false);
    }
  };

  const checkPasswordStrength = (value: string) => {
    setPassword(value);
    setPasswordStrength({
      hasLength: value.length >= 8,
      hasNumber: /\d/.test(value),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      {formError && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
          {formError}
        </div>
      )}

      {type === 'signup' && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-colors duration-200"
            placeholder="Tim Mind"
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-colors duration-200"
          placeholder="tim@mind.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            required
            value={password}
            onChange={(e) => checkPasswordStrength(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-colors duration-200"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        
        {type === 'signup' && (
          <div className="mt-2 space-y-2 text-sm">
            {Object.entries({
              'At least 8 characters': passwordStrength.hasLength,
              'Contains a number': passwordStrength.hasNumber,
              'Contains a special character': passwordStrength.hasSpecial,
            }).map(([text, isValid]) => (
              <div key={text} className="flex items-center space-x-2">
                {isValid ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-gray-300" />
                )}
                <span className={isValid ? 'text-green-700' : 'text-gray-500'}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {type === 'signup' && (
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-colors duration-200"
            />
          </div>
        </div>
      )}

      <Button type="submit" loading={loading} className="w-full">
        {type === 'login' ? 'Sign In' : 'Create Account'}
      </Button>

      <div className="text-center text-sm">
        {type === 'login' ? (
          <>
            <Link href="/forgot-password" className="text-green-600 hover:text-green-700">
              Forgot password?
            </Link>
            <span className="mx-2">•</span>
            <Link href="/signup" className="text-green-600 hover:text-green-700">
              Create an account
            </Link>
          </>
        ) : (
          <Link href="/login" className="text-green-600 hover:text-green-700">
            Already have an account? Sign in
          </Link>
        )}
      </div>
    </form>
  );
}