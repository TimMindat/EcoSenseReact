import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, AlertCircle, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from '../components/Link';
import { sendVerificationEmail, checkEmailVerification } from '../lib/firebase/auth/verification';

export function EmailVerification() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const checkVerification = async () => {
      try {
        setChecking(true);
        const isVerified = await checkEmailVerification(user);
        if (isVerified) {
          navigate('/profile');
        }
      } catch (err) {
        console.error('Error checking verification:', err);
      } finally {
        setChecking(false);
      }
    };

    const interval = setInterval(checkVerification, 5000);
    return () => clearInterval(interval);
  }, [user, navigate]);

  const handleResendVerification = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      await sendVerificationEmail(user);
      setSuccess('Verification email sent! Please check your inbox.');
    } catch (err: any) {
      setError(err.message || 'Failed to send verification email');
    } finally {
      setLoading(false);
    }
  };

  if (!user || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Mail className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Verify your email
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We've sent a verification link to{' '}
          <span className="font-medium text-green-600">{user.email}</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-2" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900">Next steps:</h3>
              <ul className="mt-3 list-disc list-inside text-sm text-gray-600 space-y-2">
                <li>Check your email inbox for the verification link</li>
                <li>If you don't see it, check your spam folder</li>
                <li>Click the link in the email to verify your account</li>
                <li>You'll be automatically redirected once verified</li>
              </ul>
            </div>

            <div className="flex flex-col space-y-4">
              <Button
                onClick={handleResendVerification}
                loading={loading}
                className="w-full"
              >
                Resend verification email
              </Button>

              <Link
                href="/profile"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
              >
                Continue to profile
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Need help?{' '}
                <Link href="/support" className="text-green-600 hover:text-green-500">
                  Contact support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}