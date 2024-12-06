import React from 'react';
import { AuthForm } from '../components/AuthForm';
import { Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Signup() {
  const navigate = useNavigate();
  const { signup, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent, email: string, password: string, name: string) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      navigate('/');
    } catch (err) {
      // Error is handled by the AuthContext and displayed in the form
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Leaf className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <AuthForm type="signup" onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}